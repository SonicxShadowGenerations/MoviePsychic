import React, { useState } from 'react';
import PsychicHands from './PsychicHands.jsx';
import PsychicFigure from './PsychicFigure';
import SpeechBubble from './SpeechBubble';
import CardArc from './CardArc';

export default function PsychicScene() {
  const [projectedImage, setProjectedImage] = useState(null);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(180deg, #0b0015 0%, #1b0028 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#d9d9d9',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PsychicHands />
      <PsychicFigure />

      {/* 🔮 Projection Layer */}
      {projectedImage && (
        <div className="projection">
          <img src={projectedImage} alt="Projected Movie" />
        </div>
      )}

      <SpeechBubble text="Pick a card, and I will reveal your fate..." />

      {/* Pass callback down to CardArc */}
      <CardArc onProject={setProjectedImage} />
    </div>
  );
}
