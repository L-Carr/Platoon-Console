from django.db import models
from django.contrib.auth.models import User
from cohort.models import Cohort

# Create your models here.

class UserDetail(models.Model):
  
    # Stores the phone number of the user; must be provided (null=False, blank=False).
    phone_number = models.CharField(max_length=100, null=False, blank=False)

    # Creates a one-to-one relationship between UserDetail and Django's User model.
    # 'related_name' allows access to UserDetail from the User instance.
    # 'on_delete=models.CASCADE' specifies that if the User is deleted, the associated UserDetail should also be deleted.
    user = models.OneToOneField(User, related_name='userdetail', on_delete=models.CASCADE, null=True)

    def __str__(self):
        # This method provides a string representation of the object, useful for debugging and admin displays.
        return self.first_name + ' ' + self.last_name
    
# UserAccount Model
class UserAccount(models.Model):
    # Establishes a one-to-one relationship with the User model.
    # This ensures that each user has only one corresponding UserAccount.
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Establishes a ForeignKey relationship to the Cohort model.
    # 'on_delete=models.SET_NULL' specifies that if the related Cohort is deleted, the 'cohort_name' field in UserAccount is set to NULL instead of deleting the UserAccount.
    # 'null=True' allows the cohort_name to be NULL, accommodating users without a linked cohort.
    # 'to_field' specifies that 'cohort_name' in the Cohort model is the field to join on, not the primary key.
    cohort_name = models.ForeignKey(Cohort, on_delete=models.SET_NULL, null=True, to_field='cohort_name')
    
    def __str__(self):
        # Returns the username of the associated user, making instances of this model recognizable by the user's username.
        return self.user.username
