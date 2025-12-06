import React from "react";
import "./AcceptedHistory.css";

export default function AcceptedHistory({ accepted = [] }) {
  return (
    <div className="accepted-panel">
      <h3 className="accepted-title">Accepted Futures</h3>

      {accepted.length === 0 && (
        <p className="accepted-empty">None chosen yet…</p>
      )}

      <div className="accepted-list">
        {accepted.map((m) => (
          <div key={m.id} className="accepted-item">
            <img src={m.image} alt={m.title} />
            <div className="accepted-info">
              <div className="accepted-name">{m.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
