from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.
from user_app.permissions import AnyUserReadOnly
from rest_framework.response import Response
from .serializers import CohortSerializer
from .models import  Cohort
from rest_framework import status
class CohortVerification(APIView):
    '''
    This method will be used to verify the cohort code returning true or False based upon Cohort Code
    '''
    permission_classes = [AnyUserReadOnly]
    def get_object(self, cohort_code):
        # Try to retrieve the Personal object, or return None if it doesn't exist
        try:
            return Cohort.objects.get(cohort_code=cohort_code)
        except Cohort.DoesNotExist:
            return None
    def post(self, request):
        '''
        Send the Cohort Code to verify the Cohort
        '''
        cohort_code = request.data.get('cohort_code', None)  # Retrieve the cohort code from POST data
        if not cohort_code:
            # If no cohort_code is provided, return an error response
            return Response({"error": "Cohort code is required."}, status=status.HTTP_400_BAD_REQUEST)

        cohort = self.get_object(cohort_code)
        if cohort:
            serializer = CohortSerializer(cohort)
            
            return Response({"exists": True, "cohort": serializer.data}, status=status.HTTP_200_OK)
        
        return Response({"exists": False, "error": "Cohort code is invalid."}, status=status.HTTP_404_NOT_FOUND)

        # cohort_code = request.data.get('cohort_code',None)
        # cohort = self.get_object()
        # if cohort:
        #     serializer = CohortSerializer(cohort)
        #     boolean_response = True
        #     return [boolean_response, Response(serializer.data)]
        # else:
        #     boolean_response = False
        #     return [boolean_response, Response("Cohort Code is Invalid")]
  