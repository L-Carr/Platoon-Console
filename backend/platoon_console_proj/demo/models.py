from django.db import models
from user_app.models import User
from cohort.models import Cohort

# Create your models here.
class DemoStudent(models.Model):
    status = models.CharField(max_length=10, null=False, blank=False, default='to do')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='demo_user')
    cohort = models.ForeignKey(Cohort, on_delete=models.CASCADE, related_name='demo_cohort')

    def __str__(self):
        return f'{self.user} {self.cohort}'