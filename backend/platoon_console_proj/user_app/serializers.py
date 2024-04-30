from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserAccount, UserDetail
from cohort.models import Cohort
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    # Declare a custom field not present in the User model but needed for additional processing.
    cohort_code = serializers.CharField(write_only=True)

    phone_number = serializers.IntegerField()
    class Meta:
        # Specify the Django model associated with this serializer
        model = User
        # Define which fields should be serialized/deserialized.
        fields = ['id', 'email', 'password', 'cohort_code','first_name','last_name','phone_number']
        # Set password to write_only to ensure it's not readable or retrievable via the API.
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Retrieve cohort_code from the validated data, defaulting to None if not found.
        cohort_code = validated_data.get('cohort_code', None)

        phone_number = validated_data.get('phone_number', None)
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
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        # Create a UserAccount instance linking the new User to the retrieved Cohort.
        # Note: Assuming 'cohort_name' is a ForeignKey or a field in UserAccount that accepts a Cohort instance.
        # If 'cohort_name' is supposed to be a string field, you should replace `cohort`
        # with `cohort.cohort_name` or similar attribute.
        UserDetail.objects.create(user=user,phone_number=phone_number)
        UserAccount.objects.create(user=user, cohort_name=cohort)

        # Return the newly created User object.
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(str(e))
        return value



class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = ['phone_number', 'user']  # Add other fields if necessary

class UserAccountSerializer(serializers.ModelSerializer):
    cohort_name = serializers.SlugRelatedField(
        slug_field='cohort_name',
        queryset=Cohort.objects.all(),
        allow_null=True
    )

    class Meta:
        model = UserAccount
        fields = ['cohort_name', 'user']
