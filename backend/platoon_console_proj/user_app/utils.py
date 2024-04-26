import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# API URL

#single_email_distro(recipient_email, email_subject,email_greeting, email_body):
def single_email_distro(recipient_email, email_subject,email_greeting, email_body):
    # Your API Key
    url = "https://api.brevo.com/v3/smtp/email"  # Change this to the actual API endpoint

    # Your API Key
    api_key = os.getenv('BREV_API_KEY') # Ensure this is correctly added to your environment variables or secured storage

    # Headers
    headers = {
        "accept": "application/json",  # Change this according to the API's expected headers
        "api-key": api_key,  # Common format for tokens, check if Brevo uses a different format
        "content-type": "application/json",  # Assuming JSON data, change if needed
    }

    # Data to be sent (change according to the API's expected parameters)
    # data = {
    #     "email": f"{recipient_email}",
    #     "subject": f"{email_subject}",
    #     "message": f"{email_body}."
    # }

    data = {  
   "sender":{  
      "name":"Platoon.Console",
      "email":"noreply@platoon-console.com"
   },
   "to":[  
      {  
         "email": recipient_email,
         "name": recipient_email 
      }
   ],
   "subject":email_subject,
   "htmlContent":f"<html><head></head><body><p>{email_greeting}</p>{email_body}</p></body></html>"
}
    # Sending POST request
    response = requests.post(url, headers=headers, json=data,timeout=5)

    # Checking response
    if response.status_code == 201:
        print("Email sent successfully!")
    else:
        print(f"Failed to send email. Status code: {response.status_code}, Response: {response.text}")
