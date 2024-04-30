'''
Admin.py Imports
'''
from django.contrib import admin
from .models import AttendanceRecord

# Register your models here.
admin.site.register(AttendanceRecord)
