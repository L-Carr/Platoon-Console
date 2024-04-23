from rest_framework import serializers

class EventSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    summary = serializers.CharField(required=False, allow_blank=True, max_length=200)
    location = serializers.CharField(required=False, allow_blank=True, max_length=200)
    description = serializers.CharField(required=False, allow_blank=True)
    start = serializers.DateTimeField()
    end = serializers.DateTimeField()
    attendees = serializers.ListField(
        child=serializers.EmailField(),
        required=False
    )
    organizer = serializers.EmailField(required=False)