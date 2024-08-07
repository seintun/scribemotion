from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    User model.
    """

    pass


class Post(models.Model):
    """
    Post model.
    """

    title = models.CharField(max_length=255)
    subheader = models.DateField()
    text = models.TextField()
    avatar = models.CharField(max_length=1)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
