from django.urls import path
from .views import UserRegistration,UserPasswordReset,UserLogin,UserLogout # Import the register function

urlpatterns = [
    path('register/', UserRegistration.as_view(), name='user-register'), 
     path('login/', UserLogin.as_view(), name='user-login'),# Updated to use the register function
    path('password-reset/', UserPasswordReset.as_view(), name='password-reset'),
    path('password-reset/<uidb64>/<token>/', UserPasswordReset.as_view(), name='password-reset-confirm'),
     path('logout//', UserPasswordReset.as_view(), name='password-reset-confirm'),
]

