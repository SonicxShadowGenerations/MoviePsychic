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
    
    def GetTmdbId(self):
        return self.tmdbId
    
    def GetTitleAndYear(self):
        return self.title + " (" + self.year + ")"
    
    def updateRatings(self, rating):
        self.ratings.append(rating)
        if self.avgRating is None:
            self.avgRating = rating
        else:
            self.avgRating = (self.avgRating + rating) / ratings.length()