from django.urls import path
from . import views

urlpatterns = [
    path("search/", views.search_movies),
    path("store/<int:tmdb_id>/", views.store_movie),
    path("movie/<int:tmdb_id>/", views.get_movie),
]
