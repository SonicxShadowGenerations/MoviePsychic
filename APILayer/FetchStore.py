from APILayer.models import RawMovieData
from APILayer.tmdb_client import get_movie_details

def fetch_and_store_movie(tmdbId):
    data = get_movie_details(tmdbId)
    movie, created = RawMovieData.objects.get_or_create(
        tmdbId=tmdbId,
        defaults={
            "title": data.get("title"),
            "overview": data.get("overview"),
            "release_date": data.get("release_date"),
            "poster_path": data.get("poster_path"),
        }
    )
    return movie.title

def main():
    print(fetch_and_store_movie("1"))
    print(fetch_and_store_movie("2"))