from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import GhApiConfigSerializer, GhApiConfig
from user_app.views import InstructorPermissions,StudentPermissions
from ghapi.all import GhApi
from dotenv import load_dotenv
import os
import re

# Create your views here.

def get_active_config():
    # This function retrieves the active config record
    config_count = GhApiConfig.objects.count()

    # There should not be more than one record
    # This ensures we get the id of the active record
    if config_count == 1:
        config_record = GhApiConfig.objects.all().first()
        return config_record
    elif config_count == 0:
        return 0
    else:
        raise ValueError(f'Invalid amount of configs in database: found {config_count}')
    
def get_active_repo():
    # This function calls the active config record and returns an object configured for use with GitHub and the specified repository

    try:
        config_record = get_active_config()
        owner = config_record.repo_owner
        repo = config_record.repo_name
        load_dotenv()
        token = os.getenv("GH_API_TOKEN")

        api = GhApi(owner=owner, repo=repo, token=token)
        return api
    except Exception as error:
        print(f'GhApi get_active_repo error: {error}')

class GhApiConfigInfo(InstructorPermissions):

    def get(self, request, id):
        # This method handles GET requests to display ghapi config values
        ghapi_config = get_object_or_404(GhApiConfig, id=id)

        ser_ghapi_config = GhApiConfigSerializer(ghapi_config)

        return Response(ser_ghapi_config.data)
    
    def put(self, request, id):
        # This method handles PUT requests to update ghapi config values
        ghapi_config = get_object_or_404(GhApiConfig, id=id)

        data = request.data.copy()
        update_config = GhApiConfigSerializer(ghapi_config, data=data, partial=True)

        if update_config.is_valid():
            update_config.save()
            return Response(update_config.data, status=status.HTTP_201_CREATED)
        return Response({"error":update_config.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        # This method handles DELETE requests - for testing
        # Do not use this method in production
        if settings.DEBUG:
            ghapi_config = get_object_or_404(GhApiConfig, id=id)
            ghapi_config.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error":"delete method only allowed in debug mode."}, status=status.HTTP_400_BAD_REQUEST)

class GhApiConfigCreate(InstructorPermissions):

    def post(self, request):
        # This method handles POST requests to create a ghapi config

        # This method currently has a hard limit of only 1 record

        data = request.data.copy()
        record_count = GhApiConfig.objects.count()

        if record_count > 0:
            # A config already exists
            return Response({"error":"A config already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        new_config = GhApiConfigSerializer(data=data)

        if new_config.is_valid():
            new_config.save()
            return Response(new_config.data, status=status.HTTP_201_CREATED)
        return Response({"error":new_config.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class GhApiConfigViewAll(InstructorPermissions):

    def get(self, request):
        # This method handles GET requests to view all config records
        ghapi_config = GhApiConfig.objects.all()
        ser_config = GhApiConfigSerializer(ghapi_config, many=True)

        return Response(ser_config.data)

class GhApiMainRepo(StudentPermissions):

    def get(self, request):
        # This method handles GET requests to view the main curriculum
        api = get_active_repo()
        if api :
            cp_repos = api.repos
            cp_curr_repo = cp_repos.get()

            result = {
                'name':cp_curr_repo.name,
                'html_url':cp_curr_repo.html_url
            }

            return Response(result)
        return Response({"error":"There is no config record."}, status=status.HTTP_400_BAD_REQUEST)
    
class GhApiWeekDir(StudentPermissions):

    def get(self, request, week):
        # This method handles GET requests to view the week readme
        api = get_active_repo()
        if api:
            cp_repos = api.repos
            # This retrieves the content info for the repo
            cp_content = cp_repos.get_content(path="/")

            # Create a RegEx pattern to search for the week 
            week_pattern = re.compile(r'^' + week)
            week_dir = None

            # Search through the directories in the repo for a directory that matches our pattern
            for dir in cp_content:
                if re.match(week_pattern, dir['name']):
                    week_dir = dir
                    break
                
            if week_dir:

                # Retrieve the content for the directory found
                week_content = cp_repos.get_content(path=week_dir["path"])

                # This will be our result dictionary
                # Populate the week info first
                result = {
                    "week_name":week_dir.name,
                    "week_html_url":week_dir.html_url,
                }
                # For each topic that matches a day we'll assign them to dictionary values
                # This currently depends on the directories starting with the day number - the current pattern they are stored in
                topics = []
                for topic in week_content:
                    # print(topic.name)
                    if re.match(f'^readme\w*', topic.name.lower()):
                        # print(f'Lets skip: {topic.name}')
                        continue
                    elif re.match(r'^(?:1\D)|(?:^[Dd]ay1)', topic.name):
                        # result['day_one_name'] = topic.name
                        # result['day_one_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(r'(?:^2)|(?:^[Dd]ay2)', topic.name):
                        # result['day_two_name'] = topic.name
                        # result['day_two_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(r'(?:^3)|(?:^[Dd]ay3)', topic.name):
                        # result['day_three_name'] = topic.name
                        # result['day_three_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(r'^4', topic.name):
                        # result['day_four_name'] = topic.name
                        # result['day_four_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(r'^5', topic.name):
                        # result['day_five_name'] = topic.name
                        # result['day_five_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(r'^6', topic.name):
                        # result['day_six_name'] = topic.name
                        # result['day_six_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(r'^7', topic.name):
                        # result['day_seven_name'] = topic.name
                        # result['day_seven_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(r'^8', topic.name):
                        # result['day_eight_name'] = topic.name
                        # result['day_eight_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(r'^9', topic.name):
                        # result['day_nine_name'] = topic.name
                        # result['day_nine_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(r'^10', topic.name):
                        # result['day_ten_name'] = topic.name
                        # result['day_ten_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(f'^old', topic.name):
                        # result['previous_name'] = topic.name
                        # result['previous_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(f'^R|resources', topic.name):
                        # result['resources_name'] = topic.name
                        # result['resources_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    elif re.match(f'^C|cheatS|sheets?', topic.name):
                        # result['cheatsheets_name'] = topic.name
                        # result['cheatsheets_url'] = topic.html_url
                        day_topic = {
                            'topic_name':topic.name,
                            'html_url':topic.html_url
                        }
                    
                    # Prevent duplicates
                    #TODO: Figure out where this happened
                    # resources was showing up twice in week 8
                    if day_topic in topics:
                        continue

                    topics.append(day_topic)

                result['topics'] = topics

                return Response(result)
            return Response({"error":"That week does not exist in the curriculum."}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"There is no config record."}, status=status.HTTP_400_BAD_REQUEST)
            
