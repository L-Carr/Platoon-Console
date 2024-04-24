from django.contrib import admin
from .models import UserDetail, UserAccount
# Register your models here.
admin.site.register(UserDetail)


class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'cohort_name', 'get_user_groups')

    def display_cohort(self, obj):
        """ Returns the cohort name if available. """
        return obj.cohort_name.cohort if obj.cohort_name else 'No Cohort Assigned'
    display_cohort.short_description = 'Cohort'

    def get_user_groups(self, obj):
        return ", ".join([group.name for group in obj.user.groups.all()])
    get_user_groups.short_description = 'Groups'

admin.site.register(UserAccount,UserAccountAdmin)

