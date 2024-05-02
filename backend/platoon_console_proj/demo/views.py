from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import DemoStudentSerializer, DemoStudent
from cohort.models import Cohort
from user_app.models import UserAccount, User

from user_app.views import InstructorPermissions,StudentPermissions
# Create your views here.

class AllStudentDemoInfo(StudentPermissions):

    def get(self, request):
        # This method handles GET requests to view all demo records
        student_demos = DemoStudent.objects.all()
        ser_demos = DemoStudentSerializer(student_demos, many=True)

        return Response(ser_demos.data)
    
class AllCohortDemoInfo(APIView):
    #TODO: Change this to student and instructor only, this is set to AllowAny just for testing purposes
    permission_classes = [AllowAny]

    def get(self, request, cohort_name):
        # This method handles GET requests to view all demo records for a cohort
        cohort = get_object_or_404(Cohort, cohort_name=cohort_name)
        cohort_demos = DemoStudent.objects.filter(cohort=cohort)
        ser_demos = DemoStudentSerializer(cohort_demos, many=True)
        
        return Response(ser_demos.data)
    
    def post(self, request, cohort_name):
        # This method handles POST requests to create records for all students in a cohort where no record is present
        cohort = get_object_or_404(Cohort, cohort_name=cohort_name)
        students = UserAccount.objects.filter(cohort_name=cohort)
        
        adding_students = False

        # Loop through the students found in the cohort
        for student in students:
            # Check if this student has a demo record
            demo = DemoStudent.objects.filter(student=student)

            # If no record exists, create one
            if not demo.exists():
                print(f'Demo does not exist')
                new_demo = DemoStudent.objects.create(
                    student=student,
                    cohort=cohort
                )
                new_demo.full_clean()
                adding_students = True

        cohort_demos = DemoStudent.objects.filter(cohort=cohort)
        ser_demos = DemoStudentSerializer(cohort_demos, many=True)

        response = ser_demos.data

        for demo in response:
            print(f'demo record {demo}')
            user = get_object_or_404(User, email=student)
            print(f'first name {user.first_name}')
            demo['first_name'] = user.first_name
            demo['last_name'] = user.last_name

        print(f'Response {response}')
        if adding_students:
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(response, status=status.HTTP_200_OK)
    
class StudentDemoInfo(APIView):
    #TODO: Change this to student and instructor only,  this is set to AllowAny just for testing purposes
    permission_classes = [AllowAny]

    def get(self, request, id):
        # This method handles GET requests to view a students demo record
        demo = get_object_or_404(DemoStudent, student=id)

        ser_demo = DemoStudentSerializer(demo)

        return Response(ser_demo.data)
    
    def put(self, request, id):
        # This method handles PUT request to update a students demo record
        demo = get_object_or_404(DemoStudent, student=id)

        data = request.data.copy()

        ser_demo = DemoStudentSerializer(demo, data=data, partial=True)

        if ser_demo.is_valid():
            ser_demo.save()
            return Response(ser_demo.data, status=status.HTTP_201_CREATED)
        return Response(ser_demo.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ResetCohortDemoInfo(APIView):
    #TODO: Change this to student and instructor only,  this is set to AllowAny just for testing purposes
    permission_classes = [AllowAny]
    
    def put(self, request, cohort_name):
        # This method handles PUT requests to reset a cohorts demo records
        cohort = get_object_or_404(Cohort, cohort_name=cohort_name)

        demos = DemoStudent.objects.filter(cohort=cohort)
        data = {
            'status':'to do'
        }

        for demo in demos:
            print(demo)
            ser_demo = DemoStudentSerializer(demo, data=data, partial=True)
            if ser_demo.is_valid():
                ser_demo.save()
            else:
                print(f'ResetCohortDemoInfo Error: {ser_demo.errors}')

        updated_demos = DemoStudent.objects.filter(cohort=cohort)
        ser_updated_demos = DemoStudentSerializer(updated_demos, many=True)

        return Response(ser_updated_demos.data, status=status.HTTP_201_CREATED)
