<<<<<<< HEAD
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Membership, Team
from .serializers import MembershipSerializer, TeamSerializer

class TeamMembershipList(APIView):
    def get(self, request, team_id):
        memberships = Membership.objects.filter(team_id=team_id)
        serializer = MembershipSerializer(memberships, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TeamListView(APIView):
    def get(self, request):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
=======
from django.shortcuts import render

# Create your views here.
>>>>>>> main
