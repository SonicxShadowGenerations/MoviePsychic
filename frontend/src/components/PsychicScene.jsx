import React, { useState } from 'react';
import PsychicHands from './PsychicHands.jsx';
import PsychicFigure from './PsychicFigure';
import SpeechBubble from './SpeechBubble';
import CardArc from './CardArc';
import SelectedTray from './SelectedTray';
import './PsychicScene.css'; // keep your projection styles here

export default function PsychicScene() {
  const [projectedImage, setProjectedImage] = useState(null);
  const [hand, setHand] = useState([]); // picked cards go here

  const handlePicked = (item) => {
    // push to hand; allow duplicates to be filtered in the tray (or de-dupe here)
    setHand(prev => [...prev, item]);
  };

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

      {projectedImage && (
        <div className="projection">
          <img src={projectedImage} alt="Projected Movie" />
        </div>
      )}

      <SpeechBubble text="Pick a card, and I will reveal your fate..." />

      {/* pass both project + pick handlers */}
      <CardArc onProject={setProjectedImage} onPick={handlePicked} />

      {/* bottom-center tray */}
      <SelectedTray items={hand} />
    </div>
  );
}
