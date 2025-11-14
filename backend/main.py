class Movie:

    def __init__(self, title, year, genre, director, tmdbId):
        self.title = title
        self.year = year
        self.genre = genre
        self.director = director
        self.tmdbId = tmdbId
        self.ratings = []
        self.avgRating = None

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
        return self.title + " (" + self.year + ")"
    
    def getRating(self):
        return self.avgRating
    
    def updateRatings(self, rating):
        if (rating >=0 and rating <= 10):
            self.ratings.append(rating)
            self.avgRating = (self.avgRating + rating) / len(self.ratings)
        else:
            print("Error: rating invalid")

class RatedMovie(Movie):
    def __init__(self, parentMovie, personalRating):
        self.parentMovie = parentMovie
        self.title = parentMovie.getTitle()
        self.year = parentMovie.getYear()
        self.genre = parentMovie.getGenre()
        self.director = parentMovie.getDirector()
        self.tmdbId = parentMovie.getTmdbId()
        self.personalRating = personalRating
    
    def getRating(self):
        return self.personalRating
    
    def getParent(self):
        return self.parentMovie


class User:

    def __init__(self, username):

        self.username = username
        self.genres = set()
        self.directors = set()
        self.movies = []

    def rateMovie(self, movie, rating):
        if movie == None or rating == None:
            print("Error: invalid movie")
        elif self.getMovies().count(movie) == 0:
            ratedMovie = RatedMovie(movie, rating)
            self.getMovies().append(ratedMovie)
            movie.updateRatings(rating)
            self.getMovies().sort(key=RatedMovie.getTitle())
        else:
            ratedMovie = RatedMovie(movie, rating)

        if rating >= 8:
            self.getGenres().add(movie.getGenre)
            self.getDirectors().add(movie.getDirector)
    
    def getMovies(self):
        return self.movies
    
    def getGenres(self):
        return self.genres
    
    def getDirectors(self):
        return self.directors

class Comparator:

    def __init__(self, comparingUser, comparedUser):
        self.comparingUser = comparingUser # user that initiates comparison
        self.comparedUser = comparedUser # user that is compared against
        self.compatible = False

    def compare(self):
        similarMovies = set()
        sharedMovies = []

        # Build the set of movies that both users have watched
        sharedMovies = list(set(self.comparingUser.getMovies()) & set(self.comparedUser.getMovies()))

        for movie in sharedMovies:
            print(movie.getTitle())

        for movie1 in self.comparingUser.getMovies():
            for movie2 in self.comparedUser.getMovies():
                if (movie1.getTitle() == movie2.getTitle()) and (movie1.getRating() <= (movie2.getRating() + 1)) and (movie1.getRating() >=  (movie2.getRating() - 1)):
                    sharedMovies.append(Movie(movie1.getTitle(), movie1.getYear(), movie1.getGenre(), movie1.getDirector(), movie1.getTmdbId()))
        
        # Finally, if the cardinality of similarMovies is at least 60% of the shared movies,
        # then users are deemed compatible enough for the recommendation to use this data
        if len(similarMovies) >= (((len(sharedMovies)) * 3) / 5):
            self.compatible = True
        
        for movie in similarMovies:
            print(movie.getTitle())

        print(self.compatible)
        return self.compatible

class Recommender:

    def __init__(self, user):
        self.user = user
        self.users = None # Placeholder, will eventually be some set of other users on the site
        self.userMovies = set()
        self.generalMovies = set()
        self.recommendedMovies = set()
    
    # Finds a random user with commonality and chooses them for comparison
    def userComparison(self):
        for u in self.users:
            if Comparator(self.user, u).compare() == True:
                comparedUser = u
                break
        i = 0
        while i >= 1:
            self.userMovies.add(comparedUser.getMovies[i])
            i = i + 1
    
    def recommendMovies(self):
        self.recommendedMovies = self.userMovies.union(self.generalMovies)
        print(self.recommendedMovies)

def main():
    return

if __name__ == "__main__":
    main()