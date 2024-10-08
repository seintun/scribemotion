import os
import re
import json
import math
from textblob import TextBlob

# Get the absolute path to the emotions.json file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
emotions_file_path = os.path.join(BASE_DIR, "services/data/emotions.json")

# Load the EMOTIONS dictionary from the JSON file
with open(emotions_file_path, "r", encoding="utf-8") as json_file:
    emotions_list = json.load(json_file)

# Default list of scam-related keywords
DEFAULT_SCAM_KEYWORDS = [
    "scam",
    "fraud",
    "fake",
    "phishing",
    "spam",
    "hoax",
    "con",
    "deceptive",
    "lottery",
    "prize",
    "winner",
    "urgent",
    "investment",
    "guaranteed",
    "limited",
    "offer",
    "free",
    "cash",
    "transfer",
    "bank details",
    "confidential",
    "identity",
    "verification",
    "password",
    "username",
    "credit card",
    "claim",
    "money back",
    "risk-free",
    "refund",
    "unauthorized",
    "suspicious",
    "account",
    "security",
    "verify",
    "login",
    "update",
    "required",
    "important",
    "expire",
]


def detect_scam_result(input_text: str, scam_keywords: list = None) -> float:
    """
    Detects the presence of scam-related keywords in a given text and assigns a score from 0 to 10.

    Parameters:
    ----------
    - `input_text` : str
        The text string to be analyzed.
    - `scam_keywords` : list, optional
        A list of scam-related keywords or phrases. Default is None.

    Returns:
    -------
    - tuple
        Contains the scam `score` (float) and a list of `identified_scam_keywords`.
    """
    if scam_keywords is None:
        scam_keywords = DEFAULT_SCAM_KEYWORDS

    # Use TextBlob to preprocess text and get individual words
    blob = TextBlob(input_text)
    words = {word.lower() for word in blob.words}

    # Compile the regex pattern for scam keyword detection
    scam_pattern = re.compile(
        r"\b("
        + "|".join(re.escape(keyword.lower()) for keyword in scam_keywords)
        + r")\b",
        re.IGNORECASE,
    )

    # Identify and collect the scam keywords found in the text
    identified_scam_words = {
        "keywords": [word for word in words if scam_pattern.search(word)]
    }

    # Count the number of scam keywords found in the text
    match_count = len(identified_scam_words["keywords"])

    # Calculate the scam score (0-10) based on the number of matches
    max_score = 10
    if match_count == 0:
        score = 0
    else:
        # Logarithmic Scaling: Used `math.log1p` to calculate the scam score,
        # which increases sensitivity by giving higher scores for fewer matches.
        score = min(
            max_score,
            max_score * math.log1p(match_count) / math.log1p(len(scam_keywords)),
        )

    return score, identified_scam_words


def analyze_sentiment(input_text: str):
    """
    Analyzes the sentiment, emotions, and scam likelihood of a given text.

    Parameters:
    ----------
    - `input_text` : str
        The text to be analyzed.

    Returns:
    -------
    dict
        A dictionary with sentiment scores, identified emotions,
        matching words, and scam likelihood score.
        Example:
        ```
        {
            "sentiment": {"positive": 2.34, "negative": 0},
            "subjective": true,
            "emotions": [["happy", 11]],
            "matching_words": {"happy": ["marvelous", "thrilled", "fortunate", "victorious", "grateful", "jubilant", "enthusiastic", "lucky", "assured", "determined", "ecstatic"]},
            "scam": {
                "score": 6.69141894960796,
                "matching_words": ["limited", "winner", "prize", "offer", "lottery"]
            },
        }
        ```
    """
    if not input_text.strip():
        return {
            "sentiment": {"positive": 0, "neutral": 0, "negative": 0},
            "subjective": False,
            "emotions": [],
            "matching_words": {},
            "scam_score": 0.0,
        }

    # Process the text using TextBlob
    blob = TextBlob(input_text)
    sentiment = blob.sentiment

    # Calculate sentiment scores
    # Normalize the polarity score to a 0-10 scale
    positive_score = round(max(0, sentiment.polarity) * 10, 2)
    negative_score = round(max(0, -sentiment.polarity) * 10, 2)

    sentiment_score = {
        "positive": positive_score,
        "negative": negative_score,
    }

    # Determine if the text is subjective (opinion-based)
    subjective = blob.sentiment.subjectivity > 0.5

    # Analyze emotions based on the updated EMOTIONS dictionary
    words = {word.lower() for word in blob.words}
    emotions = []
    matching_words = {emotion: [] for emotion in emotions_list}

    # Check for matching words in the input text
    # and assign emotions based on the EMOTIONS dictionary
    for word in words:
        for emotion, keywords in emotions_list.items():
            if word in keywords:
                emotions.append(emotion)
                matching_words[emotion].append(word)

    # Count top 5 emotions based on frequency
    emotion_count_dict = {}
    for emotion in emotions:
        if emotion in emotion_count_dict:
            emotion_count_dict[emotion] += 1
        else:
            emotion_count_dict[emotion] = 1

    sorted_emotion_count = sorted(
        emotion_count_dict.items(), key=lambda item: item[1], reverse=True
    )
    top_5_emotions = sorted_emotion_count[:5]

    matching_words = {
        emotion: words for emotion, words in matching_words.items() if words
    }

    # Calculate scam score
    scam_result = detect_scam_result(input_text)

    return {
        "sentiment": sentiment_score,
        "subjective": subjective,
        "emotions": top_5_emotions,
        "matching_words": matching_words,
        "scam": {
            "score": scam_result[0],
            "matching_words": scam_result[1],
        },
    }
