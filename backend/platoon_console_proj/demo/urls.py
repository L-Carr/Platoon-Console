from django.urls import path
from .views import AllStudentDemoInfo, AllCohortDemoInfo, StudentDemoInfo

urlpatterns = [
    path('all/', AllStudentDemoInfo.as_view(), name='all-demos'),
    path('all/<str:cohort_name>/', AllCohortDemoInfo.as_view(), name='all-cohort-demos'),
    path('student/<int:id>/', StudentDemoInfo.as_view(), name='student-demo')
]