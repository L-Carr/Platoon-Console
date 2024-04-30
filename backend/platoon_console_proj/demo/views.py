from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import DemoStudentSerializer, DemoStudent

# Create your views here.

class AllStudentDemoInfo(APIView):
    #TODO: Change this to student and instructor only,  this is set to AllowAny just for testing purposes
    permission_classes = [AllowAny]

    def get(self, request):
        student_demos = DemoStudent.objects.all()
        ser_demos = DemoStudentSerializer(student_demos, many=True)

        return Response(ser_demos.data)