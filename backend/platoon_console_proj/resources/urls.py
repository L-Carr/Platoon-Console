from django.urls import path
from .views import ResourceListView

urlpatterns = [
    path('', ResourceListView.as_view(), name='resource-list'),
]
