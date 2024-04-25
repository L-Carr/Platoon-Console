from django.urls import path
from .views import GhApiConfigInfo, GhApiConfigCreate

urlpatterns = [
    path('', GhApiConfigCreate.as_view(), name='create-gh-config'),
    path('<int:id>/', GhApiConfigInfo.as_view(), name='get-gh-config'),
]