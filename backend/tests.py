import unittest
from main import Movie
from main import User
from main import Comparator
from main import Recommender


class TestMovieMethods(unittest.TestCase):
    def testUpdateRatings(self):
        testMovie = Movie("Citizen Kane", "1940", "Thriller", "Wells", 0)

        # First valid rating
        testMovie.updateRatings(10)
        self.assertEqual(testMovie.getRating, 10)

        # Second valid rating
        testMovie.updateRatings(5)
        self.assertEqual(testMovie.getRating, 7.5)

        # Invalid > 10 – should be ignored
        testMovie.updateRatings(11)
        self.assertEqual(testMovie.getRating, 7.5)

        # Invalid < 0 – should be ignored
        testMovie.updateRatings(-1)
        self.assertEqual(testMovie.getRating, 7.5)

        # Valid rating at 0 – average should change
        testMovie.updateRatings(0)
        self.assertEqual(testMovie.getRating, 5)

        # None – should be ignored and leave average unchanged
        testMovie.updateRatings(None)
        self.assertEqual(testMovie.getRating, 5)


class TestUserMethods(unittest.TestCase):
    def testRateMovie(self):
        testMovie = Movie("Citizen Kane", "1940", "Thriller", "Wells", 0)
        testMovie2 = Movie("Anomalisa", "2015", "Drama", "Kaufman & Jonson", 1)
        testUser = User("Joshua")

        # Invalid movie / rating should not add anything
        testUser.rateMovie(None, None)
        self.assertEqual(testUser.getMovies.len(), 0)

        # First time rating a movie
        testUser.rateMovie(testMovie, 10)
        self.assertEqual(testUser.getMovies.count(testMovie), 1)
        self.assertEqual(testMovie.ratings.count(10), 1)
        self.assertTrue("Thriller" in testUser.getGenres)
        self.assertTrue("Wells" in testUser.getDirectors)

        # Rating the same movie again should not duplicate it in the list
        testUser.rateMovie(testMovie, 10)
        self.assertEqual(testUser.getMovies.count(testMovie), 1)

        # Rating a different movie with 0 should still add it to movies
        testUser.rateMovie(testMovie2, 0)
        self.assertEqual(testUser.getMovies.count(testMovie2), 1)
        self.assertEqual(testMovie2.ratings.count(0), 1)


class TestComparatorMethods(unittest.TestCase):
    def testCompare(self):
        userA = User("Michael")
        userB = User("Jessica")
        userC = User("Andrew")  # currently unused, but fine to keep

        movieA = Movie("Oppenheimer", "2023", "Thriller", "Christopher Nolan", 0)
        movieB = Movie("Inception", "2010", "Science Fiction", "Christopher Nolan", 1)
        movieC = Movie("Interstellar", "2014", "Science Fiction", "Christopher Nolan", 2)
        movieD = Movie("The Matrix", "1999", "Science Fiction", "The Wachowskis", 3)
        movieE = Movie("Dune", "2021", "Science Fiction", "Denis Villeneuve", 4)
        movieF = Movie("Citizen Kane", "1941", "Drama", "Orson Welles", 5)
        movieG = Movie("Casablanca", "1942", "Drama", "Michael Curtiz", 6)

        # User A ratings
        userA.rateMovie(movieA, 9)
        userA.rateMovie(movieC, 3)
        userA.rateMovie(movieD, 10)
        userA.rateMovie(movieE, 7)
        userA.rateMovie(movieG, 9)
        userA.rateMovie(movieF, 10)

        # User B ratings (same movies mostly, similar scores)
        userB.rateMovie(movieA, 9)
        userB.rateMovie(movieB, 8)
        userB.rateMovie(movieC, 3)
        userB.rateMovie(movieD, 10)
        userB.rateMovie(movieE, 7)
        userB.rateMovie(movieG, 9)

        comparator = Comparator(userA, userB)
        self.assertTrue(comparator.compare())


if __name__ == '__main__':
    unittest.main()
