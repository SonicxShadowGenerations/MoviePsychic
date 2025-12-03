import React, { useState } from "react";
import PsychicHands from "./PsychicHands.jsx";
import PsychicFigure from "./PsychicFigure";
import SpeechBubble from "./SpeechBubble";
import CardArc from "./CardArc";
import SelectedTray from "./SelectedTray";
import { searchMovies, recommendMovies } from "../api";   // ✅ USE REAL API
import "./PsychicScene.css";

// ❌ OLD HARDCODED DATA (DELETE)
// const initialMovies = [...]

export default function PsychicScene() {
  const [movies, setMovies] = useState([]);        // arc movies
  const [projectedImage, setProjectedImage] = useState(null);
  const [hand, setHand] = useState([]);
  const [shake, setShake] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 🌙 When user inserts a movie into the arc
  async function handleSwapSearch(e) {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    // 🔎 Call Django backend → get TMDB results
    const data = await searchMovies(trimmed);

    if (!data?.results?.length) return;

    // Pick FIRST result from TMDB
    const movie = data.results[0];

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : null;

    const newCard = {
      id: movie.id,
      title: movie.title,
      image: poster,
    };

    // Replace a random card in the arc
    setMovies((prev) => {
      if (prev.length === 0) return [newCard];

      const idx = Math.floor(Math.random() * prev.length);
      const next = [...prev];
      next[idx] = newCard;
      return next;
    });

    setSearchQuery("");
  }

  // 🌌 When user picks a card
  const handlePicked = async (item) => {
    setHand((prev) => {
      const next = [...prev, item];
      return next;
    });

    setShake(true);
    setTimeout(() => setShake(false), 600);

    // When 5 cards are selected → get backend recommendations
    if (hand.length + 1 === 5) {
      const ids = [...hand, item].map((m) => m.id);

      const recs = await recommendMovies(ids);

      // Your backend returns: { recommendations: [...] }
      if (recs?.recommendations) {
        setRecommendations(recs.recommendations);
      }
    }
  };

  return (
    <div className="psychic-scene-scroll">
      {/* 🔮 Top floating recommendations */}
      {recommendations.length > 0 && (
        <div className="recommendations-panel">
          <div className="recommendations-header">
            <span className="recommendations-label">NEXT VISIONS</span>
            <span className="recommendations-hint">
              Scroll up to study the futures I see for you…
            </span>
          </div>

          <div className="recommendations-row">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="recommendation-card">
                <div className="rec-title">{rec.title}</div>
                <div className="rec-reason">{rec.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✨ Main psychic UI scene */}
      <div className="psychic-core">
        {/* 🔍 Floating search bar */}
        <form onSubmit={handleSwapSearch} className="psychic-search-bar">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Whisper a movie into the aether..."
          />
          <button type="submit">Swap</button>
        </form>

        <PsychicHands shake={shake} />
        <PsychicFigure />

        {projectedImage && (
          <div className="projection">
            <img src={projectedImage} alt="Projected Movie" />
          </div>
        )}

        <SpeechBubble text="Pick a card, and I will reveal your fate..." />

        <CardArc
          movies={movies}
          onProject={setProjectedImage}
          onPick={handlePicked}
        />

        <SelectedTray items={hand} />
      </div>
    </div>
  );
}
