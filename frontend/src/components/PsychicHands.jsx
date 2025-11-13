// src/components/PsychicHands.jsx
import React from "react";
import "./PsychicHands.css";
import leftHand from "../assets/left-hand.svg";
import rightHand from "../assets/right-hand.svg";

export default function PsychicHands({ shake = false }) {
  return (
    <div className={`hands-container ${shake ? "shake" : ""}`}>
      <img src={leftHand} alt="Left hand" className="hand left-hand" />
      <img src={rightHand} alt="Right hand" className="hand right-hand" />
    </div>
  );
}
