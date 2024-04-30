from django.db import models

# sCreate your models here.

class GhApiConfig(models.Model):
    # Config model for GitHub Api calls

    # ghapi library docs:
    # https://ghapi.fast.ai/

    # These populate the named params in this object:
    # GhApi(owner=string, repo=string, token=github_token)

    # The token is populated from the environment variables.
    # This is using a personal access token.
    # This token is set up at the account level.  It must have
    # permission to access the target repo.  At minimum it should
    # have 'repo', 'gist', 'notifications', and 'workflow' access
    # These requirements are detailed here:
    # https://ghapi.fast.ai/#how-to-use---python
    # Token creation link:
    # https://github.com/settings/tokens/new


    # Specifies the repo owner - this is the GitHub handle
    repo_owner = models.CharField(max_length=250, null=False, blank=False)
    # Specifies the repo name
    repo_name = models.CharField(null=False, blank=False)

    def __str__(self):
        # This method provides a string representation of the object
        return f'{self.repo_owner} - {self.repo_name}'
