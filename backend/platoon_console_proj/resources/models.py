from django.db import models
from cohort.models import Cohort

class Resources(models.Model):
    resource_name = models.CharField(max_length=30, unique=True)  # 'Zoom'
    cohort_name = models.ForeignKey(Cohort, on_delete=models.CASCADE)  # 'WHISKEY'
    program_name = models.CharField(max_length=50)  # 'Full Stack Development Course'
    resource_link = models.URLField()  # 'https://zoom.us/j/1234567890'

    class Meta:
        unique_together = ('resource_name', 'cohort_name')

    def __str__(self):
        return f"{self.resource_name} - {self.cohort_name} - {self.program_name} - {self.resource_link}"
