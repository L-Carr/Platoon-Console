from django.shortcuts import render

# Create your views here.
from django.shortcuts import redirect
from google_auth_oauthlib.flow import Flow
import os 
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
import google.oauth2.credentials
import datetime
from django.http import HttpResponse, JsonResponse
import logging
from rest_framework.status import HTTP_401_UNAUTHORIZED
logger = logging.getLogger(__name__)

def google_calendar_auth(request):
    logger.debug("Starting Google Calendar Auth Flow")
    flow = Flow.from_client_config(
        client_config={
            "web": {
                "client_id": os.getenv('GOOGLE_CLIENT_ID'),
                "project_id": "platoon-console",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": os.getenv('TOKEN_URI'),
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_secret": os.getenv('GOOGLE_CLIENT_SECRET'),
                "redirect_uris": [uri.strip() for uri in os.getenv('redirect_uris').split(',')]
            }
        },
        scopes=['https://www.googleapis.com/auth/calendar'],
        redirect_uri='https://localhost:8000/calendar/oauth2callback/'
    )
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    logger.debug(f"Authorization URL: {authorization_url}")
    request.session['state'] = state
    return redirect(authorization_url)

def oauth2callback(request):
    state = request.session['state']
    flow = Flow.from_client_config(
        client_config={
            "web": {
                "client_id": os.getenv('GOOGLE_CLIENT_ID'),
                "project_id": "platoon-console",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": os.getenv('TOKEN_URI'),
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_secret": os.getenv('GOOGLE_CLIENT_SECRET'),
                "redirect_uris": [uri.strip() for uri in os.getenv('redirect_uris').split(',')]
            }
        },
        scopes=['https://www.googleapis.com/auth/calendar'],
        state=state,
        redirect_uri='https://localhost:8000/calendar/oauth2callback/'
    )
    flow.fetch_token(authorization_response=request.get_full_path())
    credentials = flow.credentials
    request.session['credentials'] = credentials_to_dict(credentials)
    return redirect('view_calendar_events') #Need to change this

def credentials_to_dict(credentials):
    return {
        "token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": credentials.client_id,
        "client_secret": credentials.client_secret,
        "scopes": credentials.scopes
    }

def view_calendar_events(request):
    creds = request.session.get('credentials', None)
    if not creds: 
        return redirect('google_calendar_auth')
    creds = google.oauth2.credentials.Credentials(**creds)
    service = build('calendar', 'v3', credentials=creds)
    now = datetime.datetime.utcnow().isoformat() + 'Z'
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                          maxResults=10, singleEvents=True,
                                          orderBy='startTime').execute()
    events = events_result.get('items', [])
    return render(request, 'calendar_integration/calendar_events.html', {'events': events})

def get_calendar_events(request):
    creds = request.session.get('credentials', None)
    if not creds:
        return redirect('google_calendar_auth')
    creds = google.oauth2.credentials.Credentials(**creds)
    service = build('calendar', 'v3', credentials=creds)
    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                          maxResults=10, singleEvents=True,
                                          orderBy='startTime').execute()
    events = events_result.get('items', [])
    # Here we return a JsonResponse which correctly handles serialization of the list
    return JsonResponse(events, safe=False)  # Set `safe=False` to allow list serialization

def add_calendar_event(request):
    creds = request.session.get('credentials', None)
    if not creds:
        return redirect('google_calendar_auth')  # Redirect to authentication if no credentials
    creds = Credentials(**creds)
    service = build('calendar', 'v3', credentials=creds)

    event = {
        'summary': 'Example Event',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2024-05-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': '2024-05-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'},
        ],
        'reminders': {
            'useDefault': False,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    }

    event = service.events().insert(calendarId='primary', body=event).execute()
    return HttpResponse(f'Event created: {event.get("htmlLink")}')

def test_api(request):
    creds_data = request.session.get('credentials', None)
    if not creds_data:
        return redirect('google_calendar_auth')
    
    creds = Credentials(**creds_data)
    service = build('calendar', 'v3', credentials=creds)
    
    # Call the Calendar API
    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                          maxResults=10, singleEvents=True,
                                          orderBy='startTime').execute()
    events = events_result.get('items', [])

    # Return the list of events as JSON
    return JsonResponse(events, safe=False)

# def get_google_credentials(request):
#     if request.user.is_authenticated: 
#         return JsonResponse({
#             "apiKey": os.getenv('GOOGLE_API_KEY'),
#             "clientId": os.getenv('GOOGLE_CLIENT_ID'),
#         })
#     else: 
#         return JsonResponse({
#             "error": "User is not authenticated"
#         },  HTTP_401_UNAUTHORIZED)

def get_google_credentials(request):
    if request.user.is_authenticated:
        # Retrieve credentials from environment variables
        api_key = os.getenv('GOOGLE_API_KEY')
        client_id = os.getenv('GOOGLE_CLIENT_ID')

        # Check if both environment variables are set
        if api_key and client_id:
            return JsonResponse({
                "apiKey": api_key,
                "clientId": client_id,
            })
        else:
            # Return an error if any of the environment variables are not set
            return JsonResponse({
                "error": "API key or Client ID is not configured."
            }, status=500)  # Internal Server Error

    else:
        # User is not authenticated
        return JsonResponse({
            "error": "User is not authenticated"
        }, status=401)  # Unauthorized