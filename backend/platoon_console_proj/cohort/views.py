from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Cohort
from .serializers import CohortSerializer
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class CohortListView(APIView):
    def get(self, request):
        cohorts = Cohort.objects.all()
        serializer = CohortSerializer(cohorts, many=True)
        return Response(serializer.data, status=HTTP_200_OK)