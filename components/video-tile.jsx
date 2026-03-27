"use client";

import { useState } from "react";

export function VideoTile({ videoId, isShort, title }) {
  const [active, setActive] = useState(false);
  const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (active) {
    return (
      <div className={`video-tile video-tile--active${isShort ? " video-tile--short" : ""}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      className={`video-tile${isShort ? " video-tile--short" : ""}`}
      onClick={() => setActive(true)}
      aria-label={title}
    >
      <img src={thumbUrl} alt={title} loading="lazy" decoding="async" />
      <div className="video-play-btn" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </div>
    </button>
  );
}