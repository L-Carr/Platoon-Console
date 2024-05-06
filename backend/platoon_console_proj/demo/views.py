from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.response import Response
from .serializers import (
    DemoStudentSerializer, 
    DemoStudent, 
    DemoTeamSerializer, 
    DemoTeam
)
from cohort.models import Cohort
from user_app.models import UserAccount, User
from teams.models import Team

from user_app.views import InstructorPermissions, GenericAuthPermissions, APIView
# Create your views here.

class AllStudentDemoInfo(InstructorPermissions):

    def get(self, request):
        # This method handles GET requests to view all demo records
        student_demos = DemoStudent.objects.all()
        ser_demos = DemoStudentSerializer(student_demos, many=True)

        return Response(ser_demos.data)
    
class AllCohortDemoInfo(GenericAuthPermissions):

    def get(self, request, cohort_name):
        # This method handles GET requests to view all demo records for a cohort
        # This method is obsolete - to be removed
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

                # DemoStudent is linked to the UserAccount id
                user = get_object_or_404(UserAccount, user_id=student.user_id)

                new_demo = DemoStudent.objects.create(
                    student=user,
                    cohort=cohort
                )
                new_demo.full_clean()
                adding_students = True

        # Query DB for all records (after creating new ones if needed)
        cohort_demos = DemoStudent.objects.filter(cohort=cohort)
        ser_demos = DemoStudentSerializer(cohort_demos, many=True)

        response = ser_demos.data

        # Loop through each record to add first name and last name for response
        for demo in response:

            # Get this UserAccount (linked in DemoStudent)
            account = get_object_or_404(UserAccount, id=demo["student"])
            # Get this User - first_name and last_name are in User
            user = get_object_or_404(User, id=account.user_id)

            # Add the first name and last name to the response dict for this student
            demo['first_name'] = user.first_name
            demo['last_name'] = user.last_name

        if adding_students:
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(response, status=status.HTTP_200_OK)
    
class StudentDemoInfo(InstructorPermissions):

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
    
class ResetCohortDemoInfo(InstructorPermissions):
    
    def put(self, request, cohort_name):
        # This method handles PUT requests to reset a cohorts demo records
        cohort = get_object_or_404(Cohort, cohort_name=cohort_name)

        demos = DemoStudent.objects.filter(cohort=cohort)
        data = {
            'status':'to do'
        }

        for demo in demos:
            ser_demo = DemoStudentSerializer(demo, data=data, partial=True)
            if ser_demo.is_valid():
                ser_demo.save()
            else:
                print(f'ResetCohortDemoInfo Error: {ser_demo.errors}')

        updated_demos = DemoStudent.objects.filter(cohort=cohort)
        ser_updated_demos = DemoStudentSerializer(updated_demos, many=True)

        return Response(ser_updated_demos.data, status=status.HTTP_201_CREATED)
    
class TeamDemoInfo(InstructorPermissions):
    def get(self, request, id):
        # This method handles GET requests to view a team demo record
        demo = get_object_or_404(DemoTeam, team=id)

        ser_demo = DemoTeamSerializer(demo)

        return Response(ser_demo.data)
    
    def put(self, request, id):
        # This method handles PUT requests to update a team demo record
        demo = get_object_or_404(DemoTeam, team=id)

        data = request.data.copy()

        ser_demo = DemoTeamSerializer(demo, data=data, partial=True)

        if ser_demo.is_valid():
            ser_demo.save()
            return Response(ser_demo.data, status=status.HTTP_201_CREATED)
        return Response(ser_demo.errors, status=status.HTTP_400_BAD_REQUEST)

class AllCohortTeamDemoInfo(GenericAuthPermissions):

    def post(self, request, cohort_name):
        # This method handles POST requests to create records for all teams in a cohort where no record is present
        cohort = get_object_or_404(Cohort, cohort_name=cohort_name)
        teams = Team.objects.filter(cohort=cohort)

        adding_teams = False

        for team in teams:
            demo = DemoTeam.objects.filter(team=team)

            if not demo.exists():
                new_demo = DemoTeam.objects.create(
                    team=team,
                    cohort=cohort
                )
                new_demo.full_clean()
                adding_teams = True

        cohort_demos = DemoTeam.objects.filter(cohort=cohort)
        ser_demos = DemoTeamSerializer(cohort_demos, many=True)

        response = ser_demos.data

        for demo in response:
            team = get_object_or_404(Team, id=demo["team"])

            demo['team_name'] = team.name

        if adding_teams:
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(response, status=status.HTTP_200_OK)
    
class ResetCohortTeamDemoInfo(InstructorPermissions):

    def put(self, request, cohort_name):
        # This method handles PUT requests to reset a cohorts team demo records
        cohort = get_object_or_404(Cohort, cohort_name=cohort_name)

        demos = DemoTeam.objects.filter(cohort=cohort)
        data = {
            'status':'to do'
        }

        for demo in demos:
            ser_demo = DemoTeamSerializer(demo, data=data, partial=True)
            if ser_demo.is_valid():
                ser_demo.save()
            else:
                print(f'ResetCohortTeamDemoInfo Error: {ser_demo.errors}')

        updated_demos = DemoTeam.objects.filter(cohort=cohort)
        ser_updated_demos = DemoTeamSerializer(updated_demos, many=True)

        return Response(ser_updated_demos.data, status=status.HTTP_201_CREATED)