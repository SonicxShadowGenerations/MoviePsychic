import React, { useState } from "react";
import { fetchRecommendations } from "../api";
import "../components/RecommendationsPanel.css";

export default function RecommendPage() {
  const [ids, setIds] = useState("");
  const [recs, setRecs] = useState([]);

  async function handleRecommend() {
    const arr = ids
      .split(",")
      .map(x => x.trim())
      .filter(x => x.length > 0);

    if (arr.length === 0) return;

    const data = await fetchRecommendations(arr);
    setRecs(data.results || []);
  }

  return (
    <div className="recommend-page">
      <h2>Get Recommendations</h2>

      <input
        placeholder="Enter TMDB IDs (comma separated)"
        value={ids}
        onChange={(e) => setIds(e.target.value)}
      />

      <button onClick={handleRecommend}>Reveal My Fate</button>

      <div className="recommend-list">
        {recs.map((m) => (
          <div className="recommend-card" key={m.id}>
            <img
              src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
              alt={m.title}
            />
            <p>{m.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
