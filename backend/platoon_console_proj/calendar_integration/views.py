from django.shortcuts import render

# Create your views here.
from django.shortcuts import redirect
from google_auth_oauthlib.flow import Flow
import os 
from googleapiclient.discovery import build
import google.oauth2.credentials
import datetime
from django.http import HttpResponse, JsonResponse

def google_calendar_auth(request):
    flow = Flow.from_client_secrets_file(
        './credentials.json',
        scopes=['https://www.googleapis.com/auth/calendar'],
        redirect_uri='http://localhost:8000/oauth2callback'
    )
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    request.session['state'] = state
    return redirect(authorization_url)

def oauth2callback(request):
    state = request.session['state']
    flow = Flow.from_client_secrets_file(
        './credentials.json',
        scopes=['https://www.googleapis.com/auth/calendar'],
        state=state,
        redirect_uri='http://localhost:8000/oauth2callback'
    )
    flow.fetch_token(authorization_response=request.get_full_path())
    credentials = flow.credentials
    request.session['credentials'] = credentials_to_dict(credentials)
    return redirect('/')


def credentials_to_dict(credentials):
    return {
        "token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": credentials.client_id,
        "client_secret": credentials.client_secret,
        "scopes": credentials.scopes
    }

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
    return events

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