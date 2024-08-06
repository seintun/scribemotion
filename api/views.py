from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.services.sentiment_analysis import analyze_sentiment


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
