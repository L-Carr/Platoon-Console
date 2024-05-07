from django.shortcuts import render
from .models import Resources
from .serializers import ResourceSerializer
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

# Create your views here.
class ResourceListView(APIView):
    def get(self, request):
        resources = Resources.objects.all()
        serializer = ResourceSerializer(resources, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        serializer = ResourceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)








# class CohortListView(APIView):
#     def get(self, request):
#         cohorts = Cohort.objects.all()
#         serializer = CohortSerializer(cohorts, many=True)
#         return Response(serializer.data, status=HTTP_200_OK)
