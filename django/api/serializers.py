from rest_framework import serializers

# from django.contrib.auth.models import User
from .models import *
import base64
from django.core.files.base import ContentFile
from io import BytesIO


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
            "telefono",
            "edad",
            "ubicacion",
            "email",
            "imagen_perfil",
        ]

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data["password"])  # Encriptar la contraseña
        user.save()
        return user


class PubliSerializer(serializers.ModelSerializer):
    nombre_usuario = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all()
    )

    class Meta:
        model = publication
        fields = "__all__"

    def create(self, validated_data):
        return publication.objects.create(**validated_data)


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['chat', 'sender', 'content', 'image', 'created_at']


class ChatSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True)
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ["id", "participants", "created_at", "messages"]