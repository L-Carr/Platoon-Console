# user_app/signals.py
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group

@receiver(post_migrate)
def create_user_groups(sender, **kwargs):
    '''
    Django signal function create_user_groups automatically creates or updates user groups ("Students" and "Instructors") 
    whenever database migrations are applied. This is a strategic setup to ensure that essential user groups are available for
    managing access and permissions across your application.

    '''
    # Create or update the "Students" group
    students_group, students_created = Group.objects.get_or_create(name='Students')
   

    # Create or update the "Instructors" group
    instructors_group, instructors_created = Group.objects.get_or_create(name='Instructors')
   


   
