from rest_framework import serializers
from .models import DemoStudent, DemoTeam

class DemoStudentSerializer(serializers.ModelSerializer):
    cohort = serializers.SerializerMethodField()

    class Meta:

        model = DemoStudent
        fields = "__all__"
    
    def get_cohort(self, instance):
        cohort = instance.cohort.cohort_name

        return cohort
    
class DemoTeamSerializer(serializers.ModelSerializer):
    cohort = serializers.SerializerMethodField()

    class Meta:

        model = DemoTeam
        fields = "__all__"

    def get_cohort(self, instance):
        cohort = instance.cohort.cohort_name

        return cohort