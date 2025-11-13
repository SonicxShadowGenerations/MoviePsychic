// CardArc.jsx
import React, { useState } from "react";
import MovieCard from "./MovieCard";

const initialMovies = [
  { title: "Inception", image: "/images/inception.jpg" },
  { title: "Interstellar", image: "/images/interstellar.jpg" },
  { title: "Tenet", image: "/images/tenet.jpg" },
  { title: "Dune", image: "/images/dune.jpg" },
  { title: "Matrix", image: "/images/matrix.jpg" },
];

export default function CardArc({ onProject, onPick }) {
  const [movies, setMovies] = useState(initialMovies);
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // pick a random card in the arc to replace
    const idx = Math.floor(Math.random() * movies.length);

    setMovies((prev) => {
      const next = [...prev];
      next[idx] = {
        title: trimmed,
        image: null, // no poster yet → MovieCard uses your glowing gradient
      };
      return next;
    });

    setQuery("");
  };

  const total = movies.length;
  const middleIndex = Math.floor(total / 2);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        zIndex: 3,
        transform: "translateY(-140px)",
      }}
    >
      
      {/* 🎴 Arc of cards */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "300px",
          gap: "25px",
          perspective: "1000px",
        }}
      >
        {movies.map((m, i) => {
          const offset = i - middleIndex;
          const rotate = offset * 6;
          const translateY = Math.pow(Math.abs(offset), 1.4) * 8 + 5;

          return (
            <div
              key={`${m.title}-${i}`}
              style={{
                transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
                transformOrigin: "center top",
                transition: "transform 0.5s ease",
              }}
            >
              <MovieCard
                title={m.title}
                image={m.image}
                onProject={onProject}
                onPick={onPick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
