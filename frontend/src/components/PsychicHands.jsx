import React from "react";
import leftHand from "../assets/left-hand.svg";   // or .png
import rightHand from "../assets/right-hand.svg";
import "./PsychicHands.css";

export default function PsychicHands() {
  return (
    <div className="hands-container">
      <img src={leftHand} alt="Left hand" className="hand left-hand" />
      <img src={rightHand} alt="Right hand" className="hand right-hand" />
    </div>
  );
}
