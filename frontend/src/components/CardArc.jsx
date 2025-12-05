import React from "react";
import "./CardArc.css";

export default function CardArc({ movies = [], onPick }) {
  return (
    <div className="card-arc">
      {movies.map((m, i) => (
        <div
          key={m.tmdbId || i}
          className="arc-card"
          style={{ transform: `rotate(${(i - 2) * 10}deg)` }}
          onClick={() => onPick(m)}
        >
          {m.image ? (
            <img src={m.image} alt={m.title} className="arc-poster" />
          ) : (
            <div className="arc-fallback">{m.title}</div>
          )}
          <div className="arc-label">{m.title}</div>
        </div>
      ))}
    </div>
  );
}
