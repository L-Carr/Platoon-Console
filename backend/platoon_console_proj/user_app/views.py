from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer

class UserRegistration(APIView):
    # AllowAny: This permission class allows any user to access this view,
    # regardless of whether they are authenticated or not.
    permission_classes = [AllowAny]

    def post(self, request):
        # This method handles POST requests to register new users.

        # The data from the request is passed to the UserSerializer to validate and serialize.
        serializer = UserSerializer(data=request.data)
        
        # Check if the data provided by the client is valid according to the serializer.
        if serializer.is_valid():
            # If data is valid, save the user to the database using the serializer's save method.
            user = serializer.save()

            # Retrieve the 'Students' group. It's assumed that this group already exists in the database.
            group = Group.objects.get(name='Students')

            # Add the newly created user to the 'Students' group.
            user.groups.add(group)
            # Save any changes to the user instance.
            user.save()

            # Create or retrieve an authentication token for the newly registered user.
            token, created = Token.objects.get_or_create(user=user)

            # Print statements for debugging purposes - these will appear in the console where your server is running.
            print(group)
            print(user)

            # Return a success response to the client, with a message indicating registration was successful.
            return Response({'message': 'User registered.'}, status=status.HTTP_201_CREATED)
        else:
            # If the data is not valid, return a 400 Bad Request response,
            # including the error messages generated by the serializer.
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
