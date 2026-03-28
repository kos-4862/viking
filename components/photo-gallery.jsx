"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "@/components/locale-provider";
import { getSiteCopy } from "@/lib/site-copy";

const BATCH_SIZE = 14;

const mainPhotos = [
  { src: "/images/gallery/main-01.webp", fallback: "/images/gallery/main-01.jpg", alt: "Player kicking the ball" },
  { src: "/images/gallery/main-02.webp", fallback: "/images/gallery/main-02.jpg", alt: "Friends on the field" },
  { src: "/images/gallery/main-03.webp", fallback: "/images/gallery/main-03.jpg", alt: "Team celebrating with Ukrainian flag and medals" },
  { src: "/images/gallery/main-04.webp", fallback: "/images/gallery/main-04.jpg", alt: "Parents with Viking flag" },
  { src: "/images/gallery/main-09.webp", fallback: "/images/gallery/main-09.jpg", alt: "Players collage with club emblem" },
  { src: "/images/gallery/main-06.webp", fallback: "/images/gallery/main-06.jpg", alt: "Match in the arena" },
  { src: "/images/gallery/main-07.webp", fallback: "/images/gallery/main-07.jpg", alt: "Team in the arena" },
  { src: "/images/gallery/main-08.webp", fallback: "/images/gallery/main-08.jpg", alt: "Winter team photo" },
  { src: "/images/gallery/main-05.webp", fallback: "/images/gallery/main-05.jpg", alt: "Team photo at the goal" },
];

const allPhotos = Array.from({ length: 42 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    src: `/images/gallery/photo-${num}.webp`,
    fallback: `/images/gallery/photo-${num}.jpg`,
    alt: `SC Viking photo ${i + 1}`,
  };
});

export { mainPhotos, allPhotos };

export function PhotoGallery({ photos = mainPhotos, paginated = false }) {
  const [visibleCount, setVisibleCount] = useState(paginated ? BATCH_SIZE : photos.length);
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);
  const { locale } = useLocale();
  const copy = getSiteCopy(locale);

  const visiblePhotos = photos.slice(0, visibleCount);
  const hasMore = visibleCount < photos.length;

  const showPrev = useCallback(() => {
    setActive((i) => (i === 0 ? photos.length - 1 : i - 1));
  }, [photos.length]);

  const showNext = useCallback(() => {
    setActive((i) => (i === photos.length - 1 ? 0 : i + 1));
  }, [photos.length]);

  useEffect(() => {
    if (active === null) return;

    dialogRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setActive(null);
      } else if (e.key === "ArrowLeft") {
        showPrev();
      } else if (e.key === "ArrowRight") {
        showNext();
      } else if (e.key === "Tab") {
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

  function loadMore() {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, photos.length));
  }

  return (
    <>
      <div className="gallery-scroll">
        {visiblePhotos.map((photo, i) => (
          <button
            key={photo.src}
            className="gallery-item"
            onClick={() => setActive(i)}
            aria-label={photo.alt}
          >
            <picture>
              <source srcSet={photo.src} type="image/webp" />
              <img src={photo.fallback} alt={photo.alt} loading="lazy" decoding="async" />
            </picture>
          </button>
        ))}
      </div>

      {paginated && hasMore && (
        <div className="gallery-load-more">
          <button className="button button-secondary" onClick={loadMore}>
            {copy.gallery?.loadMore || "Show more"}
          </button>
        </div>
      )}

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

          <picture onClick={(e) => e.stopPropagation()}>
            <source srcSet={photos[active].src} type="image/webp" />
            <img
              src={photos[active].fallback}
              alt={photos[active].alt}
              className="lightbox-img"
            />
          </picture>

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