from django.urls import path
from .views import AllStudentDemoInfo, AllCohortDemoInfo

urlpatterns = [
    path('all/', AllStudentDemoInfo.as_view(), name='get-all-demos'),
    path('all/<str:cohort_name>/', AllCohortDemoInfo.as_view(), name='get-cohort-demos'),
]