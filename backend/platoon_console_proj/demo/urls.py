from django.urls import path
from .views import AllStudentDemoInfo

urlpatterns = [
    path('all/', AllStudentDemoInfo.as_view(), name='get-all-demos'),
]