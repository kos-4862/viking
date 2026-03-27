"use client";
import { useState, useEffect } from "react";

const photos = [
  { src: "/images/gallery-action.jpg", alt: "Player in action" },
  { src: "/images/gallery-match.jpg", alt: "Match in arena" },
  { src: "/images/gallery-group.jpg", alt: "Club event" },
  { src: "/images/gallery-team2.jpg", alt: "Outdoor training" },
  { src: "/images/gallery-coach.jpg", alt: "Coach with team" },
  { src: "/images/gallery-event.jpg", alt: "Team celebration" },
];

export function PhotoGallery() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active]);

  return (
    <>
      <div className="gallery-scroll">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            className="gallery-item"
            onClick={() => setActive(i)}
            aria-label={photo.alt}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="lightbox"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={photos[active].alt}
        >
          <button
            className="lightbox-close"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={photos[active].src}
            alt={photos[active].alt}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}