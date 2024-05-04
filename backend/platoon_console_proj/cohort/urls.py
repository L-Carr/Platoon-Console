from django.urls import path
from .views import CohortListView

urlpatterns = [
    path('', CohortListView.as_view(), name='cohort-list'),
]