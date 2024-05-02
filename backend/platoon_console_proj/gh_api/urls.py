from django.urls import path
from .views import (
    GhApiConfigInfo, 
    GhApiConfigCreate, 
    GhApiConfigViewAll,
    GhApiMainRepo,
    GhApiWeekDir,
)

urlpatterns = [
    path('', GhApiConfigCreate.as_view(), name='create-gh-config'),
    path('<int:id>/', GhApiConfigInfo.as_view(), name='get-gh-config'),
    path('all/', GhApiConfigViewAll.as_view(), name='all-gh-config'),
    path('main/', GhApiMainRepo.as_view(), name='main-repo'),
    path('week/<str:week>/', GhApiWeekDir.as_view(), name='week-dir'),
]