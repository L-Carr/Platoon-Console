from django.db import models
from user_app.models import UserAccount
from cohort.models import Cohort
from teams.models import Team
from .validators import validate_status

# Create your models here.
class DemoStudent(models.Model):
    status = models.CharField(max_length=10, null=False, blank=False, default='to do', validators=[validate_status])
    student = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='demo_user')
    cohort = models.ForeignKey(Cohort, on_delete=models.CASCADE, related_name='demo_student_cohort')

    # Ensure one instance of student and cohort combinations exist
    class Meta:
        unique_together = ('student', 'cohort')

    def __str__(self):
        return f'{self.student} - {self.cohort} - {self.status}'
    
class DemoTeam(models.Model):
    status = models.CharField(max_length=10, null=False, blank=False, default='to do', validators=[validate_status])
    team = models.OneToOneField(Team, on_delete=models.CASCADE, related_name='demo_team')
    cohort = models.ForeignKey(Cohort, on_delete=models.CASCADE, related_name='demo_team_cohort')

    class Meta:
        unique_together = ('team', 'cohort')

    def __str__(self):
        return f'{self.team} - {self.cohort} - {self.status}'