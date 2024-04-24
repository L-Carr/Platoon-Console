

from rest_framework import serializers
from .models import Cohort
class CohortSerializer(serializers.ModelSerializer):
    '''
    Pulls cohort code from request data
    '''
    class Meta:
        model = Cohort
        fields = ['cohort_code', 'cohort_name', 'start_date', 'end_date']    

   

