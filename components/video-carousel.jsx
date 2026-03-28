"use client";

import { useRef, useState } from "react";
import { VideoTile } from "@/components/video-tile";
import { ShortsModal } from "@/components/shorts-modal";

const shorts = [
  { id: "EqWP39F4X9g", title: "SC Viking training" },
  { id: "7fR598yhHEE", title: "SC Viking match" },
  { id: "H866o3xaaD8", title: "SC Viking goal" },
];

const highlights = [
  { id: "b7dCTjfvfmE", title: "SC Viking highlights" },
  { id: "HGJVPO-lGwg", title: "SC Viking game day" },
  { id: "z_sypUed8jQ", title: "SC Viking moments" },
];

export function VideoCarousel() {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [modalIdx, setModalIdx] = useState(null);
  const shortsRef = useRef(null);

  const featured = highlights[featuredIdx];

  const scrollShorts = (dir) => {
    const track = shortsRef.current;
    if (!track) return;
    const card = track.querySelector(".shorts-strip__item");
    const distance = card ? card.offsetWidth + 12 : 160;
    track.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  return (
    <div className="video-showcase">
      {/* Featured highlight — big 16:9 player */}
      <div className="video-showcase__featured">
        <VideoTile videoId={featured.id} isShort={false} title={featured.title} />
      </div>

      {/* Highlight thumbnails */}
      <div className="video-showcase__thumbs">
        {highlights.map((h, i) => (
          <button
            key={h.id}
            className={`video-showcase__thumb${i === featuredIdx ? " video-showcase__thumb--active" : ""}`}
            onClick={() => setFeaturedIdx(i)}
            aria-label={h.title}
          >
            <img
              src={`https://i.ytimg.com/vi/${h.id}/mqdefault.jpg`}
              alt={h.title}
              loading="lazy"
              decoding="async"
            />
            <span className="video-showcase__thumb-title">{h.title.replace("SC Viking ", "")}</span>
          </button>
        ))}
      </div>

      {/* Shorts strip */}
      <div className="shorts-section">
        <p className="shorts-section__label">Shorts</p>
        <div className="shorts-strip-wrapper">
          <button
            className="shorts-strip__arrow shorts-strip__arrow--left"
            onClick={() => scrollShorts(-1)}
            aria-label="Scroll left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="shorts-strip" ref={shortsRef}>
            {shorts.map((v, i) => (
              <div key={v.id} className="shorts-strip__item">
                <button
                  className="video-tile video-tile--short"
                  onClick={() => setModalIdx(i)}
                  aria-label={v.title}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="video-play-btn" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <button
            className="shorts-strip__arrow shorts-strip__arrow--right"
            onClick={() => scrollShorts(1)}
            aria-label="Scroll right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Shorts modal */}
      {modalIdx !== null && (
        <ShortsModal
          shorts={shorts}
          activeIndex={modalIdx}
          onClose={() => setModalIdx(null)}
          onChangeIndex={setModalIdx}
        />
      )}
    </div>
  );
}