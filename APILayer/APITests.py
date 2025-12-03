from django.test import TestCase
from unittest.mock import patch
from APILayer.api.tmdb_client import get_movie_details, search_movies
import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "APILayer.settings")
django.setup()

class TMDBClientTests(TestCase):

    # Test for returning movie details given an ID
    @patch("APILayer.tmdb_client.requests.get")
    def test_get_movie_details(self, mock_get):
        # Mock response JSON
        mock_get.return_value.json.return_value = {
            "id": 123,
            "title": "Inception",
            "overview": "A mind-bending thriller",
            "release_date": "2010-07-16"
        }
        mock_get.return_value.status_code = 200

        data = get_movie_details(123)
        self.assertEqual(data["title"], "Inception")
        self.assertEqual(data["id"], 123)

    # Test for searching for a movie by title
    @patch("APILayer.tmdb_client.requests.get")
    def test_search_movies(self, mock_get):
        mock_get.return_value.json.return_value = {
            "results": [
                {"id": 456, "title": "Interstellar"}
            ]
        }
        mock_get.return_value.status_code = 200

        data = search_movies("Interstellar")
        self.assertEqual(data["results"][0]["title"], "Interstellar")