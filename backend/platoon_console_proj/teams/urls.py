from django.urls import path
from .views import TeamMembershipList, TeamListView, AddUserToTeamView

urlpatterns = [
    path('', TeamListView.as_view(), name='team-list'),
    path('<int:team_id>/memberships/', TeamMembershipList.as_view(), name='team-memberships'),
    path('add-user/', AddUserToTeamView.as_view(), name='add-user-to-team'),
]