"use client";

import { useEffect, useCallback, useRef, useState } from "react";

export function ShortsModal({ shorts, activeIndex, onClose, onChangeIndex }) {
  const backdropRef = useRef(null);
  const touchStart = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const goPrev = useCallback(() => {
    onChangeIndex((activeIndex - 1 + shorts.length) % shorts.length);
  }, [activeIndex, shorts.length, onChangeIndex]);

  const goNext = useCallback(() => {
    onChangeIndex((activeIndex + 1) % shorts.length);
  }, [activeIndex, shorts.length, onChangeIndex]);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 767);
  }, []);

  /* keyboard nav */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  /* swipe — vertical (up/down) on mobile, horizontal on desktop */
  const onTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;

    // Determine if swipe is more vertical or horizontal
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) {
      // Vertical swipe: up = next, down = prev
      dy < 0 ? goNext() : goPrev();
    } else if (Math.abs(dx) > 50) {
      // Horizontal swipe: left = next, right = prev
      dx < 0 ? goNext() : goPrev();
    }

    touchStart.current = null;
  };

  const current = shorts[activeIndex];

  return (
    <div
      className="shorts-modal"
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && onClose()}
    >
      {/* close */}
      <button className="shorts-modal__close" onClick={onClose} aria-label="Close">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* prev — desktop only */}
      {!isMobile && (
        <button className="shorts-modal__nav shorts-modal__nav--prev" onClick={goPrev} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* player */}
      <div className={`shorts-modal__player${current.type === "instagram" ? " shorts-modal__player--instagram" : ""}`}>
        {/* Touch overlay — catches swipes above iframe */}
        <div
          className="shorts-modal__touch-overlay"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
        {current.type === "instagram" ? (
          <iframe
            key={current.id}
            src={`https://www.instagram.com/reel/${current.id}/embed/`}
            title={current.title}
            allowFullScreen
          />
        ) : (
          <iframe
            key={current.id}
            src={`https://www.youtube.com/embed/${current.id}?autoplay=1&loop=1&playlist=${current.id}`}
            title={current.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
        <p className="shorts-modal__title">{current.title}</p>
        <p className="shorts-modal__counter">{activeIndex + 1} / {shorts.length}</p>
      </div>

      {/* next — desktop only */}
      {!isMobile && (
        <button className="shorts-modal__nav shorts-modal__nav--next" onClick={goNext} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      )}
    </div>
  );
}