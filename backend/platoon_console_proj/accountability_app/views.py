from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AttendanceRecord, User
from .serializers import AttendanceRecordsSerializer
from cohort.models import Cohort
from django.shortcuts import get_object_or_404

class AttendanceRecordCreateOrUpdate(APIView):
    def post(self, request):
        today = timezone.localdate()  # Get the current date
        user = request.user  # Get the current user from the request

        # Fetch the cohort by name
        cohort_name = request.data.get('cohort_name')  # Get cohort name from request
        cohort = get_object_or_404(Cohort, cohort_name=cohort_name)  # Safely get the Cohort instance by name

        # Check for existing records for this cohort today
        records_exist = AttendanceRecord.objects.filter(cohort=cohort, accountability_date=today).exists()

        if not records_exist:
            # If no records exist, create them for all users in the cohort
            
            users = User.objects.filter(profile__cohort_name=cohort) 
           # Assuming UserAccount links User to Cohort
            records = [
                AttendanceRecord(
                    user=user,
                    accountability_date=today,
                    cohort=cohort,
                    accountability_status=request.data.get('accountability_status', 0),
                    pair_status=request.data.get('pair_status', False),
                    last_name=user.last_name,
                    first_name=user.first_name,
                    absence_reason=request.data.get('absence_reason', ''),
                    excused_status=request.data.get('excused_status', False)
                )
                for user in users
            ]
            AttendanceRecord.objects.bulk_create(records)
            record = AttendanceRecord.objects.get(user=user, accountability_date=today, cohort=cohort)
        else:
            # Check for an existing record for this user today
            record, created = AttendanceRecord.objects.get_or_create(
                user=user,
                accountability_date=today,
                cohort=cohort,
                defaults=request.data
            )

            if not created:
                # If the record already exists, update it
                serializer = AttendanceRecordsSerializer(record, data=request.data, partial=True, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(AttendanceRecordsSerializer(record, context={'request': request}).data, status=status.HTTP_201_CREATED)


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