import React, { useState } from "react";
import PsychicScene from "./components/PsychicScene";
import TitleScreen from "./components/TitleScreen";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {started ? (
        <PsychicScene />
      ) : (
        <TitleScreen onStart={() => setStarted(true)} />
      )}
    </>
  );
}
