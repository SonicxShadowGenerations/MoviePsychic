import React, { useState } from "react";
import { recommendMovies } from "../api";
import MovieCard from "../components/MovieCard";

export default function RecommendPage() {
  const [ids, setIds] = useState("");
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleRecommend() {
    const arr = ids
      .split(",")
      .map(x => x.trim())
      .filter(x => x.length > 0);

    if (!arr.length) return;

    setLoading(true);
    try {
      const data = await recommendMovies(arr);
      setRecs(data.recommendations || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="recommend-page">
      <h2 style={{ color: "white" }}>Recommendations</h2>

      <input
        value={ids}
        onChange={(e) => setIds(e.target.value)}
        placeholder="Enter TMDB IDs separated by commas"
      />

      <button onClick={handleRecommend}>Reveal My Fate</button>

      {loading && <p style={{ color: "white" }}>Consulting the spirits…</p>}

      <div className="results-grid">
        {recs.map((m) => (
          <MovieCard key={m.tmdbId} movie={m} onStore={() => {}} />
        ))}
      </div>
    </div>
  );
}
