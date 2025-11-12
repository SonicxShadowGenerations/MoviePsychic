import React, { useMemo } from 'react';
import './SelectedTray.css';

export default function SelectedTray({ items = [] }) {
  // Prevent duplicates by title (keeps the first copy)
  const unique = useMemo(() => {
    const seen = new Set();
    return items.filter(it => (seen.has(it.title) ? false : (seen.add(it.title), true)));
  }, [items]);

  return (
    <div className={`selected-tray ${unique.length ? 'show' : ''}`} aria-live="polite">
      <div className="tray-inner">
        {unique.length === 0 ? (
          <span className="tray-hint">your hand</span>
        ) : (
          unique.map(it => (
            <div key={it.title} className="tray-card" title={it.title}>
              <img src={it.image} alt={it.title} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
