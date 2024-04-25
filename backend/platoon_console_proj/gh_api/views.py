from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import GhApiConfigSerializer, GhApiConfig

# Create your views here.

class GhApiConfigInfo(APIView):
    #TODO: Change this to instructor only, this is set to AllowAny just for testing purposes
    permission_classes = [AllowAny]

    def get(self, request, id):
        # This method handles GET requests to display ghapi config values
        ghapi_config = get_object_or_404(GhApiConfig, id=id)

        ser_ghapi_config = GhApiConfigSerializer(ghapi_config)

        return Response(ser_ghapi_config.data)
    
    def post(self, request):
        # This method handles POST requests to create a ghapi config

        data = request.data.copy()
        record_count = GhApiConfig.objects.count()

        if record_count > 0:
            # A config already exists
            return Response('A config already exists!', status=status.HTTP_400_BAD_REQUEST)
        
        new_config = GhApiConfigSerializer(data=data)

        if new_config.is_valid():
            return Response('Ok')
        return Response(f'GhApiConfig: {new_config.errors}', status=status.HTTP_400_BAD_REQUEST)