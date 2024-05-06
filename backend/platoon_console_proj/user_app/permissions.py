# permissions.py
from rest_framework import permissions
from django.contrib.auth.models import Group


class IsInstructor(permissions.BasePermission):
    """
    Allows full CRUD access to Instructors.
    """

    def has_permission(self, request, view):
        return Group.objects.filter(name='Instructors', user=request.user).exists()


# class IsStudent(permissions.BasePermission):
#     """
#     Allows read-only access to generic views and read/write access to own records.
#     """

#     def has_permission(self, request, view):
#         if request.method in permissions.SAFE_METHODS:
#             return Group.objects.filter(name='Students', user=request.user).exists()
#         return False

#     def has_object_permission(self, request, view, obj):
#         # Allowing read access universally for students, write only if they own the record
#         if request.method in permissions.SAFE_METHODS:
#             return True
#         return obj.owner == request.user and Group.objects.filter(name='Students', user=request.user).exists()

# from django.contrib.auth.models import User, Group
# from rest_framework import permissions

class IsStudent(permissions.BasePermission):
    """
    Allows read-only access to generic views and read/write access to own records for students.
    """

    def has_permission(self, request, view):
        # Allow all read-only access if the user is in the 'Students' group.
        if request.method in permissions.SAFE_METHODS:
            return True
        # Allow write permissions if the user is in the 'Students' group.
        return Group.objects.filter(name='Students', user=request.user).exists()

    def has_object_permission(self, request, view, obj):
        # Allow read access universally if the user is in the 'Students' group.
        if request.method in permissions.SAFE_METHODS:
            return True
        # Allow write access only if the object's user attribute matches the request user and they are in the 'Students' group.
        return obj.user == request.user and Group.objects.filter(name='Students', user=request.user).exists()


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

