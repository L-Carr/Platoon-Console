from django.db import models
from django.contrib.auth.models import User
from cohort.models import Cohort

class AttendanceRecord(models.Model):
    accountability_date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attendance_records')
    cohort = models.ForeignKey(Cohort, on_delete=models.SET_NULL, null=True)
    accountability_status = models.IntegerField(default=0)
    pair_status = models.BooleanField(default=False)
    absence_reason = models.CharField(max_length=100, blank=True)
    excused_status = models.BooleanField(default=False)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    def __str__(self):
        return f"{self.accountability_date} |  | {self.cohort}"




