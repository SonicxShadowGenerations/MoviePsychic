import React, { useState } from "react";
import { rankMovies } from "../api";

export default function RankingPage() {
  const [ids, setIds] = useState("");
  const [ranked, setRanked] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleRank() {
    const arr = ids
      .split(",")
      .map(x => x.trim())
      .filter(x => x.length > 0);

    if (!arr.length) return;

    setLoading(true);
    try {
      const data = await rankMovies(arr);
      setRanked(data.ranked || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ranking-page">
      <h2 style={{ color: "white" }}>Rank Movies</h2>

      <input
        value={ids}
        onChange={(e) => setIds(e.target.value)}
        placeholder="Enter TMDB IDs separated by commas"
      />

      <button onClick={handleRank}>Rank</button>

      {loading && <p style={{ color: "white" }}>Divining the order…</p>}

      <ul>
        {ranked.map((m) => (
          <li key={m.tmdbId}>
            {m.title} — Score: {m.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
