# Generated by Django 4.2.14 on 2024-08-08 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_post_created_at_post_updated_at_alter_post_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='subheader',
            field=models.CharField(max_length=255),
        ),
    ]