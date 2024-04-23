from django.urls import path
from .views import UserRegistration # Import the register function

urlpatterns = [
    path('register/', UserRegistration.as_view(), name='user-register'),  # Updated to use the register function
]
