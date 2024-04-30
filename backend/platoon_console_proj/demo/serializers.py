from rest_framework import serializers
from .models import DemoStudent

class DemoStudentSerializer(serializers.ModelSerializer):
    student = serializers.SerializerMethodField()
    cohort = serializers.SerializerMethodField()

    class Meta:

        model = DemoStudent
        fields = "__all__"

    def get_student(self, instance):
        student = instance.student.user.email

        return student
    
    def get_cohort(self, instance):
        cohort = instance.cohort.cohort_name

        return cohort