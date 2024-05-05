from django.urls import path
from .views import TeamMembershipList, TeamListView, AddUserToTeamView, ModifyTeamMembership

urlpatterns = [
    path('', TeamListView.as_view(), name='team-list'),
    path('<int:team_id>/memberships/', TeamMembershipList.as_view(), name='team-memberships'),
    path('add/<int:user_id>/<int:team_id>/', AddUserToTeamView.as_view(), name='add-user-to-team'),
    path('memberships/modify/<int:team_id>/', ModifyTeamMembership.as_view(), name='modify-team-membership')
]