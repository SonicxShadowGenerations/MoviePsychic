import React, { useState, useEffect } from "react";
import PsychicHands from "./PsychicHands.jsx";
import PsychicFigure from "./PsychicFigure";
import SpeechBubble from "./SpeechBubble";
import CardArc from "./CardArc";
import SelectedTray from "./SelectedTray";
import { searchMovies, recommendMovies, getRandomMovies } from "../api";
import "./PsychicScene.css";

export default function PsychicScene() {
  const [movies, setMovies] = useState([]);        // arc movies
  const [projectedImage, setProjectedImage] = useState(null);
  const [hand, setHand] = useState([]);
  const [shake, setShake] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 🌙 Load random movies on startup
  useEffect(() => {
    async function loadRandom() {
      const data = await getRandomMovies();
      const items = (data.results || []).slice(0, 5).map((movie) => ({
        id: movie.id,
        title: movie.title,
        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
          : null,
      }));
      setMovies(items);
    }
    loadRandom();
  }, []);

  // 🌙 When user inserts a movie into the arc
  async function handleSwapSearch(e) {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    const data = await searchMovies(trimmed);
    if (!data?.results?.length) return;

    const movie = data.results[0];
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : null;

    const newCard = { id: movie.id, title: movie.title, image: poster };

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
    const next = [...hand, item];
    setHand(next);

    setShake(true);
    setTimeout(() => setShake(false), 600);

    // when 5 cards chosen → hit backend for recommendations
    if (next.length === 5) {
      const ids = next.map((m) => m.id);
      const recs = await recommendMovies(ids);

      if (recs?.recommendations) {
        setRecommendations(recs.recommendations);
      }
    }
  };

  return (
    <div className="psychic-scene-scroll">
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

      <div className="psychic-core">
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
