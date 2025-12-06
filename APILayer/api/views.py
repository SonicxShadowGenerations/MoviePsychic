import json
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .tmdb_client import search_movies as tmdb_search
from .tmdb_client import tmdb_request
from .FetchStore import FASMovie
from .models import RawMovieData


# ---------------------------
# SEARCH (GET)
# ---------------------------
def search_movies(request):
    query = request.GET.get("q", "")
    if not query:
        return JsonResponse({"results": []})
    data = tmdb_search(query)
    return JsonResponse(data, safe=False)


# ---------------------------
# STORE MOVIE (POST)
# ---------------------------
@csrf_exempt
def store_movie(request, tmdb_id):
    movie = FASMovie.fetch_and_store_movie(tmdb_id)
    return JsonResponse({
        "tmdbId": movie.tmdbId,
        "title": movie.title,
        "release_date": movie.release_date,
        "overview": movie.overview,
        "poster_path": movie.poster_path
    })


# ---------------------------
# RANDOM MOVIES FOR ARC (GET)
# ---------------------------
def random_movies(request):
    page = random.randint(1, 50)
    data = tmdb_request("/movie/popular", {"page": page})
    results = data.get("results", [])
    five = random.sample(results, min(5, len(results)))
    return JsonResponse({"results": five})


# ---------------------------
# RANK MOVIES (POST)
# ---------------------------
@csrf_exempt
def rank_movies(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    body = json.loads(request.body)
    ids = body.get("ids", [])

    all_movies = []
    for tmdb_id in ids:
        m = tmdb_request(f"/movie/{tmdb_id}")
        score = m.get("popularity", 0) * 0.6 + m.get("vote_average", 0) * 3
        all_movies.append({
            "tmdbId": tmdb_id,
            "title": m["title"],
            "poster_path": m.get("poster_path"),
            "overview": m.get("overview"),
            "score": score
        })

    all_movies.sort(key=lambda x: x["score"], reverse=True)
    return JsonResponse({"ranked": all_movies})


# ---------------------------
# REAL RECOMMENDATIONS (POST)
# ---------------------------
@csrf_exempt
def recommend_movies(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    body = json.loads(request.body)
    ids = body.get("ids", [])

    if not ids:
        return JsonResponse({"results": []})

    # Use first movie as the seed
    base_id = ids[0]

    # TMDB has a REAL recommendation endpoint
    data = tmdb_request(f"/movie/{base_id}/recommendations")

    recs = data.get("results", [])[:5]

    return JsonResponse({"results": recs})
