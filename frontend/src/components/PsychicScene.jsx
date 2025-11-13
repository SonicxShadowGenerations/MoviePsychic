import React, { useState } from "react";
import PsychicHands from "./PsychicHands.jsx";
import PsychicFigure from "./PsychicFigure";
import SpeechBubble from "./SpeechBubble";
import CardArc from "./CardArc";
import SelectedTray from "./SelectedTray";
import "./PsychicScene.css";

// initial arc movies (now scene-level so search can modify them)
const initialMovies = [
  { title: "Inception", image: "/images/inception.jpg" },
  { title: "Interstellar", image: "/images/interstellar.jpg" },
  { title: "Tenet", image: "/images/tenet.jpg" },
  { title: "Dune", image: "/images/dune.jpg" },
  { title: "Matrix", image: "/images/matrix.jpg" },
];

// 🔮 stub – later we’ll hit your backend instead
async function fetchRecommendationsForSelection(selection) {
  const titles = selection.map((s) => s.title).filter(Boolean);

  return [
    {
      id: "rec-1",
      title: titles[0]
        ? `A darker echo of ${titles[0]}`
        : "A darker echo of your choices",
      reason: "Twists, tension, and a lingering unease in every frame.",
    },
    {
      id: "rec-2",
      title: titles[1]
        ? `If you liked ${titles[1]}…`
        : "If you liked what you picked…",
      reason: "Rich world-building and characters that stay in your head.",
    },
    {
      id: "rec-3",
      title: "One step further into the void",
      reason: "A film that pushes your themes to their strangest conclusion.",
    },
  ];
}

export default function PsychicScene() {
  const [projectedImage, setProjectedImage] = useState(null);
  const [hand, setHand] = useState([]);
  const [shake, setShake] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  // arc movie state for search swapping
  const [movies, setMovies] = useState(initialMovies);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePicked = (item) => {
    setHand((prev) => {
      const next = [...prev, item];

      // when 5 cards have been picked, load ghost recs (for now)
      if (next.length === 5 && recommendations.length === 0) {
        (async () => {
          const recs = await fetchRecommendationsForSelection(next);
          setRecommendations(recs);
        })();
      }

      return next;
    });

    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  // when user submits the floating search bar
  const handleSwapSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setMovies((prev) => {
      if (prev.length === 0) return prev;
      const idx = Math.floor(Math.random() * prev.length);
      const next = [...prev];
      next[idx] = {
        title: trimmed,
        image: null, // no poster yet → MovieCard uses gradient back
      };
      return next;
    });

    setSearchQuery("");
  };

  return (
    <div className="psychic-scene-scroll">
      {/* translucent recommendations strip at the top */}
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

      {/* main psychic scene */}
      <div className="psychic-core">
        {/* 🔍 Floating Search Bar over the orb */}
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
