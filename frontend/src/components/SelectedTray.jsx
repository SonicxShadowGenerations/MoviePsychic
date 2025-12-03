import React from "react";
import "./SelectedTray.css";

export default function SelectedTray({ items }) {
  return (
    <div className={`selected-tray ${items.length ? "show" : ""}`}>
      <div className="tray-inner">
        {items.map((m) => (
          <div key={m.tmdbId} className="tray-card">
            <img src={m.image} alt={m.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
