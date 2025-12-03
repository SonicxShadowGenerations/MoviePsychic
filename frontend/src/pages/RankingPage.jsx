import React, { useState } from "react";
import { rankMovies } from "../api";

export default function RankingPage() {
  const [ids, setIds] = useState("");
  const [ranked, setRanked] = useState([]);

  async function handleRank() {
    const arr = ids.split(",").map((x) => x.trim());
    const data = await rankMovies(arr);
    setRanked(data.ranked || []);
  }

  return (
    <div className="ranking-page">
      <h2>Rank Movies</h2>

      <input
        value={ids}
        onChange={(e) => setIds(e.target.value)}
        placeholder="Enter TMDB IDs separated by commas"
      />

      <button onClick={handleRank}>Rank</button>

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
