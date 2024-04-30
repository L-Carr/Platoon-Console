from django.http import HttpResponse
from django.shortcuts import render
from google_auth_oauthlib.flow import Flow
from django.shortcuts import redirect
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from django.conf import settings
import os

from rest_framework.decorators import api_view
from rest_framework.response import Response

#Client configuration
CLIENT_CONFIG = {
  'web': {
    'client_id': os.getenv('GOOGLE_CLIENT_ID'),
    'project_id': "platoon-console",
    'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
    'token_uri': os.getenv('TOKEN_URI'),
    'auth_provider_x509_cert_url':
    'https://www.googleapis.com/oauth2/v1/certs',
    'client_secret': os.getenv('GOOGLE_CLIENT_SECRET'),
    'redirect_uris': 'https://localhost:8000/calendar/oauth2callback/',
  }
}

#Scopes of the service
SCOPES = ['https://www.googleapis.com/auth/calendar']


@api_view(['GET'])
def GoogleCalendarInitView(request):
  """
    Initiates the OAuth2 flow for Google Calendar integration.

    This view redirects the user to Google's authorization page to grant
    permission for accessing their Google Calendar. After successful
    authorization, the user will be redirected to the callback URL.

    Returns:
        A redirect response to Google's authorization page.

    Raises:
        None
  """

  #Configuring Client
  flow = Flow.from_client_config(client_config=CLIENT_CONFIG, scopes=SCOPES)
  flow.redirect_uri = 'https://localhost:8000/calendar/redirect/'

  authorization_url, state = flow.authorization_url(
    access_type='offline', include_granted_scopes='true')
  request.session['oauth_state'] = state

  return redirect(authorization_url)


@api_view(['GET'])
def GoogleCalendarRedirectView(request):
  """
    Handles the OAuth2 callback for Google Calendar integration.

    This view is responsible for exchanging the authorization code received
    from Google's authorization page for an access token. It then uses the
    access token to retrieve the list of events from the user's Google Calendar.

    Returns:
        An JSON response containing the list  of calendar events.

    Raises:
        None
    """
  state = request.session.pop('oauth_state', '')
  if state != request.GET.get('state', ''):
    pass

  flow = Flow.from_client_config(client_config=CLIENT_CONFIG, scopes=SCOPES)
  flow.redirect_uri = 'https://localhost:8000/calendar/redirect/'

  flow.fetch_token(authorization_response=request.build_absolute_uri())
  credentials = flow.credentials

  #Refresh the token if it has expired
  if credentials.expired:
    credentials.refresh(Request())

  #Call the callendar service
  service = build(serviceName='calendar',
                  version='v3',
                  credentials=credentials,
                  static_discovery=False)

  #Fetch all events
  events = service.events().list(calendarId='primary').execute()

  #JSON Reponse with items in the events
  return Response({"events": events['items']})


# # Example of fetching events from a cohort calendar or filtering events
#     now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
#     events_result = service.events().list(
#         calendarId='primary',  # This would be the cohort calendar ID if separate
#         timeMin=now,
#         maxResults=10,  # Adjust accordingly
#         singleEvents=True,
#         orderBy='startTime'
#     ).execute()

#     # Filter events for the cohort (pseudo-code, adjust based on your criteria)
#     cohort_events = [event for event in events_result.get('items', []) if 'cohort' in event.get('summary', '').lower()]

#     # Check if the user has opted in and add events to their calendar
#     if user_opted_in(request.user):
#         for event in cohort_events:
#             service.events().insert(calendarId='user_calendar_id', body=event).execute()

#     return Response({"events": cohort_events})

# def user_opted_in(user):
#     # Placeholder for checking user preferences, e.g., from a database
#     return True  # or False based on actual user setting


@api_view(['POST'])
def create_cohort_calendar(credentials, cohort):
    """
    Creates a new calendar for a cohort.

    This function creates a new calendar in Google Calendar for a cohort. The
    calendar will be used to store all events related to the cohort.

    Args:
        credentials: The user's Google Calendar credentials.

    Returns:
        The calendar ID of the newly created calendar.

    Raises:
        None
    """
    service = build('calendar', 'v3', credentials=credentials)

    calendar = {
        'summary': f'{cohort} Cohort Calendar',
        'timeZone': 'America/New_York'
    }

    created_calendar = service.calendars().insert(body=calendar).execute()
    calendar_id = created_calendar['id']

    return created_calendar 

#create_cohort_calendar(credentials) # Call this function to create a cohort calendar