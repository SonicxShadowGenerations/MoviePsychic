import React from "react";

export default function MovieCard({ movie, onStore }) {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="poster"
      />

      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
      <p className="overview">{movie.overview?.slice(0, 120)}...</p>

      <button onClick={() => onStore(movie.id)} className="store-btn">
        Store Movie
      </button>
    </div>
  );
}
