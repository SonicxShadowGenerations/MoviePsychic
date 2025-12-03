from django.db import models

class RawMovieData(models.Model):
    tmdbId = models.IntegerField(unique=True)
    title = models.CharField(max_length=200)
    overview = models.TextField(blank=True)
    release_date = models.CharField(max_length=20, blank=True)
    poster_path = models.CharField(max_length=300, blank=True)

    class Meta:
        db_table = "raw_movie_data"

    def __str__(self):
        return self.title
