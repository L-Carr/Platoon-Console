from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.
from user_app.permissions import AnyUserReadOnly

class CohortVerification(APIView):

    permission_classes = [AnyUserReadOnly]
    def post(self, request):

        serializer = CohortVerificationSerializer(data=request.data)
        """
        This method will be used to verify the cohort code returning true or False based upon Cohort Code
        """
        pass
    pass