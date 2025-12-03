import React, { useState } from "react";
import { searchMovies, storeMovie } from "../api";
import MovieCard from "../components/MovieCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    const data = await searchMovies(query);
    setResults(data.results || []);
  }

  async function handleStore(id) {
    await storeMovie(id);
    alert("Stored!");
  }

  return (
    <div className="search-page">
      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="results-grid">
        {results.map((m) => (
          <MovieCard key={m.id} movie={m} onStore={handleStore} />
        ))}
      </div>
    </div>
  );
}
