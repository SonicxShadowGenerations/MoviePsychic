from moviepsychic.models import RawMovieData
from moviepsychic.tmdb_client import get_movie_details

def fetch_and_store_movie(tmdb_id):
    data = get_movie_details(tmdb_id)
    movie, created = RawMovieData.objects.get_or_create(
        tmdb_id=tmdb_id,
        defaults={
            "title": data.get("title"),
            "overview": data.get("overview"),
            "release_date": data.get("release_date"),
            "poster_path": data.get("poster_path"),
        }
    )
    return movie