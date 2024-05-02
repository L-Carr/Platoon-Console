from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Cohort
from .serializers import CohortSerializer
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from user_app.permissions import IsInstructor, IsStudent
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated


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


class CohortListView(GenericAuthPermissions):
    def get(self, request):
        cohorts = Cohort.objects.all()
        serializer = CohortSerializer(cohorts, many=True)
        return Response(serializer.data, status=HTTP_200_OK)