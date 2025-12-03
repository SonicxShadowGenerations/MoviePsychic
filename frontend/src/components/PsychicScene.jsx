// src/components/PsychicScene.jsx
import React, { useState, useEffect } from "react";
import PsychicHands from "./PsychicHands.jsx";
import PsychicFigure from "./PsychicFigure";
import SpeechBubble from "./SpeechBubble";
import CardArc from "./CardArc";
import SelectedTray from "./SelectedTray";
import "./PsychicScene.css";

// API functions
import {
  searchMovies,
  getMovie,
  recommendMovies
} from "../api";

export default function PsychicScene() {
  const [movies, setMovies] = useState([]); // arc movies (5)
  const [projectedImage, setProjectedImage] = useState(null);
  const [hand, setHand] = useState([]); // selected cards
  const [shake, setShake] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ---------------------------------------------------------
  // 🔮 Load 5 REAL TMDB movies on mount (no UI change)
  // ---------------------------------------------------------
  useEffect(() => {
    async function loadRandomMovies() {
      // Pick random popular movie keywords
      const seeds = ["Inception", "Matrix", "Interstellar", "Dune", "Tenet"];
      const searchTerm = seeds[Math.floor(Math.random() * seeds.length)];

      const data = await searchMovies(searchTerm);
      if (!data.results?.length) return;

      // Use 5 random real movies
      const five = data.results.slice(0, 5);

      setMovies(
        five.map((m) => ({
          id: m.id,
          title: m.title,
          image: m.poster_path
            ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
            : null
        }))
      );
    }

    loadRandomMovies();
  }, []);

  // ---------------------------------------------------------
  // 🔮 Picking a card → add to tray + trigger recommendations
  // ---------------------------------------------------------
  const handlePicked = async (item) => {
    setHand((prev) => {
      const next = [...prev, item];

      // once 5 cards are selected → get real recommendations
      if (next.length === 5 && recommendations.length === 0) {
        fetchRealRecommendations(next);
      }

      return next;
    });

    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  // ---------------------------------------------------------
  // 🔮 Real backend recommendation fetch
  // ---------------------------------------------------------
  async function fetchRealRecommendations(selectedItems) {
    const ids = selectedItems.map((m) => m.id);

    const data = await recommendMovies(ids);

    // backend returns: [{ tmdbId, title, score }]
    setRecommendations(
      data.ranked?.map((r) => ({
        id: r.tmdbId,
        title: r.title,
        reason: `Score: ${r.score}`
      })) || []
    );
  }

  // ---------------------------------------------------------
  // 🔮 Floating search bar — swaps 1 random card with a REAL movie
  // ---------------------------------------------------------
  const handleSwapSearch = async (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    const data = await searchMovies(trimmed);

    if (!data.results?.length) return;

    const m = data.results[0];

    const realMovie = {
      id: m.id,
      title: m.title,
      image: m.poster_path
        ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
        : null
    };

    // replace a random card
    setMovies((prev) => {
      if (prev.length === 0) return prev;
      const idx = Math.floor(Math.random() * prev.length);
      const next = [...prev];
      next[idx] = realMovie;
      return next;
    });

    setSearchQuery("");
  };

  // ---------------------------------------------------------
  // 🔮 Render UI — EXACTLY your original visuals
  // ---------------------------------------------------------
  return (
    <div className="psychic-scene-scroll">
      {/* Top glowing recommendation panel */}
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

      {/* Main psychic UI */}
      <div className="psychic-core">
        {/* Floating search bar */}
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
