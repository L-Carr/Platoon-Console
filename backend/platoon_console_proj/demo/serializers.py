from rest_framework import serializers
from .models import DemoStudent

class DemoStudentSerializer(serializers.ModelSerializer):
    student = serializers.SerializerMethodField()
    cohort = serializers.SerializerMethodField()

    # student = serializers.PrimaryKeyRelatedField(read_only=True)
    # cohort = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:

        model = DemoStudent
        fields = "__all__"

    def get_student(self, instance):
        student = instance.student.user.email

        return student
    
    def get_cohort(self, instance):
        cohort = instance.cohort.cohort_name

        return cohort
    
    # def create(self, validated_data):
    #     # Retrieve cohort_id from the validated data, defaulting to None if not found
    #     print(f'Create validated data {validated_data}')
    #     cohort = validated_data.get('cohort', None)
    #     print(f'DemoStudent Create cohort {cohort}')
        
    #     # Retrieve student_id from validated data, defaulting to None if not found
    #     student = validated_data.get('student', None)
    #     print(f'DemoStudent student {student}')

    #     demo_student = DemoStudent.objects.create(
    #         student=student,
    #         cohort=cohort
    #     )
    #     return demo_student