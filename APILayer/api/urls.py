from django.urls import path
from . import views

urlpatterns = [
    path("search/", views.search_movies),
    path("rank/", views.rank_movies),
    path("recommend/", views.recommend_movies),
    path("random/", views.random_movies),


    path("movie/<int:tmdb_id>/", views.get_movie),
    path("store/<int:tmdb_id>/", views.store_movie),
]
