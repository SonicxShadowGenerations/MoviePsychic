import React from "react";
import "./RecommendationsPanel.css";

export default function RecommendationsPanel({ recs, onAccept }) {
  return (
    <div className="rec-panel">
      <h2>NEXT VISIONS</h2>

      <div className="rec-grid">
        {recs.map((m) => (
          <div key={m.id} className="rec-card">
            <div className="rec-inner">
              <div className="rec-front">
                <img src={m.image} alt={m.title} />
              </div>

              <div className="rec-back">
                <h3>{m.title}</h3>
                <p>{m.overview}</p>
                <button onClick={() => onAccept(m)}>Accept</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
