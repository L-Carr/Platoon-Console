from django.contrib.auth.models import Group
from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object or admins to edit it.
    Admins are determined by is_staff status or being in the "Admin Users" group.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request, so allow GET, HEAD, and OPTIONS.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Determine if the user is in the "Admin Users" group.
        # admin_group = Group.objects.filter(name='Admin Users', user=request.user).exists()
        admin_group = Group.objects.filter(name='Admin Users', user__id=request.user.id).exists()
        # Write permissions are allowed if the user is the owner or an admin (either is_staff or in the admin group).
        return obj.owner == request.user or request.user.is_staff or admin_group
