from django.shortcuts import render
from .models import Resources
from .serializers import ResourceSerializer
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from user_app.views import InstructorPermissions, StudentPermissions
from cohort.models import Cohort
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

class AdminUpdateLinks(InstructorPermissions):
    """
    Updates a link record.
    """
  
    def patch(self, request, record_id):
        '''
        Update method for Instructors to alter existing Link Records
        '''
        link_record = get_object_or_404(Resources, pk=record_id)
        serializer = ResourceSerializer(
            link_record, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({"error" : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class AdminFilterLinks(InstructorPermissions):
    '''
    Filter Links 
    '''
    def get(self, request):
        # Fetch the cohort by name from query parameters
        cohort_name = request.query_params.get('cohort_name')
        # Fetch the cohort by name from query parameters
        if not cohort_name:
            return Response({"error": "Cohort name is required."}, status=status.HTTP_400_BAD_REQUEST)
        # Safely get the Cohort instance by name
        cohort = get_object_or_404(Cohort, cohort_name=cohort_name)

        # Retrieve all records for this cohort
        records = Resources.objects.filter(cohort=cohort)
        if records.exists():
            serializer = ResourceSerializer(records, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "No link records found for this cohort."}, status=status.HTTP_404_NOT_FOUND)









# class CohortListView(APIView):
#     def get(self, request):
#         cohorts = Cohort.objects.all()
#         serializer = CohortSerializer(cohorts, many=True)
#         return Response(serializer.data, status=HTTP_200_OK)
