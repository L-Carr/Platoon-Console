from django.urls import path
from . import views

# urlpatterns = [
#     path('google-auth/', views.google_calendar_auth, name='google_calendar_auth'),
#     path('oauth2callback/', views.oauth2callback, name='oauth2callback'),
#     path('test-api/', views.test_api, name='test_api'),
#     path('add-event/', views.add_calendar_event, name='add_calendar_event'),
#     path('get-events/', views.get_calendar_events, name='get_calendar_events'),
#     path('view-events/', views.view_calendar_events, name='view_calendar_events'), 
#     path('google-credentials/', views.get_google_credentials, name='get_google_credentials'),
# ]

urlpatterns = [
    path('init/', views.GoogleCalendarInitView, name='google_calendar_init'),
    path('redirect/', views.GoogleCalendarRedirectView, name='google_calendar_redirect'),
    path('create-calendar', views.create_cohort_calendar, name= 'create_cohort_calendar'),
]