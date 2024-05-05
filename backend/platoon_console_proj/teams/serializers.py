from rest_framework import serializers
from .models import Membership, Team
from django.contrib.auth.models import User

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'description']

class MembershipSerializer(serializers.ModelSerializer):
    # Include user's email and names as read-only fields
    user_email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    cohort_name = serializers.CharField(source='user.profile.cohort_name.cohort_name', read_only=True)

    # Handling ForeignKey relations appropriately for creating/updating memberships
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Membership
        fields = ['id', 'team', 'user', 'user_email', 'cohort_name', 'first_name', 'last_name', 'role']
        read_only_fields = ['id', 'user_email', 'first_name', 'last_name', 'cohort_name']

    def validate_role(self, value):
        # Example custom validation: ensure the role is either 'Member' or 'Leader'
        if value not in ['Member', 'Leader']:
            raise serializers.ValidationError("Role must be either 'Member' or 'Leader'")
        return value

    def create(self, validated_data):
        # Custom create method to handle any specific logic during creation
        instance = Membership.objects.create(**validated_data)
        # Perform any additional actions like sending notifications
        return instance

    def update(self, instance, validated_data):
        # Custom update method to handle specific update logic
        instance.team = validated_data.get('team', instance.team)
        instance.user = validated_data.get('user', instance.user)
        instance.role = validated_data.get('role', instance.role)
        instance.save()
        return instance
