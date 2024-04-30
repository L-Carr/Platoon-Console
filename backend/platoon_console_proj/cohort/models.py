from django.db import models

# sCreate your models here.
class Cohort(models.Model):
    cohort_code = models.CharField(max_length=100,unique=True) # 'XYAI-2ADA'
    cohort_name = models.CharField(max_length=100,unique=True,blank=True) # 'WHISKEY'
    start_date = models.DateField() # '2021-01-29'
    end_date = models.DateField()   #   '2021-05-10'


    def __str__(self):
        return self.cohort_name
