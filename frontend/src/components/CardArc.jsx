import React from "react";
import MovieCard from "./MovieCard";

export default function CardArc({ movies, onProject, onPick }) {
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
