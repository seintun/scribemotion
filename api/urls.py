from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("register/", views.register_view, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("hello-scribemotion/", views.hello_scribemotion, name="hello_scribemotion"),
    path(
        "analyze-sentiment/",
        views.sentiment_analysis_view,
        name="analyze-sentiment",
    ),
    path("posts/", views.all_posts_view, name="all-posts"),
    path("create-post/", views.create_post_view, name="create-post"),
    path("post/<uuid:post_id>/", views.post_views, name="post-detail"),
]
