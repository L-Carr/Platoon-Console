from rest_framework import serializers
from .models import GhApiConfig

class GhApiConfigSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = GhApiConfig
        fields = "__all__"