// src/components/MovieCard.jsx
import React, { useState } from "react";
import "./MovieCard.css";

export default function MovieCard({ title, image, onProject, onPick }) {
  const [phase, setPhase] = useState("idle"); // idle | flipped | flying

  const isFlipped = phase === "flipped" || phase === "flying";

  const handleClick = () => {
    // ignore clicks while flying
    if (phase === "flying") return;

    if (phase === "idle") {
      // go to flipped
      setPhase("flipped");
      onProject && onProject(image);

      // after a short delay, start the fly-down animation
      setTimeout(() => {
        setPhase("flying");

        // after the animation duration, finalize
        setTimeout(() => {
          onPick && onPick({ title, image });
          setPhase("idle");
          onProject && onProject(null);
        }, 400); // match CSS transition duration
      }, 80); // tiny delay so you see the flip
    } else if (phase === "flipped") {
      // if they click again before it flies, just go back
      setPhase("idle");
      onProject && onProject(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`movie-card phase-${phase} ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
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

