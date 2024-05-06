from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Membership, Team
from .serializers import MembershipSerializer, TeamSerializer

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from user_app.permissions import IsInstructor, IsStudent
from django.shortcuts import get_object_or_404

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




class TeamMembershipList(GenericAuthPermissions):
    def get(self, request, team_id):
        memberships = Membership.objects.filter(team_id=team_id)
        serializer = MembershipSerializer(memberships, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TeamListView(GenericAuthPermissions):
    def get(self, request):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddUserToTeamView(InstructorPermissions):

    def post(self, request):
        serializer = MembershipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ModifyTeamMembership(InstructorPermissions):

    def put(self, request, team_id):
        membership = Membership.objects.filter(team_id=team_id)
        serializer = MembershipSerializer(membership, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, team_id):
        # Assuming you are creating a new membership for a specific team
        team = get_object_or_404(Team, pk=team_id)
        data = request.data
        data['team'] = team.pk  # ensure team id is included in the data passed to the serializer
        
        serializer = MembershipSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, team_id):
        membership = Membership.objects.filter(team_id=team_id)
        membership.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CreateTeamIfNotExistsView(InstructorPermissions):

    def post(self, request):
        team_name = request.data.get('name')
        team = Team.objects.filter(name=team_name).first()

        if team:
            return Response({'message': 'Team already exists.'}, status=status.HTTP_409_CONFLICT)
        else:
            serializer = TeamSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)