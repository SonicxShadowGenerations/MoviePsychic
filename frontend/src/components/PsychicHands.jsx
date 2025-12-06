// src/components/PsychicHands.jsx
import React from "react";
import "./PsychicHands.css";
import leftHand from "../assets/left-hand.svg";
import rightHand from "../assets/right-hand.svg";

export default function PsychicHands({ wiggle = false }) {
  return (
    <div className={`hands-container ${wiggle ? "wiggle" : ""}`}>
      <img src={leftHand} className="hand left-hand" alt="Left hand" />
      <img src={rightHand} className="hand right-hand" alt="Right hand" />
    </div>
  );
}
