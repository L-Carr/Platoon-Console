from rest_framework import serializers
<<<<<<< HEAD
from .models import Membership, Team
from django.contrib.auth.models import User


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'description']

class MembershipSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    cohort_name = serializers.CharField(source='user.profile.cohort_name.cohort_name')

    class Meta:
        model = Membership
        fields = ['team', 'user_email', 'cohort_name', 'first_name', 'last_name']
=======
from .models import Team, Membership
from django.contrib.auth.models import User

class MembershipSerializer(serializers.ModelSerializer)
>>>>>>> main
