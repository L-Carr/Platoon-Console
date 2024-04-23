from django.shortcuts import render

# Create your views here.
# trident_ready_user_app/views.py

from django.contrib.auth.models import Group

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
# from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token

# from .models import UserAccount
from .serializers import UserSerializer
# from django.contrib.auth import authenticate

# from django.contrib.auth import login, logout


# Create your views here.
class UserRegistration(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Generate a verification token
            # Make sure this group exists
            group = Group.objects.get(name='Students')
            print(group)
            user.groups.add(group)
            user.save()
            print(user)
            token, created = Token.objects.get_or_create(user=user)
            # Send verification email
            
            return Response({'message': 'User registered.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
