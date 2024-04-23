# user_app/signals.py
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group

@receiver(post_migrate)
def create_user_groups(sender, **kwargs):
    '''
    Your Django signal function create_user_groups automatically creates or updates user groups ("Students" and "Instructors") 
    whenever database migrations are applied. This is a strategic setup to ensure that essential user groups are available for
    managing access and permissions across your application.

    '''
    # Create or update the "Students" group
    students_group, students_created = Group.objects.get_or_create(name='Students')
    if students_created:
        # Add permissions specific to students
        # Example: students_group.permissions.add(student_permission)
        pass

    # Create or update the "Instructors" group
    instructors_group, instructors_created = Group.objects.get_or_create(name='Instructors')
    if instructors_created:
        # Add permissions specific to instructors
        # Example: instructors_group.permissions.add(instructor_permission)
        pass


   
