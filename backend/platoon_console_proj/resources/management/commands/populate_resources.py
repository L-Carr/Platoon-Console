from django.core.management.base import BaseCommand
import json
from resources.models import Resources
from cohort.models import Cohort

class Command(BaseCommand):
    help = 'Loads data from JSON file to Resources model'

    def handle(self, *args, **options):
        with open('resources_data.json', 'r') as file:
            data = json.load(file)
            for entry in data:
                cohort = Cohort.objects.get(id=entry['cohort_name'])
                Resources.objects.create(
                    resource_name=entry['resource_name'],
                    cohort_name=cohort,
                    program_name=entry['program_name'],
                    resource_link=entry['resource_link']
                )
            self.stdout.write(self.style.SUCCESS('Successfully populated Resources table'))
