from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer, PubliSerializer
from rest_framework import status
from .models import CustomUser, publication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
    parser_classes,
)
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register(request):
#     serializer = UserSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save()

#         user= CustomUser.objects.get(username=serializer.data['username'])
#         user.set_password(serializer.data['password'])
#         user.save()

#         token= Token.objects.create(user=user)
#         return Response({'token': token.key, 'user': serializer.data},status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        # Guarda el usuario sin la contraseña aún
        user = serializer.save()

        # Ahora hasheamos la contraseña y guardamos de nuevo
        user.set_password(serializer.data["password"])
        user.save()

        # Generar el token
        token = Token.objects.create(user=user)

        # Retornar la respuesta con el token
        return Response(
            {"token": token.key, "user": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    # Si los datos no son válidos
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    user = get_object_or_404(CustomUser, username=request.data["username"])

    if not user.check_password(request.data["password"]):
        return Response(
            {"error": "invalid password"}, status=status.HTTP_400_BAD_REQUEST
        )

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response(
        {"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK
    )


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    publicaciones = CustomUser.objects.all()
    serializer = UserSerializer(publicaciones, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def post(request):
    serializer = PubliSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def mostrar(request):
    publicaciones = publication.objects.all()
    serializer = PubliSerializer(publicaciones, many=True)
    return Response(serializer.data)


@api_view(["PATCH"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def actualizar(request):
    try:
        user = CustomUser.objects.get(
            id=request.user.id
        )  # Asegúrate de usar el modelo CustomUser
        if "imagen_perfil" in request.data:
            user.imagen_perfil = request.data["imagen_perfil"]
            user.save()
            return Response(
                {"imagen_perfil": user.imagen_perfil.url}, status=status.HTTP_200_OK
            )
        return Response(
            {"error": "Imagen no proporcionada"}, status=status.HTTP_400_BAD_REQUEST
        )
    except CustomUser.DoesNotExist:
        return Response(
            {"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND
        )


def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})
