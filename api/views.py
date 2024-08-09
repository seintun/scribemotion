from django.db import IntegrityError
from django.db.models import Count, Q
from django.http import HttpRequest, HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.services.sentiment_analysis import analyze_sentiment
from api.models import User, Post, Reaction
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


def get_user_by_username(username):
    """
    A helper function that returns a user given a username
    """
    try:
        return User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


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


def filter_posts(filter, author_id=None, post_id=None):
    """
    A helper function that filters posts based on the filter, author_id, and post_id.
    """
    if filter == "post" and post_id:
        return Post.objects.filter(id=post_id)

    if filter == "user" and author_id:
        return Post.objects.filter(author=author_id)

    return Post.objects.all()


def annotate_posts(posts_query):
    """
    A helper function that annotates posts with reaction counts.
    """
    return posts_query.annotate(
        like_count=Count("reaction", filter=Q(reaction__reaction="like")),
        love_count=Count("reaction", filter=Q(reaction__reaction="love")),
        angry_count=Count("reaction", filter=Q(reaction__reaction="angry")),
        celebrate_count=Count("reaction", filter=Q(reaction__reaction="celebrate")),
    )


def format_single_post(post, author_id):
    """
    A helper function that formats a single post to include reactions and user_reacted.
    """
    reaction = Reaction.objects.filter(user=author_id, post_id=post["id"]).first()
    reaction_type = reaction.reaction if reaction else None
    return {
        "id": post["id"],
        "avatar": post["avatar"],
        "author__username": post["author__username"],
        "title": post["title"],
        "subheader": post["subheader"],
        "text": post["text"],
        "created_at": post["created_at"],
        "updated_at": post["updated_at"],
        "reactions_count": {
            "like": post["like_count"],
            "love": post["love_count"],
            "angry": post["angry_count"],
            "celebrate": post["celebrate_count"],
        },
        "user_reacted": {
            "like": reaction_type == "like",
            "love": reaction_type == "love",
            "angry": reaction_type == "angry",
            "celebrate": reaction_type == "celebrate",
        },
    }


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
    A view function that returns all posts with pagination.
    """
    offset = int(request.GET.get("offset", 0))
    limit = int(request.GET.get("limit", 5))
    filter = request.GET.get("filter", "all")
    username = request.GET.get("username", "")

    author_id = get_user_by_username(username)
    if filter == "user" and not author_id:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    posts_query = filter_posts(filter, author_id)
    posts_query = posts_query.order_by("-created_at")
    posts_query = annotate_posts(posts_query)

    posts = posts_query.select_related("author")[offset : offset + limit].values(
        "id",
        "avatar",
        "author__username",
        "title",
        "subheader",
        "text",
        "created_at",
        "updated_at",
        "like_count",
        "love_count",
        "angry_count",
        "celebrate_count",
    )

    formatted_posts = [format_single_post(post, author_id) for post in posts]

    return Response(formatted_posts, status=status.HTTP_200_OK)


@api_view(["GET", "POST", "DELETE", "PUT"])
def post_view(request, post_id=None):
    """
    A view function that allows authenticated users to get, create, edit, or delete post.
    """
    if request.method == "GET":
        if post_id is None:
            return Response(
                {"detail": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST
            )
        username = request.GET.get("username", "")
        author_id = get_user_by_username(username)
        posts_query = filter_posts("post", post_id)
        posts_query = annotate_posts(posts_query)

        post = (
            posts_query.select_related("author")
            .values(
                "id",
                "avatar",
                "author__username",
                "title",
                "subheader",
                "text",
                "created_at",
                "updated_at",
                "like_count",
                "love_count",
                "angry_count",
                "celebrate_count",
            )
            .get(id=post_id)
        )

        formatted_post = format_single_post(post, author_id)

        return Response(formatted_post, status=status.HTTP_200_OK)

    if request.method == "POST":
        # Extract post data from the request
        data = request.data
        username = data.get("username")
        data["author"] = get_user_by_username(username).id

        # Serialize and save the new post
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        post = Post.objects.get(id=post_id or request.data.get("post_id"))
    except Post.DoesNotExist:
        return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        post.delete()
        return Response(
            {"detail": "Post deleted successfully."}, status=status.HTTP_204_NO_CONTENT
        )
    elif request.method == "PUT":
        # Extract post data from the request
        data = request.data
        username = data.get("username")
        data["author"] = get_user_by_username(username).id

        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def reaction_view(request):
    if request.method == "POST":
        # Extract reaction data from the request
        data = request.data
        username = data.get("username")
        post_id = data.get("post_id")
        new_reaction = data.get("new_reaction").lower()
        previous_reaction = (
            data.get("previous_reaction").lower()
            if data.get("previous_reaction")
            else None
        )
        author = get_user_by_username(username)

        # Validate the data
        if not username or not post_id or not new_reaction:
            return Response(
                {"error": "Missing required fields."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Retrieve the post
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response(
                {"error": "Post not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Check if the previous reaction exists
        if not previous_reaction:
            # Create a new reaction
            Reaction.objects.create(post=post, user=author, reaction=new_reaction)
            return Response(
                {"message": "Reaction created."},
                status=status.HTTP_201_CREATED,
            )

        try:
            reaction = Reaction.objects.get(
                post=post, user=author, reaction=previous_reaction
            )
            if reaction.reaction == new_reaction:
                reaction.reaction = new_reaction
                reaction.save()
                return Response(
                    {"message": "Reaction updated."},
                    status=status.HTTP_200_OK,
                )
        except Reaction.DoesNotExist:
            # Create a new reaction
            Reaction.objects.create(post=post, user=author, reaction=new_reaction)
            return Response(
                {"message": "Reaction created."},
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {"error": "Previous reaction not found or does not match."},
            status=status.HTTP_400_BAD_REQUEST,
        )
