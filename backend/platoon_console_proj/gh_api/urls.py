from django.urls import path
from .views import GhApiConfigInfo

urlpatterns = [
    path('', GhApiConfigInfo.as_view(), name='create-gh-config'),
    path('<int:id>/', GhApiConfigInfo.as_view(), name='get-gh-config'),
]