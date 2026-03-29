"use client";

import { useRef, useState } from "react";
import { VideoTile } from "@/components/video-tile";
import { ShortsModal } from "@/components/shorts-modal";

// Vertical videos (9:16) — shown as Shorts
const shorts = [
  { id: "EqWP39F4X9g", title: "Agility Training Drill" },
  { id: "7fR598yhHEE", title: "Team Spirit" },
  { id: "H866o3xaaD8", title: "Tournament Day" },
  { id: "JO6YakcAQzU", title: "Tournament Goal Moment" },
  { id: "lWHSUdoaFnM", title: "Tournament Match Action" },
  { id: "R_Z0DxhNDxE", title: "Training Atmosphere" },
  { id: "aba3jME0VTU", title: "Stelele Viitorului Cup" },
  { id: "hyB0p6DugBU", title: "Moment of Silence" },
  { id: "DRtdYMLNOR0", title: "Speed Training" },
  { id: "ALYh1k5FMCQ", title: "Agility Drill" },
  { id: "YdEDcy-CscY", title: "Outdoor Match" },
  { id: "YEBbgHFNCsA", title: "Futsal Tournament" },
  { id: "DVEM5WwCFwO", title: "Instagram Reel", type: "instagram" },
  { id: "DVBWPBHiET3", title: "Instagram Reel", type: "instagram" },
  { id: "DVCPPSsCEB2", title: "Instagram Reel", type: "instagram" },
];

// Horizontal videos (16:9) — shown as highlights
const highlights = [
  { id: "iOwEwk-vqZ0", title: "When Heroes Are Born" },
  { id: "b7dCTjfvfmE", title: "Outdoor Match Highlights" },
  { id: "Ns5ek9PI9JY", title: "Outdoor Match — Drone View" },
  { id: "k-e4fuMrmuo", title: "Indoor Match vs Blue Team" },
  { id: "ZF8oyTL2RcA", title: "High Press & Positional Play" },
  { id: "z_sypUed8jQ", title: "Top Corner Goal!" },
  { id: "HGJVPO-lGwg", title: "Indoor Game Day" },
  { id: "dM2jFjd1JYw", title: "Indoor Match Action" },
  { id: "sv-WdtXpUM4", title: "Indoor Attack Play" },
  { id: "kT7xbgo0rSU", title: "Indoor Training Drill" },
];

const ArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

export function VideoCarousel() {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [modalIdx, setModalIdx] = useState(null);
  const thumbsRef = useRef(null);
  const shortsRef = useRef(null);

  const featured = highlights[featuredIdx];

  const scrollStrip = (ref, dir) => {
    const track = ref.current;
    if (!track) return;
    const card = track.querySelector(":scope > *");
    const distance = card ? card.offsetWidth + 12 : 160;
    track.scrollBy({ left: dir * distance * 2, behavior: "smooth" });
  };

  return (
    <div className="video-showcase">
      {/* Featured highlight — big 16:9 player */}
      <div className="video-showcase__featured">
        <VideoTile videoId={featured.id} isShort={false} title={featured.title} />
      </div>

      {/* Highlight thumbnails — scrollable strip with arrows */}
      <div className="video-strip-wrapper">
        <button
          className="video-strip__arrow video-strip__arrow--left"
          onClick={() => scrollStrip(thumbsRef, -1)}
          aria-label="Scroll left"
        >
          <ArrowLeft />
        </button>

        <div className="video-showcase__thumbs" ref={thumbsRef}>
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

        <button
          className="video-strip__arrow video-strip__arrow--right"
          onClick={() => scrollStrip(thumbsRef, 1)}
          aria-label="Scroll right"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Shorts strip */}
      <div className="shorts-section">
        <p className="shorts-section__label">Shorts</p>
        <div className="shorts-strip-wrapper">
          <button
            className="shorts-strip__arrow shorts-strip__arrow--left"
            onClick={() => scrollStrip(shortsRef, -1)}
            aria-label="Scroll left"
          >
            <ArrowLeft />
          </button>

          <div className="shorts-strip" ref={shortsRef}>
            {shorts.map((v, i) => (
              <div key={v.id} className="shorts-strip__item">
                <button
                  className={`video-tile video-tile--short${v.type === "instagram" ? " video-tile--instagram" : ""}`}
                  onClick={() => setModalIdx(i)}
                  aria-label={v.title}
                >
                  {v.type === "instagram" ? (
                    <div className="instagram-thumb">
                      <svg className="instagram-thumb__icon" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </div>
                  ) : (
                    <img
                      src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                      alt={v.title}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="video-play-btn" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <button
            className="shorts-strip__arrow shorts-strip__arrow--right"
            onClick={() => scrollStrip(shortsRef, 1)}
            aria-label="Scroll right"
          >
            <ArrowRight />
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