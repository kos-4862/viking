"use client";

import { useRef } from "react";
import { VideoTile } from "@/components/video-tile";

const videos = [
  { id: "EqWP39F4X9g", title: "SC Viking training", short: true },
  { id: "7fR598yhHEE", title: "SC Viking match", short: true },
  { id: "H866o3xaaD8", title: "SC Viking goal", short: true },
  { id: "b7dCTjfvfmE", title: "SC Viking highlights", short: false },
  { id: "HGJVPO-lGwg", title: "SC Viking game day", short: false },
  { id: "z_sypUed8jQ", title: "SC Viking moments", short: false },
];

export function VideoCarousel() {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".video-strip__item");
    const distance = card ? card.offsetWidth + 16 : 260;
    track.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  return (
    <div className="video-strip-wrapper">
      <button
        className="video-strip__arrow video-strip__arrow--left"
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="video-strip" ref={trackRef}>
        {videos.map((v) => (
          <div key={v.id} className={`video-strip__item${v.short ? " video-strip__item--short" : ""}`}>
            <VideoTile videoId={v.id} isShort={v.short} title={v.title} />
          </div>
        ))}
      </div>

      <button
        className="video-strip__arrow video-strip__arrow--right"
        onClick={() => scroll(1)}
        aria-label="Scroll right"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
    </div>
  );
}