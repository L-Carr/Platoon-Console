from rest_framework import serializers
from .models import AttendanceRecord
from user_app.models import UserAccount
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

class AttendanceOverrideSerializer(serializers.ModelSerializer):
     class Meta:
        model = AttendanceRecord
        fields = '__all__'

class AttendanceRecordsSerializer(serializers.ModelSerializer):

    #cohort = serializers.SerializerMethodField()

    class Meta:
        model = AttendanceRecord
        fields = '__all__'
        # Set `cohort` as read-only since it will be derived
        read_only_fields = ('first_name', 'last_name' )

    # def get_cohort(self, instance):
    #     return instance.cohort.cohort_name
    #     # return cohort

    def create(self, validated_data):
        # Assign the user from the request context
        user = self.context['user']
        
        validated_data['first_name'] = user.first_name
        validated_data['last_name'] = user.last_name
        print(f"Validated Data CREATE {validated_data}")
      
        validated_data['cohort'] = user.profile.cohort_name.name

        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Assign the user from the request context (usually not needed for updates)
        print(f"Validated Data-UPDATE {validated_data}")

        user = self.context['user']
        if not user:
            raise serializers.ValidationError(
                "User must be authenticated to perform this action.")

        # user = self.context['request'].user
         # Re-assign names from the user profile to ensure they are always up-to-date

        instance.first_name = user.first_name
        instance.last_name = user.last_name

        # Apply updates for other fields as necessary
        for attr, value in validated_data.items():
            # Ensure these are not updated via API
            if attr not in ['user',  'first_name', 'last_name']:
                setattr(instance, attr, value)

        instance.save()
        return instance
