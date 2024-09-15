from django.urls import path
from .views import register,login, post, mostrar, profile, actualizar

urlpatterns = [
    path('register',register),
    path('login', login),
    path('publicar', post),
    path('mostrar', mostrar),
    path('perfil',profile ),
    path('foto', actualizar)
]

  