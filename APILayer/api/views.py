from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .tmdb_client import (
    search_movies as tmdb_search,
    get_movie_details,
    tmdb_request
)

from .models import RawMovieData
from .FetchStore import FASMovie


# -----------------------------------------------------
#  SEARCH
# -----------------------------------------------------
def search_movies(request):
    # support BOTH ?q= and ?query=
    query = request.GET.get("q") or request.GET.get("query") or ""

    if not query:
        return JsonResponse({"error": "Missing search query"}, status=400)

    data = tmdb_search(query)
    return JsonResponse(data, safe=False)


# -----------------------------------------------------
#  GET MOVIE FROM DATABASE (your existing endpoint)
# -----------------------------------------------------
def get_movie(request, tmdb_id):
    try:
        movie = RawMovieData.objects.get(tmdbId=tmdb_id)
        return JsonResponse({
            "tmdbId": movie.tmdbId,
            "title": movie.title,
            "overview": movie.overview,
            "release_date": movie.release_date,
            "poster_path": movie.poster_path,
        })
    except RawMovieData.DoesNotExist:
        return JsonResponse({"error": "Movie not found"}, status=404)


# -----------------------------------------------------
#  STORE MOVIE INTO DATABASE (your existing endpoint)
# -----------------------------------------------------
def store_movie(request, tmdb_id):
    movie = FASMovie.fetch_and_store_movie(tmdb_id)
    return JsonResponse({
        "tmdbId": movie.tmdbId,
        "title": movie.title,
        "overview": movie.overview,
        "release_date": movie.release_date,
        "poster_path": movie.poster_path,
    })


# -----------------------------------------------------
#  RANK MOVIES (NEW)
# -----------------------------------------------------
@csrf_exempt
def rank_movies(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    try:
        body = json.loads(request.body)
    except:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    ids = body.get("ids", [])
    if not isinstance(ids, list) or not ids:
        return JsonResponse({"error": "ids must be a non-empty list"}, status=400)

    # fetch movie details from TMDB
    movies = [get_movie_details(i) for i in ids]

    # simple ranking by vote_average
    ranked = sorted(movies, key=lambda m: m.get("vote_average", 0), reverse=True)

    return JsonResponse({"ranked": ranked})


# -----------------------------------------------------
#  RECOMMEND MOVIES (NEW)
# -----------------------------------------------------
def recommend_movies(request):
    tmdb_id = request.GET.get("tmdbId")
    if not tmdb_id:
        return JsonResponse({"error": "Missing tmdbId"}, status=400)

    # base movie information
    base = get_movie_details(tmdb_id)

    if not base:
        return JsonResponse({"error": "Movie not found"}, status=404)

    genres = [g["id"] for g in base.get("genres", [])]

    # fallback if no genres
    if not genres:
        return JsonResponse({"recommendations": []})

    recs = []
    # use TMDB discover endpoint for each genre
    for g in genres:
        genre_results = tmdb_request(
            "discover/movie",
            params={"with_genres": g}
        ).get("results", [])

        recs.extend(genre_results)

    # remove duplicates & remove the original movie
    unique = {movie["id"]: movie for movie in recs}
    results = [m for m in unique.values() if m["id"] != int(tmdb_id)]

    return JsonResponse({"recommendations": results[:20]})
