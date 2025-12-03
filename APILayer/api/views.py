from django.http import JsonResponse
from .tmdb_client import search_movies as tmdb_search, get_movie_details
from .models import RawMovieData
from .FetchStore import FASMovie

def search_movies(request):
    query = request.GET.get("q", "")
    if not query:
        return JsonResponse({"error": "Missing q"}, status=400)
    data = tmdb_search(query)
    return JsonResponse(data, safe=False)

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

def store_movie(request, tmdb_id):
    movie = FASMovie.fetch_and_store_movie(tmdb_id)
    return JsonResponse({
        "tmdbId": movie.tmdbId,
        "title": movie.title,
        "overview": movie.overview,
        "release_date": movie.release_date,
        "poster_path": movie.poster_path,
    })
