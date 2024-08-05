from django.urls import path
from . import views

urlpatterns = [
    path("hello-scribemotion/", views.hello_scribemotion, name="hello_scribemotion"),
]
