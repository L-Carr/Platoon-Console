from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserAccount
from cohort.models import Cohort

class UserSerializer(serializers.ModelSerializer):
    # Declare a custom field not present in the User model but needed for additional processing.
    cohort_code = serializers.CharField(write_only=True)

    class Meta:
        # Specify the Django model associated with this serializer
        model = User
        # Define which fields should be serialized/deserialized.
        fields = ['id', 'username', 'email', 'password', 'cohort_code']
        # Set password to write_only to ensure it's not readable or retrievable via the API.
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Retrieve cohort_code from the validated data, defaulting to None if not found.
        cohort_code = validated_data.get('cohort_code', None)

        # Initialize cohort to None, will hold the Cohort object if found.
        cohort = None
        if cohort_code:
            try:
                # Try to retrieve the Cohort object by cohort_code.
                cohort = Cohort.objects.get(cohort_code=cohort_code)
            except Cohort.DoesNotExist as exc:
                # If no Cohort matches the provided cohort_code, raise a validation error.
                raise serializers.ValidationError(
                    {'cohort_code': 'This cohort code is invalid.'}) from exc

        # Create a new user in the database from the validated data.
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        # Create a UserAccount instance linking the new User to the retrieved Cohort.
        # Note: Assuming 'cohort_name' is a ForeignKey or a field in UserAccount that accepts a Cohort instance.
        # If 'cohort_name' is supposed to be a string field, you should replace `cohort`
        # with `cohort.cohort_name` or similar attribute.
        UserAccount.objects.create(user=user, cohort_name=cohort)

        # Return the newly created User object.
        return user
