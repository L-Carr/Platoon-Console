from rest_framework import serializers
from .models import DemoStudent

class DemoStudentSerializer(serializers.ModelSerializer):

    class Meta:
        
        model = DemoStudent
        fields = "__all__"