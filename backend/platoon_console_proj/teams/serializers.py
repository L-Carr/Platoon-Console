from rest_framework import serializers
from .models import Membership, Team
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


# class TeamSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Team
#         fields = ['id', 'name', 'description']

# class MembershipSerializer(serializers.ModelSerializer):
#     user_email = serializers.EmailField(source='user.email')
#     first_name = serializers.CharField(source='user.first_name')
#     last_name = serializers.CharField(source='user.last_name')
#     cohort_name = serializers.CharField(source='user.profile.cohort_name.cohort_name')

#     class Meta:
#         model = Membership
#         fields = ['team', 'user_email', 'cohort_name', 'first_name', 'last_name']


# User = get_user_model()



# class MembershipSerializer(serializers.ModelSerializer):
#     user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user')
#     team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team')
  

#     class Meta:
#         model = Membership
#         fields = ['team_id', 'user_id', 'first_name', 'last_name' 'date_joined']

#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
#         representation['user_email'] = instance.user.email
#         representation['first_name'] = instance.user.first_name
#         representation['last_name'] = instance.user.last_name
#         representation['cohort_name'] = instance.user.profile.cohort_name if hasattr(instance.user, 'profile') and instance.user.profile.cohort_name else 'No Cohort'
#         return representation

User = get_user_model()

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'description']

class MembershipSerializer(serializers.ModelSerializer):
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team')
    first_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Membership
        fields = ['team_id', 'first_name', 'last_name', 'role', 'date_joined']

    def validate(self, data):
        """
        Check that the user with the given first name and last name exists.
        """
        try:
            user = User.objects.get(first_name=data['first_name'], last_name=data['last_name'])
        except User.DoesNotExist:
            raise serializers.ValidationError("No user found with the provided first and last name.")
        data['user'] = user
        return data

    def create(self, validated_data):
        user = validated_data.pop('user')  # Extract the user instance from the validated data
        validated_data.pop('first_name')  # Remove since it's write-only and not part of the Membership model
        validated_data.pop('last_name')  # Remove since it's write-only and not part of the Membership model
        membership = Membership.objects.create(user=user, **validated_data)
        return membership

    def to_representation(self, instance):
        # Customize the output of each Membership instance
        return {
            'team_name': instance.team.name,
            'user_name': f"{instance.user.first_name} {instance.user.last_name}",
            'role': instance.role,
            'date_joined': instance.date_joined.strftime('%Y-%m-%d')  # Format date for consistency
        }