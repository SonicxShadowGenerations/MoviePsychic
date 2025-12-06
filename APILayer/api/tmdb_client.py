import os
import requests
from django.conf import settings

# Load the key from Django settings (which loads from environment)
TMDB_API_KEY = settings.TMDB_API_KEY

if not TMDB_API_KEY:
    raise RuntimeError("TMDB_API_KEY is not set in environment or settings")

BASE_URL = "https://api.themoviedb.org/3"


def tmdb_request(path, params=None):
    if params is None:
        params = {}

    params["api_key"] = TMDB_API_KEY
    url = f"{BASE_URL}{path}"

    response = requests.get(url, params=params)

    # If TMDB errors, show the actual error
    if response.status_code != 200:
        raise RuntimeError(f"TMDB error: {response.text}")

    return response.json()


def search_movies(query):
    return tmdb_request("/search/movie", {"query": query})


def get_movie_details(tmdb_id):
    return tmdb_request(f"/movie/{tmdb_id}")
