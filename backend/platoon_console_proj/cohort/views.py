from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.
from user_app.permissions import Ge

class CohortVerification(APIView):

    permission_classes = [AllowAny]
    def post(self, request):
        """
        This method will be used to verify the cohort code returning true or False based upon Cohort Code
        """
        pass
    pass