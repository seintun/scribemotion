from django.db import IntegrityError
from django.http import HttpRequest, HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.services.sentiment_analysis import analyze_sentiment
from api.models import User, Post
from api.serializers import PostSerializer


@api_view(["POST"])
def register_view(request):
    """
    A view function that registers a new user.
    """
    if request.method == "POST":
        username = request.data.get("username")
        email = request.data.get("email")
        password1 = request.data.get("password1")
        password2 = request.data.get("password2")

        if password1 != password2:
            return Response(
                {"message": "Passwords must match."}, status=status.HTTP_400_BAD_REQUEST
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password1)
            user.save()
        except IntegrityError:
            return Response(
                {"message": "Username already taken."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        login(request, user)

        user_details = {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }

        return Response(
            {
                "message": "User registered successfully.",
                "data": user_details,
            },
            status=status.HTTP_201_CREATED,
        )
    else:
        return Response(
            {"message": "GET method not allowed."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


def get_user_details(user, session_token, request):
    """
    A helper function that returns user details for a given user.
    """
    csrf_token = get_token(request)  # Generate CSRF token
    return {
        "username": user.username,
        "email": user.email,
        "session_token": session_token,
        "csrf_token": csrf_token,
    }


def verify_session_token(request):
    """
    A helper function that verifies the session token.
    """
    session_token = request.headers.get("Authorization")
    if session_token and request.session.session_key == session_token:
        user = request.user
        if user.is_authenticated:
            return user, session_token
    return None, None


@api_view(["POST"])
def login_view(request):
    """
    A view function that logs in a user.
    """
    user, session_token = verify_session_token(request)
    if user:
        user_details = get_user_details(user, session_token, request)
        return Response(
            {
                "message": "User already authenticated",
                "data": user_details,
            },
            status=status.HTTP_200_OK,
        )

    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        session_token = request.session.session_key
        user_details = get_user_details(user, session_token, request)
        return Response(
            {
                "message": "Login successful",
                "data": user_details,
            },
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"message": "Invalid username and/or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


@api_view(["POST"])
def logout_view(request):
    """
    A view function that logs out a user.
    """
    if request.method == "POST":
        logout(request)

        # Optionally clear session data
        request.session.flush()

        return Response(
            {"message": "Logout successful"},
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"message": "GET method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


@api_view(["GET"])
def hello_scribemotion(request: HttpRequest) -> HttpResponse:
    """
    A view function that returns a response with a Hello message.
    """
    return Response({"message": "Hello, ScribeMotion!"})


@api_view(["POST"])
def sentiment_analysis_view(request):
    """
    A view function that analyzes the sentiment of a given text.
    """
    text = request.data.get("text", "").strip()

    if not text:
        return Response(
            {"error": "No text provided or text is empty"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        analysis_results = analyze_sentiment(text)
        return Response(analysis_results, status=status.HTTP_200_OK)
    except Exception as error:
        return Response(
            {"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["GET"])
def all_posts_view(request):
    """
    A view function that returns posts in a paginated manner
    """
    offset = int(request.GET.get("offset", 0))
    limit = int(request.GET.get("limit", 5))
    filter = request.GET.get("filter", "all")
    username = request.GET.get("user", "")

    if filter == "user":
        try:
            author_id = User.objects.get(username=username)
            posts_query = Post.objects.filter(author=author_id)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
    else:
        posts_query = Post.objects.all()

    # Order posts by creation date in descending order
    posts_query = posts_query.order_by("-created_at")

    posts = posts_query.select_related("author")[offset : offset + limit].values(
        "id",
        "avatar",
        "author__username",
        "title",
        "subheader",
        "text",
        "created_at",
        "updated_at",
    )

    return Response(posts, status=status.HTTP_200_OK)


@api_view(["POST"])
def create_post_view(request):
    """
    A view function that allows authenticated users to create new posts.
    """

    # Extract post data from the request
    data = request.data
    username = data.get("username")
    try:
        author = User.objects.get(username=username)
        data["author"] = author.id  # Set the author to the found user's ID
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    # Serialize and save the new post
    serializer = PostSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
