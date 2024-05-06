from django.contrib import admin
from .models import DemoStudent, DemoTeam

# Register your models here.
admin.site.register(DemoStudent)
admin.site.register(DemoTeam)