from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("register/", views.register_view, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path(
        "analyze-sentiment/",
        views.sentiment_analysis_view,
        name="analyze-sentiment",
    ),
    path("posts/", views.all_posts_view, name="all-posts"),
    path("post/", views.post_view, name="create-post"),
    path("post/<uuid:post_id>/", views.post_view, name="post-detail"),
    path("reaction/", views.reaction_view, name="create-reaction"),
    path("comments/", views.all_comments_view, name="all-comments"),
    path("create-comment/", views.create_comment_view, name="create-comment"),
]
