from django.test import TestCase, Client
from django.urls import reverse
from django.core.exceptions import ValidationError
from cohort.models import Cohort

from user_app.views import (
    UserRegistration,
    UserPasswordReset,
    UserLogin,
    UserLogout
)

class TestUserView(TestCase):
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

    def test_003_test_user_registration(self):
        """
        This test attempts to create a new user.
        """
        client = Client()
        response = client.post(
            reverse("user-register"),
            data = {
                "email" : "angelfan5741@gmail.com",
                "cohort_code": "TYZIAI",
                "password" : "123456",
                "phone_number": 951653911,
                "last_name": "Doe",
                "first_name": "Jane"
            },
            content_type="application/json"
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        # print(response.data)
        # self.assertRegex(response.data["email"], "angelfan5741@gmail.com")