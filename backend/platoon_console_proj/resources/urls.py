from django.urls import path
from .views import ResourceListView, AdminUpdateLinks, AdminFilterLinks

urlpatterns = [
    path('', ResourceListView.as_view(), name='resource-list'),
    path('update/<str:record_id>/', AdminUpdateLinks.as_view(), name='resource-update'),
    path('filter/', AdminFilterLinks.as_view(), name='resource-filter')
]
