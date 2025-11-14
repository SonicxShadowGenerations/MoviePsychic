import requests

API_KEY = "19f7be89c64787879e83cc5f17232862"
BASE_URL = "https://api.themoviedb.org/3"

url = "https://api.themoviedb.org/3/authentication"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWY3YmU4OWM2NDc4Nzg3OWU4M2NjNWYxNzIzMjg2MiIsIm5iZiI6MTc2MzA2NTEyNS4zMjE5OTk4LCJzdWIiOiI2OTE2M2QyNWRjNGYwMjg3NDZhMGRkYTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LMW_E0_18DXX1LSHHkIg1OvC3PSGmYB2LVUXC9G4QsE"
}

response = requests.get(url, headers=headers)

#print(response.text)

url2 = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"

response = requests.get(url2, headers=headers)

#print(response.text)

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

def search_movies(query, page=1):
    return tmdb_get("/search/movie", {"query": query, "page": page})

def get_movie_details(movie_id):
    return tmdb_get(f"/movie/{movie_id}")

def get_movie_recommendations(movie_id):
    return tmdb_get(f"/movie/{movie_id}/recommendations")

def get_similar_movies(movie_id):
    return tmdb_get(f"/movie/{movie_id}/similar")