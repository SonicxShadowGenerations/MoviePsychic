import requests
import os

TMDB_API_KEY = os.getenv("TMDB_API_KEY", "")
BASE_URL = "https://api.themoviedb.org/3"

def search_movies(query):
    url = f"{BASE_URL}/search/movie?api_key={TMDB_API_KEY}&query={query}"
    response = requests.get(url)
    return response.json()

def get_movie_details(tmdb_id):
    url = f"{BASE_URL}/movie/{tmdb_id}?api_key={TMDB_API_KEY}"
    response = requests.get(url)
    return response.json()
