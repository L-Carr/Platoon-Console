from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Team(models.Model): 
    name = models.CharField(max_length=100,unique=True) # 'Team 1'
    description = models.CharField(max_length=100,unique=True,blank=True) # 'Team 1 Description'

    def __str__(self):
        return self.name
    

class Membership(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='memberships')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='memberships')
    role = models.CharField(max_length=100,unique=True,blank=True) # 'Team Member'
    date_joined = models.DateField(auto_now_add=True) # '2021-01-29'

    def __str__(self):
        user_detail = self.user.userdetail.phone_number if hasattr(self.user, 'userdetail') else 'No Phone Number'
        user_account = self.user.profile.cohort_name if hasattr(self.user, 'profile') else 'No Cohort'
        return f'{self.user.first_name} {self.user.last_name} - {self.user.email} - {user_detail} - {user_account}'

