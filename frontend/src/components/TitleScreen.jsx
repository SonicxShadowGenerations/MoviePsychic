import React from "react";
import "./TitleScreen.css";

export default function TitleScreen({ onStart }) {
  return (
    <div className="title-screen">
      <div className="title-orb" />

      <h1 className="title-text">
        MOVIE <span>PSYCHIC</span>
      </h1>

      <p className="subtitle">
        Peer into the shifting futures of cinema…
      </p>

      <button className="start-button" onClick={onStart}>
        Come See Your Destiny
      </button>
    </div>
  );
}
