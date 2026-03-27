"use client";

import { PhotoGallery, allPhotos } from "@/components/photo-gallery";
import { useLocale } from "@/components/locale-provider";
import { getSiteCopy } from "@/lib/site-copy";
import { SiteHeader } from "@/components/site-header";
import { MobileBottomBar } from "@/components/mobile-bottom-bar";

export default function GalleryPage() {
  const { locale } = useLocale();
  const copy = getSiteCopy(locale);

  return (
    <>
      <SiteHeader />
      <main className="gallery-page">
        <div className="shell">
          <a href="/" className="gallery-back">← {copy.gallery.backLabel || "На головну"}</a>
          <div className="section-heading">
            <p className="eyebrow">{copy.gallery.eyebrow}</p>
            <h2>{copy.gallery.title}</h2>
          </div>
          <PhotoGallery photos={allPhotos} />
        </div>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div className="footer-block">
            <p className="eyebrow">{copy.footer.eyebrow}</p>
            <strong>{copy.footer.title}</strong>
          </div>
          <div className="footer-social-block">
            <p className="footer-social-label">{copy.footer.followLabel}</p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/sc.viking" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src="/icons/facebook.svg" alt="" aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/fcvb.2021/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/icons/instagram.svg" alt="" aria-hidden="true" />
              </a>
              <a href="https://www.tiktok.com/@fcvb.2021" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <img src="/icons/tiktok.svg" alt="" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <MobileBottomBar />
    </>
  );
}