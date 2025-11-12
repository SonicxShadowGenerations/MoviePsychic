// MovieCard.jsx
import React, { useState } from "react";
import "./MovieCard.css";

export default function MovieCard({ title, image, onProject, onPick }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    const next = !flipped;       // what state will be after click
    setFlipped(next);

    // projection: show when flipped to back, clear when flipped to front
    if (onProject) onProject(next ? image : null);

    // add to tray when revealing the back
    if (next && onPick) onPick({ title, image });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`movie-card ${flipped ? "flipped" : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`Reveal ${title}`}
    >
      <div className="card-inner">
        <div className="card-front">{title}</div>
        <div
          className="card-back"
          style={{
            backgroundImage: image
              ? `url(${image})`
              : "radial-gradient(circle at center, #00ffe6 10%, #2e0147 70%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
