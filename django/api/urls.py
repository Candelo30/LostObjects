from django.urls import path
from .views import register, login, post, mostrar, profile, actualizar, room

urlpatterns = [
    path("register", register),
    path("login", login),
    path("publicar", post),
    path("mostrar", mostrar),
    path("perfil", profile),
    path("foto", actualizar),
    path("<str:room_name>/", room, name="room"),  # Ruta de la sala de chat
]
