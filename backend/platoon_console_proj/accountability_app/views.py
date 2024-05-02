from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from cohort.models import Cohort
from .models import AttendanceRecord, User
from .serializers import AttendanceRecordsSerializer



class AttendanceRecordCreateOrUpdate(APIView):
    def post(self, request):
        # Get the Current Date
        today = timezone.localdate()
        # Get Current User from request
        user = request.user
     
        # Get cohort name from request body
        cohort_name = request.data.get('cohort_name')
        # Return 404 if no cohort name is provided that matches current list of Cohorts
        cohort = get_object_or_404(Cohort, cohort_name=cohort_name) 

        # Check for existing attendance records for the specified cohort and day
        records_exist = AttendanceRecord.objects.filter(cohort=cohort, accountability_date=today).exists()
        
        #-------------------------------------------------------------------------------------------------------------------
        # Does the record exist for the specified Cohort as a Whole? If not generate all records for a given cohort and date
        if not records_exist:
            # If no records exist, create them for all users in the cohort
            #Return all users belonging to a cohort
            users = User.objects.filter(profile__cohort_name=cohort).distinct()
            #Generate Data for all users in the cohort
            for all_user in users:
                print(f"all_user: {all_user.id}")
                data = {
                    'user': all_user.id,  # Use all_user instead of user
                    'accountability_date': today,
                    'cohort': cohort.id,
                    'accountability_status': 0,
                    'pair_status': False,
                    'last_name': all_user.last_name,  # Use all_user instead of user
                    'first_name': all_user.first_name,  # Use all_user instead of user
                    'absence_reason': "",
                    'excused_status': False
                }
           # Serialize individual records for each user
                # Serializer takes special context to be passed to serializer. Passing the user ( Not just user from request body)
                serializer = AttendanceRecordsSerializer(data=data,context={'user': all_user})
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           

            #Update the current user's record
            record = AttendanceRecord.objects.get(user=user, accountability_date=today, cohort=cohort)
            serializer = AttendanceRecordsSerializer(record, data=request.data, partial=True,context={'user': user})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #-------------------------------------------------------------------------------------------------------------------
        # Edge Case. Attempt to get users record for the day even if cohort records already exist
        record = AttendanceRecord.objects.get(user=user, accountability_date=today, cohort=cohort)
        #if no record. Create one. Edge case, user signed up for original pull for some reason
        if not record:
            serializer = AttendanceRecordsSerializer(data=request.data,context={'user': request.user})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            
        serializer = AttendanceRecordsSerializer(record, data=request.data, partial=True,context={'user': user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AttendanceRecordList(APIView):
    def get(self, request):
        # Fetch the cohort by name from query parameters
        cohort_name = request.query_params.get('cohort_name')
        if not cohort_name:
            return Response({"error": "Cohort name is required."}, status=status.HTTP_400_BAD_REQUEST)

        cohort = get_object_or_404(Cohort, cohort_name=cohort_name)  # Safely get the Cohort instance by name

        # Retrieve all records for this cohort
        records = AttendanceRecord.objects.filter(cohort=cohort)
        if records.exists():
            serializer = AttendanceRecordsSerializer(records, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No attendance records found for this cohort."}, status=status.HTTP_404_NOT_FOUND)



class AdminAttendanceOverride(APIView):
    """
    Updates an attendance record.
    """
    def patch(self, request, pk):
        attendance_record = get_object_or_404(AttendanceRecord, pk=pk)
        serializer = AttendanceRecordsSerializer(attendance_record, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
