from django.urls import path
from .views import (
    AllStudentDemoInfo, 
    AllCohortDemoInfo, 
    StudentDemoInfo,
    ResetCohortDemoInfo,
    AllCohortTeamDemoInfo,
    TeamDemoInfo,
    ResetCohortTeamDemoInfo,
)

urlpatterns = [
    path('all/', AllStudentDemoInfo.as_view(), name='all-demos'),
    path('all/<str:cohort_name>/', AllCohortDemoInfo.as_view(), name='all-cohort-demos'),
    path('student/<int:id>/', StudentDemoInfo.as_view(), name='student-demo'),
    path('reset/<str:cohort_name>/', ResetCohortDemoInfo.as_view(), name='reset-cohort-demos'),
    path('teams/<str:cohort_name>/', AllCohortTeamDemoInfo.as_view(), name='cohort-teams-demos'),
    path('team/<int:id>/', TeamDemoInfo.as_view(), name='team-demo'),
    path('resetteams/<str:cohort_name>/', ResetCohortTeamDemoInfo.as_view(), name='reset-team-demos')
]