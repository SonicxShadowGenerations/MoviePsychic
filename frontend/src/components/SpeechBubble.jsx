import React from "react";
export default function SpeechBubble({ text }) {
  return (
    <div
      style={{
        background: "rgba(168, 0, 90, 0.7)",
        border: "1px solid #ffd95c",
        borderRadius: "12px",
        padding: "10px 20px",
        maxWidth: "400px",
        textAlign: "center",
        color: "#d9d9d9",
        fontStyle: "italic",
        marginBottom: "40px"
      }}
    >
      {text}
    </div>
  );
}
