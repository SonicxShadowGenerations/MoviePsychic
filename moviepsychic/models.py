from django.db import models
from django.conf import settings
from backend.main import User, Movie
import os
import django

settings.configure()

django.setup()

class RawMovieData(models.Model):
    tmdbId = models.IntegerField()
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    genre = models.CharField(max_length=200)
    director = models.CharField(max_length=200)
    ratings = models.IntegerField()
    avgRating = models.FloatField()

    def __str__(self):
        return self.title

class Rating(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user.username} rated {self.movie.title} {self.rating}"


