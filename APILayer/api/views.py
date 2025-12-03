from django.http import JsonResponse
from .tmdb_client import search_movies as tmdb_search, get_movie_details
from .models import RawMovieData
from .FetchStore import FASMovie


# ---------------------------
# SEARCH
# ---------------------------
def search_movies(request):
    query = request.GET.get("q", "")
    if not query:
        return JsonResponse({"error": "Missing q"}, status=400)

    data = tmdb_search(query)
    return JsonResponse(data, safe=False)


# ---------------------------
# GET SINGLE MOVIE (from DB)
# ---------------------------
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


# ---------------------------
# STORE A MOVIE IN DATABASE
# ---------------------------
def store_movie(request, tmdb_id):
    movie = FASMovie.fetch_and_store_movie(tmdb_id)
    return JsonResponse({
        "tmdbId": movie.tmdbId,
        "title": movie.title,
        "overview": movie.overview,
        "release_date": movie.release_date,
        "poster_path": movie.poster_path,
    })


# ---------------------------
# RANK MOVIES (Simple Demo Ranking)
# ---------------------------
def rank_movies(request):
    """
    Simple ranking algorithm:
      - Higher popularity = better rank
      - Higher vote_average = better rank
    """
    query = request.GET.get("q", "")
    if not query:
        return JsonResponse({"error": "Missing q"}, status=400)

    results = tmdb_search(query)
    rank_list = []

    for movie in results.get("results", []):
        score = movie.get("popularity", 0) * 0.7 + movie.get("vote_average", 0) * 3
        rank_list.append({
            "tmdbId": movie["id"],
            "title": movie["title"],
            "poster_path": movie.get("poster_path"),
            "overview": movie.get("overview"),
            "score": round(score, 2),
        })

    # Sort by score descending
    rank_list.sort(key=lambda x: x["score"], reverse=True)

    return JsonResponse(rank_list, safe=False)


# ---------------------------
# SIMPLE RECOMMENDATION API
# ---------------------------
def recommend_movies(request):
    """
    Simple recommendation mock:
    Recommend movies similar to the TOP scored movie.
    """
    query = request.GET.get("q", "")
    if not query:
        return JsonResponse({"error": "Missing q"}, status=400)

    results = tmdb_search(query)
    if not results.get("results"):
        return JsonResponse([], safe=False)

    # Pick top movie
    first = results["results"][0]
    base_title = first["title"].split()[0]  # first word

    # Search again using first word for "similar"
    rec_results = tmdb_search(base_title)

    return JsonResponse(rec_results.get("results", []), safe=False)

