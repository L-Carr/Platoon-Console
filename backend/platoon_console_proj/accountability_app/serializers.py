from rest_framework import serializers
from .models import AttendanceRecord
from user_app.models import UserAccount

class AttendanceRecordsSerializer(serializers.ModelSerializer):


    cohort = serializers.SerializerMethodField()


    class Meta:
        model = AttendanceRecord
        fields = '__all__'
        read_only_fields = ('user', 'cohort')  # Set `cohort` as read-only since it will be derived
    def get_cohort(self, instance):
        return instance.cohort.cohort_name
        # return cohort

    def create(self, validated_data):
        # Assign the user from the request context
        user = self.context['request'].user
        validated_data['user'] = user
        validated_data['first_name'] = user.first_name 
        validated_data['last_name'] = user.last_name
        # Fetch the cohort from the UserAccount linked to the user
        user_account = UserAccount.objects.filter(user=user).first()
        if user_account:
            validated_data['cohort'] = user_account.cohort_name
        
        # Create the AttendanceRecord with the fetched cohort
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Assign the user from the request context (usually not needed for updates)
      
        user = self.context['request'].user
        if user:
            user_last_name = user.last_name
            instance.last_name = user_last_name

            user_first_name = user.first_name
            instance.first_name = user_first_name
        # Update instance with new data except 'user' and 'cohort'
        for attr, value in validated_data.items():
            if attr not in ['user', 'cohort']:
                setattr(instance, attr, value)

        # Fetch the cohort from the UserAccount linked to the user
        # user_account = UserAccount.objects.filter(user=user).first()
        # if user_account:
        #     instance.cohort = cohort
        
      
        # Save the updated instance
        instance.save()
        return instance
