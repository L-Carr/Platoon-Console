from django.test import TestCase
from django.core.exceptions import ValidationError
from user_app.serializers import UserSerializer, LoginSerializer
from cohort.models import Cohort

class TestCohortModels(TestCase):
    def test_001_create_cohort(self):
        """
        This test will create a cohort.
        """
        new_cohort = Cohort.objects.create(
            cohort_code="TYZIAI",
            cohort_name="testname",
            start_date='2022-01-01',
            end_date='2022-12-12',
        )
        new_cohort.full_clean()
        self.assertIsNotNone(new_cohort)



class TestUserModels(TestCase):
    def setUp(self):
        """
        User requires a cohort to be setup first.
        """
        new_cohort = Cohort.objects.create(
            cohort_code="TYZIAI",
            cohort_name="testname",
            start_date='2022-01-01',
            end_date='2022-12-12',
        )
        new_cohort.full_clean()
        new_cohort.save()

    def test_002_create_user(self):
        """
        This test will create an instance of a user.
        """
        #always add this to test at top to ensure it prints
        data = {
            "email" : "angelfan5741@gmail.com",
            "cohort_code": "TYZIAI",
            "password" : "123456",
            "phone_number": 951653911,
            "last_name": "Doe",
            "first_name": "Jane"
        }
        ser_data = UserSerializer(data=data)
        if ser_data.is_valid():
            user = ser_data.save()
            self.assertIsNotNone(user)

    

