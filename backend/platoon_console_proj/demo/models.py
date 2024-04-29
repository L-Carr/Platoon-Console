from django.db import models

# Create your models here.
class Demo(models.Model):
    status = models.CharField(null=False, blank=False)