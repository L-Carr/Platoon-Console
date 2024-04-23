from django.db import models
from django.contrib.auth.models import User
from cohort.models import Cohort
# Create your models here.

class PersonalData(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=100)
    
    def __str__(self):
        return self.first_name + ' ' + self.last_name
    
#User Account Model
class UserAccount(models.Model):
    ACCOUNT_TYPES = [ 
        ('Student', 'student'),
        ('Instructor', 'instructor')
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cohort = models.ForeignKey(Cohort, on_delete=models.SET_NULL, null=True)
    account_type = models.Charfield(max_length=100, choices=ACCOUNT_TYPES)
    personal_data = models.ForeignKey(PersonalData, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.user.username
