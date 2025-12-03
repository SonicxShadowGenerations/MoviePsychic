import React, { useState } from "react";
import { recommendMovies } from "../api";
import MovieCard from "../components/MovieCard";

export default function RecommendPage() {
  const [ids, setIds] = useState("");
  const [recs, setRecs] = useState([]);

  async function handleRecommend() {
    const arr = ids.split(",").map((x) => x.trim());
    const data = await recommendMovies(arr);
    setRecs(data.recommendations || []);
  }

  return (
    <div>
      <h2>Recommended Movies</h2>

      <input
        value={ids}
        onChange={(e) => setIds(e.target.value)}
        placeholder="Enter stored TMDB IDs"
      />

      <button onClick={handleRecommend}>Recommend</button>

      <div className="results-grid">
        {recs.map((m) => (
          <MovieCard key={m.tmdbId} movie={m} />
        ))}
      </div>
    </div>
  );
}
