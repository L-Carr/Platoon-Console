from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from .serializers import UserSerializer, LoginSerializer,UserDetailSerializer,UserAccountSerializer,UserRelatedSerializer
from .utils import single_email_distro
from .models import UserAccount,UserDetail
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.password_validation import validate_password
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

from user_app.permissions import IsInstructor, IsStudent,IsAttendanceRecords


class InstructorPermissions(APIView):
    '''
    Instructor Permissions
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsInstructor]

class StudentPermissions(APIView):
    '''
    Student Permissions
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsStudent]

class GenericAuthPermissions(APIView):
    '''
    GenericAuthPermissions Permissions
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class AttendanceRecordPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAttendanceRecords]

class UserRegistration(APIView):
    '''
    API view for registering new users. Open to all users.
    '''
    permission_classes = [AllowAny]  # Allows access without authentication.

    def post(self, request):
        """
        Registers a new user and adds them to the 'Students' group.
        """
        serializer = UserSerializer(data=request.data)  # Deserialize input data to a Python object.
        if serializer.is_valid():
            user = serializer.save()  # Save the valid data to create a new user.
            group = Group.objects.get(name='Students')  # Retrieve the predefined 'Students' group.
            user.groups.add(group)  # Add the new user to the 'Students' group.
            user.save()  # Save the updated user data.

            # Generate an authentication token for the newly registered user.
            token, created = Token.objects.get_or_create(user=user)
            if token:
                # Send a welcome email to the new user.
                single_email_distro(user.email, "Platoon.Console Registration", "Welcome to Platoon.Console,", "Thank you for registering with Platoon.Console. We hope you enjoy Code Platoon as much as we did.")
            
            print('User Registered')
            return Response({'message': 'User registered.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPasswordReset(APIView):
    """
    API view to handle password reset requests for users.
    """
    def post(self, request):
        """
        Sends a password reset email to the user's email address.
        """
        email = request.data.get('email')  # Extract the email address from the request data.
        user = get_user_model()

        # if not user:
        #     return Response({'error': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = user.objects.get(email=email)  # Find the user by their email.
            token = default_token_generator.make_token(user)  # Generate a password reset token.
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))  # Encode the user's ID.
            link = request.build_absolute_uri(
                reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})  # Create a password reset link.
            )   
            print(f"\n\n***{uidb64}    {token}***\n\n")
            # Send the password reset email.
            link2 = f"http://localhost:5173/change-password/{uidb64}/{token}/"
            single_email_distro(email, "Platoon.Console Password Reset", "You've reached Platoon.Console Support,", f"You have requested a password reset. Please click the link below to reset your password. If you did not request this, please ignore this email. {link2}")
            
            return Response({'message': 'Password reset email sent.'}, status=status.HTTP_200_OK)
        except user.DoesNotExist:
            print('User Does not Exist')
            return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
            
    def put(self, request, uidb64, token):
        """
        Resets the user's password if the provided token is valid.
        """
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))  # Decode the user's ID from base64.
            user = get_user_model().objects.get(pk=uid)  # Retrieve the user by decoded ID.
        except (TypeError, ValueError, OverflowError, user.DoesNotExist):
            print('Invalid Link')
            
            return Response({'error': 'Invalid link.'}, status=status.HTTP_400_BAD_REQUEST)

        if user is not None and default_token_generator.check_token(user, token):
            new_password = request.data.get('new_password')
            try:
                validate_password(new_password, user)
            except ValidationError as e:
                print(f'Password Does not meet the validation Error: {e}')
            
                return Response( {'error': 'Password Does not meet the validation Error.'} , status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)  # Set and hash the new password
            user.save()  # Get the new password from request data.
            # user.set_password(new_password)  # Set and hash the new password.
            # user.save()  # Save the user object with the updated password.
            print('Password has been reset.')
            return Response({'message': 'Password has been reset.'}, status=status.HTTP_200_OK)
        print('Invalid token')
        return Response({'error': 'Invalid Token.'}, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    """
    API view to log in a user and return an authentication token.
    """
    permission_classes = [AllowAny]  # Allows access without authentication.

    def post(self, request):
        """
        Authenticates the user and provides a token for session management.
        """
        serializer = LoginSerializer(data=request.data)  # Deserialize input data to a Python object.
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)  # Authenticate the user.
        if not user:
            print('Invalid credentials')

            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            token, _ = Token.objects.get_or_create(user=user)  # Retrieve or create a token for the user.
            login(request, user)  # Log the user in.

            
           
            user = User.objects.get(username=username)  # Replace 'username' with the actual username

            # Getting all groups of which the user is a member
            students = user.groups.filter(name ='Students')
            if students:
                
             # Serialize the user's details and account information
                user_detail = UserDetail.objects.get(user=user)
                user_account = UserAccount.objects.get(user=user)
                user_detail_serializer = UserDetailSerializer(user_detail)
                user_account_serializer = UserAccountSerializer(user_account)
                group_names = user.groups.values_list('name', flat=True)
                
            
                response_data = {
                    'token': token.key,
                    'user_groups': list(group_names),
                    'user_cohort': user_account_serializer.data.get('cohort_name'),
                    'user_id': user_account_serializer.data.get('user'),
                    'user_first_name': user.first_name,
                    'user_last_name': user.last_name,
                    'user_phone_number': user_detail_serializer.data.get('phone_number')
                
                }
            else:
                group_names = user.groups.values_list('name', flat=True)
                
                response_data = {
                    'token': token.key,
                    'user_groups': list(group_names),
                    'user_id': user.id,
                    'user_first_name': user.first_name,
                    'user_last_name': user.last_name

                }

            return Response(response_data, status=status.HTTP_200_OK)
           

        except UserAccount.DoesNotExist:
            print('User not found')
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class UserLogout(GenericAuthPermissions):
    """
    API view to log out a user and delete their authentication token.
    """
    def post(self, request):
        """
        Logs out the user and removes their authentication token.
        """
        request.user.auth_token.delete()  # Delete the user's token.
        logout(request)  # Log out the user.
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UserDetails(StudentPermissions):

    def get(self, request):
        try:
            user_detail = UserDetail.objects.get(user=request.user)
        except UserDetail.DoesNotExist:
            print('User details not found')

            return Response({'error': 'User details not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserDetailSerializer(user_detail, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = UserDetailSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user_detail = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            user_detail = UserDetail.objects.get(user=request.user)
        except UserDetail.DoesNotExist:
            print('User details not found')
            return Response({'error': 'User details not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserDetailSerializer(user_detail, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        try:
            user_detail = UserDetail.objects.get(user=request.user)
        except UserDetail.DoesNotExist:
            print('User details not found')
            return Response({'error': 'User details not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Use partial=True to allow partial updates
        serializer = UserDetailSerializer(user_detail, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AdminAllUsers(InstructorPermissions):
    """
    API view to retrieve all users with detailed information including their accounts and user details.
    """
 
    def get(self, request):
        """
        Retrieve and serialize all users.
        """
        users = User.objects.all()
        serializer = UserRelatedSerializer(users, many=True)
        return Response(serializer.data)