from django.urls import path
from .views import AttendanceRecordCreateOrUpdate,AttendanceRecordList # Import the register function

urlpatterns = [
     path('record/', AttendanceRecordCreateOrUpdate.as_view(), name='record-attendance'),
     path('retrieve/', AttendanceRecordList.as_view(), name='retrieve-attendance')
    # path('details/', AttendanceRecordDetails.as_view(), name='attendance-details')
    ]# Updated to use the register function]
  

