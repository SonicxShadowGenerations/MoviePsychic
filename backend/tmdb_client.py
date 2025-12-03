
import requests

API_KEY = "19f7be89c64787879e83cc5f17232862"
BASE_URL = "https://api.themoviedb.org/3"

url = "https://api.themoviedb.org/3/authentication"

def tmdb_get(endpoint, params=None):
    if params is None:
        params = {}
    params["api_key"] = API_KEY
    params["language"] = "en-US"
    url = f"{BASE_URL}{endpoint}"
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def get_popular_movies(page=1):
    return tmdb_get("/movie/popular", {"page": page})

def get_top_rated_movies(page=1):
    return tmdb_get("/movie/top_rated", {"page": page})

def search_movies(query, page=1, limit=3):
    url = f"{BASE_URL}/search/movie"
    params = {
        "api_key": API_KEY,
        "query": query,
        "page": page,
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()

    #Only return top 3 results
    results = data.get("results", [])[:limit]
    return results

def get_movie_details(movie_id):
    return tmdb_get(f"/movie/{movie_id}")

def get_movie_recommendations(movie_id):
    return tmdb_get(f"/movie/{movie_id}/recommendations")

def get_similar_movies(movie_id):
    return tmdb_get(f"/movie/{movie_id}/similar")
