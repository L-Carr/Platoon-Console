from django.urls import path
from . import views

urlpatterns = [
    path('google-auth/', views.google_calendar_auth, name='google_calendar_auth'),
    path('oauth2callback/', views.oauth2callback, name='oauth2callback'),
    path('test-api/', views.test_api, name='test_api'),
    path('add-event/', views.add_calendar_event, name='add_calendar_event'),
]