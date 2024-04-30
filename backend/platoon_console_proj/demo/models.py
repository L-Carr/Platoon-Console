from django.db import models
from user_app.models import UserAccount, User
from cohort.models import Cohort
from .validators import validate_status

# Create your models here.
class DemoStudent(models.Model):
    status = models.CharField(max_length=10, null=False, blank=False, default='to do', validators=[validate_status])
    student = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='demo_user')
    cohort = models.ForeignKey(Cohort, on_delete=models.CASCADE, related_name='demo_cohort')

    # Ensure one instance of student and cohort combinations exist
    class Meta:
        unique_together = ('student', 'cohort')

    def __str__(self):
        return f'{self.student} {self.cohort}'