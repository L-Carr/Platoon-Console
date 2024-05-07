from rest_framework import serializers
from .models import Resources

class ResourceSerializer(serializers.ModelSerializer):

    def get_cohort(self, instance):
            return instance.cohort.cohort_name

    class Meta:
        model = Resources
        fields = "__all__"
