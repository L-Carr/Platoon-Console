from django.contrib import admin
from django.contrib.auth.models import User
from .models import UserDetail, UserAccount

class UserDetailAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'phone_number', 'slack_handle', 'github_handle')

    def user_email(self, obj):
        return obj.user.email if obj.user else 'No User'
    user_email.short_description = 'User Email'

admin.site.register(UserDetail, UserDetailAdmin)

class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'cohort_name', 'get_user_groups')

    def display_cohort(self, obj):
        """ Returns the cohort name if available. """
        return obj.cohort_name.cohort if obj.cohort_name else 'No Cohort Assigned'
    display_cohort.short_description = 'Cohort'

    def get_user_groups(self, obj):
        return ", ".join([group.name for group in obj.user.groups.all()])
    get_user_groups.short_description = 'Groups'

admin.site.register(UserAccount, UserAccountAdmin)