from django.db import models
from django.contrib.auth.models import User

# Create your models here.
from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Membership(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='memberships')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='team_memberships')
    role = models.CharField(max_length=30, blank=True, unique = False ) # 'Team Member'
    date_joined = models.DateField(auto_now_add=True) # '2021-01-29'

    def __str__(self):
        user_cohort = self.user.profile.cohort_name if hasattr(self.user, 'profile') else 'No Cohort'
        return f'{self.user.last_name} {self.user.first_name} - {user_cohort} - {self.team.name} ({self.role})'

