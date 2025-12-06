import React from "react";
import "./CardArc.css";

export default function CardArc({ movies = [], onPick }) {
  return (
    <div className="card-arc">
      {movies.map((m, i) => (
        <div
          key={m.id}
          className="flip-card"
          style={{ transform: `rotate(${i * 10 - 20}deg)` }}
          onClick={() => onPick && onPick(m)}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={m.image} alt={m.title} />
              <p className="card-title">{m.title}</p>
            </div>

            <div className="flip-card-back">
              <p>{m.overview || "A mysterious film with unknown origins…"}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
