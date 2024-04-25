from django.urls import path
from .views import GhApiConfigInfo, GhApiConfigCreate, GhApiConfigViewAll

urlpatterns = [
    path('', GhApiConfigCreate.as_view(), name='create-gh-config'),
    path('<int:id>/', GhApiConfigInfo.as_view(), name='get-gh-config'),
    path('all/', GhApiConfigViewAll.as_view(), name='all-gh-config')
]