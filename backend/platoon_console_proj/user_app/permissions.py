# permissions.py
from rest_framework import permissions
from django.contrib.auth.models import Group


class IsInstructor(permissions.BasePermission):
    """
    Allows full CRUD access to Instructors.
    """

    def has_permission(self, request, view):
        return Group.objects.filter(name='Instructors', user=request.user).exists()


class IsStudent(permissions.BasePermission):
    """
    Allows read-only access to generic views and read/write access to own records.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return Group.objects.filter(name='Students', user=request.user).exists()
        return False

    def has_object_permission(self, request, view, obj):
        # Allowing read access universally for students, write only if they own the record
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user and Group.objects.filter(name='Students', user=request.user).exists()


class AnyUserReadWrite(permissions.BasePermission):
    """
    Allows read and write access universally, used for general purposes like chat.
    """

    def has_permission(self, request, view):
        return True


class AnyUserReadOnly(permissions.BasePermission):
    """
    Allows read-only access to all users.
    """

    def has_permission(self, request, view):
        # Only allow safe HTTP methods which are considered read-only
        return request.method in permissions.SAFE_METHODS


class IsAttendanceRecords(permissions.BasePermission):
    """
    Custom permissions to allow a user to create/update attendance records for their cohort.
    Ensures that only authorized users can initiate the attendance recording process for a cohort.
    First, checks if the user is part of the 'Students' group.
    """

    def has_permission(self, request, view):
        print(Group.objects.filter(name='Students', user=request.user).exists())
        
        if not Group.objects.filter(name='Students', user=request.user).exists():
            print("User is not part of the 'Students' group.")
            return False

        # Check if the request is a POST request to create attendance records
        if request.method == 'POST':
            # cohort_name = request.data.get('cohort_name')
           
            cohort_name = request.data.get('cohort_name', '').strip()

            if cohort_name:
                print(f"Cohort name provided in request data: {cohort_name}")

                # Check if the user is part of the cohort they are trying to update/create records for
                # This assumes there is a relation `profile` on user that contains `cohort_name`
              

                user_cohort = getattr(request.user.profile.cohort_name, 'cohort_name').strip()
                print(f"Cohort profile check: {user_cohort}")

                if user_cohort == cohort_name:
                    print(
                        "User is part of the cohort they are trying to update/create records for.")
                    # Additional checks can be added here to ensure user has the role to create records for others
                    return True
                else:
                    print(
                        "User is NOT  part of the cohort they are trying to update/create records for.")
                    return False
        return False

    # def has_object_permission(self, request, view, obj):
    #     # Check group membership and safe methods first
    #     if not request.user.groups.filter(name='Students').exists():
    #         print("User is not part of the 'Students' group.")
    #         return False

    #     if request.method in permissions.SAFE_METHODS:
    #         print("User is trying to access a safe method.")
    #         return True

    #     # For POST and PUT methods, ensure the user is updating their own record unless they have special permissions
    #     if request.method in ['POST', 'PUT']:
    #         print("User is trying to create or update an attendance record.POST/PUT")
    #         if obj.user == request.user:
    #             print("User is trying to update their own record.")
    #             return True
    #         # Extend this to check if the user has rights to modify other's records (e.g., user is a teacher or admin)
    #         return request.user.is_staff or request.user.is_superuser

    #     return False
