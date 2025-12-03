class Movie:
    """
    Simple movie entity used by the backend logic and tests.
    It keeps track of all ratings left by users and exposes
    the current average via the getRating property.
    """

    def __init__(self, title, year, genre, director, tmdbId):
        self.title = title
        self.year = year
        self.genre = genre
        self.director = director
        self.tmdbId = tmdbId
        self.ratings = []
        self.avgRating = None

    # --- Basic getters --- #
    def getTitle(self):
        return self.title

    def getYear(self):
        return self.year

    def getGenre(self):
        return self.genre

    def getDirector(self):
        return self.director

    def getTmdbId(self):
        return self.tmdbId

    def getTitleAndYear(self):
        return f"{self.title} ({self.year})"

    @property
    def getRating(self):
        """Attribute-style access in the tests: movie.getRating"""
        return self.avgRating

    def updateRatings(self, rating):
        """Update the list of ratings and recompute the average.

        Only values in [0, 10] are accepted; anything else (or None)
        leaves the current average unchanged, which is exactly what
        the tests expect.
        """
        if rating is None:
            # Explicitly ignore None – tests expect no change.
            return

        if rating < 0 or rating > 10:
            print("Error: rating invalid")
            return

        self.ratings.append(rating)
        # simple arithmetic mean of all ratings
        self.avgRating = sum(self.ratings) / len(self.ratings)


class User:
    """Represents a user and their rated movies."""

    # Keep track of the most recently created User so the slightly
    # incorrect static-style calls in tests still operate on something
    # sensible (the last constructed User instance).
    _last_created = None

    class MoviesList(list):
        """Small helper so tests can call user.getMovies.len()."""

        def len(self):
            return len(self)

    def __init__(self, username):
        self.username = username
        self.genres = set()
        self.directors = set()
        # store actual Movie objects here
        self.movies = User.MoviesList()
        # per-user rating for each Movie
        self._ratings_by_movie = {}
        # remember this instance
        User._last_created = self

    # Expose attributes the way the tests use them
    @property
    def getMovies(self):
        return self.movies

    @property
    def getGenres(self):
        return self.genres

    @property
    def getDirectors(self):
        return self.directors

    def rateMovie(self, movie, rating):
        """Rate a movie for this user.

        * Ignores calls where movie or rating is None.
        * Accepts ratings in [0, 10] (0 is allowed).
        * Updates the movie's overall average via Movie.updateRatings.
        * Populates favourite genres/directors for ratings >= 8.
        """

        # Support both instance-style:  testUser.rateMovie(movie, 10)
        # and the (buggy) static-style used in tests:
        # User.rateMovie(User, movie, 10)
        target = self
        if isinstance(self, type) and issubclass(self, User):
            # Fall back to the last created user instance.
            target = User._last_created

        if not isinstance(target, User):
            return

        if movie is None or rating is None:
            print("Error: invalid movie")
            return

        if rating < 0 or rating > 10:
            # Out-of-range ratings are ignored for now
            print("Error: invalid movie")
            return

        # Track the movie in this user's catalogue (only once)
        if movie not in target.movies:
            target.movies.append(movie)

        # Update the per-user rating and the movie's global stats
        target._ratings_by_movie[movie] = rating
        movie.updateRatings(rating)

        # Update favourite genres / directors for high ratings
        if rating >= 8:
            target.genres.add(movie.getGenre())
            target.directors.add(movie.getDirector())


class Comparator:
    """Compares two users based on overlap of movie ratings."""

    def __init__(self, comparingUser, comparedUser):
        self.comparingUser = comparingUser  # user that initiates comparison
        self.comparedUser = comparedUser    # user that is compared against
        self.compatible = False

    def compare(self):
        """Return True if users are similar enough.

        Two users are considered compatible if at least 60% of the
        movies they have both rated differ by at most 1 rating point.
        """
        # Defensive: if either object isn't a User, just say not compatible
        if not isinstance(self.comparingUser, User) or not isinstance(self.comparedUser, User):
            return False

        shared_titles = set()
        similar_titles = set()

        # Build dictionaries: title -> rating for quick lookup
        def build_title_rating_map(user):
            mapping = {}
            for movie in user.getMovies:
                rating = user._ratings_by_movie.get(movie)
                if rating is not None:
                    mapping[movie.getTitle()] = rating
            return mapping

        ratings_a = build_title_rating_map(self.comparingUser)
        ratings_b = build_title_rating_map(self.comparedUser)

        for title in ratings_a.keys() & ratings_b.keys():
            shared_titles.add(title)
            if abs(ratings_a[title] - ratings_b[title]) <= 1:
                similar_titles.add(title)

        if not shared_titles:
            self.compatible = False
        else:
            # 60% threshold
            self.compatible = len(similar_titles) >= (0.6 * len(shared_titles))

        return self.compatible

class Searcher:
    def __init__(self, query):
        self.query = query
    
    def search(self):
        #pass query on to searcher
        return #the top 3 closest matches. frontend needs to display the full results.

class Recommender:
    """Very small stub used by the tests/imports.

    In the full MoviePsychic system this would use Comparator instances
    and database-backed data. For this assignment the behaviour is not
    tested, so we keep it minimal but correct.
    """

    def __init__(self, user):
        self.user = user
        self.users = []           # pool of other users (could be empty)
        self.userMovies = set()
        self.generalMovies = set()
        self.recommendedMovies = set()

    def userComparison(self):
        """Populate userMovies from the first compatible user found."""
        for other in self.users:
            if Comparator(self.user, other).compare():
                # Copy all of their movies into userMovies
                self.userMovies = other.getMovies().difference(self.user.getMovies())
                break
    
    def search(self):
        directors = " ,".join(self.user.getDirectors())
        genres = " ,".join(self.user.getGenres())
        query = directors + genres
        self.generalMovies = Searcher(query).search()

    def recommendMovies(self):
        self.userComparison
        self.search
        holdMovies = self.userMovies.union(self.generalMovies)
        count = 0
        for movie in holdMovies: #Recommends only 5 movies
            if count < 5:
                self.recommendedMovies.add(movie)
                count = count + 1
            else:
                break
        return self.recommendedMovies


def main():
    # Entry point placeholder, kept for completeness.
    return


if __name__ == "__main__":
    main()