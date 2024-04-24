# Generated by Django 5.0.3 on 2024-04-23 21:19

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0002_remove_useraccount_account_type_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='personal_data',
        ),
        migrations.AddField(
            model_name='personaldata',
            name='user',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='personaldata', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]