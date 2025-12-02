import unittest
from main import Movie, User, Comparator, Recommender


class TestMovieMethods(unittest.TestCase):

    def testUpdateRatings(self):
        testMovie = Movie("Citizen Kane", "1940", "Thriller", "Wells", 0)

        # Single valid rating
        testMovie.updateRatings(10)
        self.assertEqual(testMovie.getRating, 10)

        # Multiple valid ratings
        testMovie.updateRatings(6)
        testMovie.updateRatings(8)
        self.assertAlmostEqual(testMovie.getRating, (10 + 6 + 8) / 3)

        # Invalid ratings (should not change average)
        testMovie.updateRatings(11)
        testMovie.updateRatings(-5)
        self.assertAlmostEqual(testMovie.getRating, (10 + 6 + 8) / 3)

        # None ignored
        testMovie.updateRatings(None)
        self.assertAlmostEqual(testMovie.getRating, (10 + 6 + 8) / 3)


class TestUserMethods(unittest.TestCase):

    def testRateMovie(self):
        testUser = User("Joshua")
        movie1 = Movie("Citizen Kane", "1940", "Thriller", "Wells", 0)
        movie2 = Movie("Interstellar", "2014", "SciFi", "Nolan", 1)
        movie3 = Movie("The Matrix", "1999", "SciFi", "Wachowskis", 2)

        # Valid: add movie & rating (>=8 → genre/director tracked)
        testUser.rateMovie(movie1, 8)
        self.assertEqual(testUser.getMovies.count(movie1), 1)
        self.assertIn("Thriller", testUser.getGenres)
        self.assertIn("Wells", testUser.getDirectors)

        # Valid: rating 7 (should NOT add genre/director)
        testUser.rateMovie(movie2, 7)
        self.assertEqual(testUser.getMovies.count(movie2), 1)
        self.assertNotIn("SciFi", testUser.getGenres)
        self.assertNotIn("Nolan", testUser.getDirectors)

        # Valid: rating overwrite (rating same movie again)
        testUser.rateMovie(movie1, 10)
        self.assertEqual(len(movie1.ratings), 2)
        self.assertEqual(movie1.getRating, 9)  # avg of 8 & 10

        # Valid: rating = 0
        testUser.rateMovie(movie3, 0)
        self.assertEqual(movie3.ratings, [0])

        # Invalid: movie=None (should not change movie list)
        testUser.rateMovie(None, 5)
        self.assertEqual(testUser.getMovies.len(), 3)  # unchanged


class TestComparatorMethods(unittest.TestCase):

    def testCompare(self):
        a = User("A")
        b = User("B")

        m1 = Movie("Movie1", 2020, "Thriller", "D1", 0)
        m2 = Movie("Movie2", 2021, "Drama", "D2", 1)
        m3 = Movie("Movie3", 2022, "Action", "D3", 2)
        m4 = Movie("Movie4", 2023, "SciFi", "D4", 3)

        # Valid: identical ratings
        a.rateMovie(m1, 8)
        b.rateMovie(m1, 8)

        # Valid: close ratings (≤1 difference)
        a.rateMovie(m2, 7)
        b.rateMovie(m2, 6)

        # Valid: far ratings (>1 difference)
        a.rateMovie(m3, 10)
        b.rateMovie(m3, 5)

        # Valid: a movie only A has
        a.rateMovie(m4, 9)

        comparator = Comparator(a, b)

        # Shared movies: m1, m2, m3  → 3 shared
        # Similar ratings: m1 (yes), m2 (yes), m3 (no) → 2 similar
        # 2/3 ≈ 0.66 >= 0.6 → True
        self.assertTrue(comparator.compare())


class TestRecommenderMethods(unittest.TestCase):

    def testRecommendMovies(self):
        userMain = User("Main")
        userOther = User("Other")

        m1 = Movie("Movie1", 2020, "Thriller", "X", 0)
        m2 = Movie("Movie2", 2021, "SciFi", "Y", 1)
        m3 = Movie("Movie3", 2022, "Drama", "Z", 2)

        # Shared: identical ratings → compatible
        userMain.rateMovie(m1, 9)
        userOther.rateMovie(m1, 9)

        # Recommender setup
        rec = Recommender(userMain)
        rec.users = [userOther]

        # Compare and pull compatible user's movies
        rec.userComparison()
        self.assertIn(m1, rec.userMovies)

        # Add general movies
        rec.generalMovies.add(m2)
        rec.generalMovies.add(m3)

        # Check union output
        results = rec.recommendMovies()
        self.assertIn(m1, results)
        self.assertIn(m2, results)
        self.assertIn(m3, results)


if __name__ == "__main__":
    unittest.main()
