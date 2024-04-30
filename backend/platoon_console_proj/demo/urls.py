from django.urls import path
from .views import (
    AllStudentDemoInfo, 
    AllCohortDemoInfo, 
    StudentDemoInfo,
    ResetCohortDemoInfo,
)

urlpatterns = [
    path('all/', AllStudentDemoInfo.as_view(), name='all-demos'),
    path('all/<str:cohort_name>/', AllCohortDemoInfo.as_view(), name='all-cohort-demos'),
    path('student/<int:id>/', StudentDemoInfo.as_view(), name='student-demo'),
    path('reset/<str:cohort_name>/', ResetCohortDemoInfo.as_view(), name='reset-cohort-demos'),
]