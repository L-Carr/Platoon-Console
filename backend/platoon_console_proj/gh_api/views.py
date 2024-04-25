from django.shortcuts import get_object_or_404
from django.conf import settings
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
    
    def put(self, request, id):
        # This method handles PUT requests to update ghapi config values
        ghapi_config = get_object_or_404(GhApiConfig, id=id)

        data = request.data.copy()
        update_config = GhApiConfigSerializer(ghapi_config, data=data, partial=True)

        if update_config.is_valid():
            update_config.save()
            return Response(update_config.data, status=status.HTTP_201_CREATED)
        return Response(update_config.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        # This method handles DELETE requests - for testing
        # Do not use this method in production
        if settings.DEBUG:
            ghapi_config = get_object_or_404(GhApiConfig, id=id)
            ghapi_config.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"detail":"delete method only allowed in debug mode."}, status=status.HTTP_400_BAD_REQUEST)

class GhApiConfigCreate(APIView):
    #TODO: Change this to instructor only, this is set to AllowAny just for testing purposes
    permission_classes = [AllowAny]

    def post(self, request):
        # This method handles POST requests to create a ghapi config

        data = request.data.copy()
        record_count = GhApiConfig.objects.count()

        if record_count > 0:
            # A config already exists
            return Response({"detail":"A config already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        new_config = GhApiConfigSerializer(data=data)

        if new_config.is_valid():
            new_config.save()
            return Response(new_config.data, status=status.HTTP_201_CREATED)
        return Response(new_config.errors, status=status.HTTP_400_BAD_REQUEST)