import React, { useState } from "react";
import "./MovieCard.css";

export default function MovieCard({ title, image, onProject }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
    if (!flipped && onProject) {
      onProject(image); // send the image upward to display as “projection”
    }
  };

  return (
    <div
      className={`movie-card ${flipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        {/* Front of card */}
        <div className="card-front">
          {title}
        </div>

        {/* Back of card */}
        <div
          className="card-back"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
}
