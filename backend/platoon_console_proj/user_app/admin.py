from django.contrib import admin
from .models import PersonalData, UserAccount
# Register your models here.
admin.site.register(PersonalData)
admin.site.register(UserAccount)