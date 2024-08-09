from django.contrib import admin

# Register your models here.
from .models import User, Post, Reaction, Comment

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Reaction)
admin.site.register(Comment)
