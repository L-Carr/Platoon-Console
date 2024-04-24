from django.db import models
from django.contrib.auth.models import User
from cohort.models import Cohort
# Create your models here.

class UserDetail(models.Model):
    first_name = models.CharField(max_length=100,null=False,blank=False)
    last_name = models.CharField(max_length=100,null=False,blank=False)
    email = models.EmailField()
    phone_number = models.CharField(max_length=100,null=False,blank=False)

    user = models.OneToOneField(User, related_name='userdetail', on_delete=models.CASCADE,null=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name
    
#User Account Model
class UserAccount(models.Model):
   
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='profile')
    cohort_name = models.ForeignKey(Cohort, on_delete=models.SET_NULL, null=True,
    to_field='cohort_name')
   
    
    
    def __str__(self):
        return self.user.username
