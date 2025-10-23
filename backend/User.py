class User:

    def __init__(self, username, genres, directors, movies):

        self.username = username
        self.genres = genres
        self.directors = directors
        self.movies = movies

    def rateMovie(movie, rating):
        movies.append(movie)
        movie.updateRatings(rating)
        