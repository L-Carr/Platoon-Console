from django.db import models

# Create your models here.
class Cohort(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    
    
    def __str__(self):
        return self.name
    
    