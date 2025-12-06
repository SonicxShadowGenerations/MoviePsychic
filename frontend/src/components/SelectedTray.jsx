import React from "react";
import "./SelectedTray.css";

export default function SelectedTray({ items }) {
  return (
    <div className="tray">
      {items.map((m) => (
        <img
          key={m.id}
          src={m.image}
          alt={m.title}
          className="tray-card"
        />
      ))}
    </div>
  );
}
