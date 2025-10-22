import React from 'react';
import './PsychicHands.css';
export default function PsychicFigure() {
  return (
    <div
      style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #00ff99 0%, #1b0028 80%)',
        boxShadow: '0 0 20px #00ff99',
        marginBottom: '20px',
      }}
    ></div>
  );
}
