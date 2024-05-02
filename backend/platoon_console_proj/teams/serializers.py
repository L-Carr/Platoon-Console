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


User = get_user_model()

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'description']

class MembershipSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user')
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team')
  

    class Meta:
        model = Membership
        fields = ['team_id', 'user_id', 'date_joined']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user_email'] = instance.user.email
        representation['first_name'] = instance.user.first_name
        representation['last_name'] = instance.user.last_name
        representation['cohort_name'] = instance.user.profile.cohort_name if hasattr(instance.user, 'profile') and instance.user.profile.cohort_name else 'No Cohort'
        return representation