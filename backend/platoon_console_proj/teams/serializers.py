from rest_framework import serializers
from .models import Team, Membership
from django.contrib.auth.models import User

class MembershipSerializer(serializers.ModelSerializer)