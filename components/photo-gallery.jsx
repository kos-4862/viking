"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const mainPhotos = [
  { src: "/images/gallery/main-01.jpg", alt: "Player kicking the ball" },
  { src: "/images/gallery/main-02.jpg", alt: "Friends on the field" },
  { src: "/images/gallery/main-03.jpg", alt: "Team celebrating with Ukrainian flag and medals" },
  { src: "/images/gallery/main-04.jpg", alt: "Parents with Viking flag" },
  { src: "/images/gallery/main-05.jpg", alt: "Team photo at the goal" },
  { src: "/images/gallery/main-06.jpg", alt: "Match in the arena" },
  { src: "/images/gallery/main-07.jpg", alt: "Team in the arena" },
  { src: "/images/gallery/main-08.jpg", alt: "Winter team photo" },
];

const allPhotos = Array.from({ length: 42 }, (_, i) => ({
  src: `/images/gallery/photo-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `SC Viking photo ${i + 1}`,
}));

export { mainPhotos, allPhotos };

export function PhotoGallery({ photos = mainPhotos }) {
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);

  const showPrev = useCallback(() => {
    setActive((i) => (i === 0 ? photos.length - 1 : i - 1));
  }, []);

  const showNext = useCallback(() => {
    setActive((i) => (i === photos.length - 1 ? 0 : i + 1));
  }, []);

  // Keyboard navigation + focus trap
  useEffect(() => {
    if (active === null) return;

    // Focus the dialog when it opens
    dialogRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setActive(null);
      } else if (e.key === "ArrowLeft") {
        showPrev();
      } else if (e.key === "ArrowRight") {
        showNext();
      } else if (e.key === "Tab") {
        // Focus trap: keep Tab inside the dialog
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.disabled);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, showPrev, showNext]);

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
          ref={dialogRef}
          className="lightbox"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={photos[active].alt}
          tabIndex={-1}
        >
          <button
            className="lightbox-close"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ×
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous photo"
          >
            &#8249;
          </button>

          <img
            src={photos[active].src}
            alt={photos[active].alt}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Next photo"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}