// src/components/PsychicScene.jsx
import React, { useEffect, useState } from "react";
import {
  fetchRandom,
  searchMovies,
  fetchRecommendations,
} from "../api";

import PsychicHands from "./PsychicHands";
import PsychicFigure from "./PsychicFigure";
import SpeechBubble from "./SpeechBubble";
import CardArc from "./CardArc";
import SelectedTray from "./SelectedTray";
import RecommendationsPanel from "./RecommendationsPanel";

import "./PsychicScene.css";

export default function PsychicScene() {
  const [started, setStarted] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hand, setHand] = useState([]);
  const [history, setHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  // Wiggle hands before cards appear
  const [handsWiggle, setHandsWiggle] = useState(false);

  useEffect(() => {
    if (started) {
      summonCards();
    }
  }, [started]);

  async function summonCards() {
    // wiggle hands first
    setHandsWiggle(true);

    setTimeout(async () => {
      const data = await fetchRandom();
      const formatted = (data.results || []).map((m) => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        image: `https://image.tmdb.org/t/p/w300${m.poster_path}`,
      }));

      setMovies(formatted);
      setHandsWiggle(false);
    }, 900); // wiggle duration
  }

  async function handlePick(movie) {
    if (hand.length < 5) {
      const next = [...hand, movie];
      setHand(next);

      if (next.length === 5) {
        loadRecommendations(next);
      }
    }
  }

  async function loadRecommendations(selected) {
    const ids = selected.map((m) => m.id);
    const data = await fetchRecommendations(ids);

    const recs = (data.results || []).map((m) => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      image: `https://image.tmdb.org/t/p/w300${m.poster_path}`,
    }));

    setRecommendations(recs);
  }

  async function handleSwap(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const data = await searchMovies(searchQuery);
    const first = data.results?.[0];
    if (!first) return;

    const replacement = {
      id: first.id,
      title: first.title,
      overview: first.overview,
      image: `https://image.tmdb.org/t/p/w300${first.poster_path}`,
    };

    const updated = [...movies];
    updated[Math.floor(Math.random() * updated.length)] = replacement;
    setMovies(updated);

    setSearchQuery("");
  }

  function acceptRecommendation(rec) {
    // log into history
    setHistory((prev) => [...prev, rec]);

    // reset card cycle using the accepted rec as first card
    setHand([rec]);
    setRecommendations([]);

    summonCards();
  }

  // -------------------------------
  // Title Screen
  // -------------------------------
  if (!started) {
    return (
      <div className="title-screen">
        <h1 className="title-glow">MOVIE PSYCHIC</h1>
        <button
          className="start-btn"
          onClick={() => setStarted(true)}
        >
          Come see your destiny
        </button>
      </div>
    );
  }

  return (
    <div className="psychic-scene-scroll">
      {recommendations.length > 0 && (
        <RecommendationsPanel
          recs={recommendations}
          onAccept={acceptRecommendation}
        />
      )}

      {/* Accepted movie history */}
      <div className="accepted-history">
        <h3>Accepted Paths</h3>
        {history.map((h) => (
          <div key={h.id} className="history-item">
            <img src={h.image} alt={h.title} />
            <span>{h.title}</span>
          </div>
        ))}
      </div>

      <div className="psychic-core">
        {/* Search Bar */}
        <form className="psychic-search-bar" onSubmit={handleSwap}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Whisper a movie into the aether..."
          />
          <button type="submit">Swap</button>
        </form>

        {/* Hands + Orb */}
        <PsychicHands wiggle={handsWiggle} />

        <div className="orb-container">
          <PsychicFigure />
        </div>

        {/* Bubble text changes when recs appear */}
        <SpeechBubble
          text={
            recommendations.length
              ? "I see your future… here are your paths."
              : "Pick a card, and I will reveal your fate…"
          }
        />

        {/* Cards */}
        <CardArc movies={movies} onPick={handlePick} />

        {/* Selected Tray */}
        <SelectedTray items={hand} />
      </div>
    </div>
  );
}
