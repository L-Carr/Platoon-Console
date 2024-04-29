from django.db import models
from django.contrib.auth.models import User
from cohort.models import Cohort

# Create your models here.

class Accountability(models.Model):
    '''
    Model to Hold information on Student Statuses for Attendance
    '''
    accountability_date = models.CharField(max_length=100, null=False, blank=False)
    cohort = models.ForeignKey(Cohort, on_delete=models.SET_NULL, null=True, to_field='cohort_name')
    user = models.ManyToManyField(User, related_name='accountability', on_delete=models.CASCADE)
    acountability_status = models.IntegerField(null=False, blank=False)
    pair_status = models.BooleanField()
    absence_reason = models.CharField(max_length=100, null=False, blank=False)
    excused_status = models.BooleanField()
  
    def __str__(self):
        return f"{self.accountability_date} | {self.cohort}"