"use client";
import { useState, useEffect, useRef, useCallback } from "react";

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