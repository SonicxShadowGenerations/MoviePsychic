import React, { useEffect, useState } from "react";
import PsychicHands from "./PsychicHands";
import PsychicFigure from "./PsychicFigure";
import SpeechBubble from "./SpeechBubble";
import CardArc from "./CardArc";
import SelectedTray from "./SelectedTray";
import { fetchRandomMovies, searchMovies, recommendMovies } from "../api";
import "./PsychicScene.css";

export default function PsychicScene() {
  const [movies, setMovies] = useState([]);
  const [hand, setHand] = useState([]);
  const [shake, setShake] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  // 🔮 Load 5 random TMDB movies when scene starts
  useEffect(() => {
    (async () => {
      const data = await fetchRandomMovies();
      setMovies(data.movies || []);
    })();
  }, []);

  // 🔮 Handle picking a card
  async function handlePicked(movie) {
    const next = [...hand, movie];
    setHand(next);

    setShake(true);
    setTimeout(() => setShake(false), 500);

    // when 5 are picked → ask backend for recommendations
    if (next.length === 5) {
      const ids = next.map((m) => m.tmdbId);
      const recs = await recommendMovies(ids);
      setRecommendations(recs.recommendations || []);
    }
  }

  // 🔮 Replace a random card with a searched movie
  async function handleSwapSearch(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    const data = await searchMovies(searchQuery);
    if (!data.results || data.results.length === 0) return;

    const found = data.results[0];
    const idx = Math.floor(Math.random() * movies.length);

    const updated = [...movies];
    updated[idx] = {
      tmdbId: found.id,
      title: found.title,
      image: `https://image.tmdb.org/t/p/w300${found.poster_path}`,
    };

    setMovies(updated);
    setSearchQuery("");
  }

  return (
    <div className="psychic-scene-scroll">
      {/* 🔮 Top recommendation strip */}
      {recommendations.length > 0 && (
        <div className="recommendations-panel">
          <div className="recommendations-header">
            <span className="recommendations-label">NEXT VISIONS</span>
            <span className="recommendations-hint">
              Scroll up to study the futures I see for you…
            </span>
          </div>

          <div className="recommendations-row">
            {recommendations.map((rec) => (
              <div key={rec.id} className="recommendation-card">
                <div className="rec-title">{rec.title}</div>
                <div className="rec-reason">{rec.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🔮 Core scene (orb, hands, search, cards) */}
      <div className="psychic-core">
        <form onSubmit={handleSwapSearch} className="psychic-search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Whisper a movie into the aether..."
          />
          <button type="submit">Swap</button>
        </form>

        <PsychicHands shake={shake} />
        <PsychicFigure />

        <SpeechBubble text="Pick a card, and I will reveal your fate..." />

        <CardArc movies={movies} onPick={handlePicked} />
        <SelectedTray items={hand} />
      </div>
    </div>
  );
}
