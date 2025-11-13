import React, { useState } from "react";
import PsychicHands from "./PsychicHands.jsx";
import PsychicFigure from "./PsychicFigure";
import SpeechBubble from "./SpeechBubble";
import CardArc from "./CardArc";
import SelectedTray from "./SelectedTray";
import "./PsychicScene.css";

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

  return (
    <div className="psychic-scene-scroll">
      {/* translucent recommendations strip at the top */}
      {recommendations.length > 0 && (
        <div className="recommendations-panel">
          <div className="recommendations-header">
            <span className="recommendations-label">Next Visions</span>
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
        <PsychicHands shake={shake} />
        <PsychicFigure />

        {projectedImage && (
          <div className="projection">
            <img src={projectedImage} alt="Projected Movie" />
          </div>
        )}

        <SpeechBubble text="Pick a card, and I will reveal your fate..." />

        <CardArc onProject={setProjectedImage} onPick={handlePicked} />

        <SelectedTray items={hand} />
      </div>
    </div>
  );
}
