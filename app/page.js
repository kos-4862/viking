"use client";

import { ContactForm } from "@/components/contact-form";
import { MobileBottomBar } from "@/components/mobile-bottom-bar";
import { VideoCarousel } from "@/components/video-carousel";
import { useLocale } from "@/components/locale-provider";
import { SiteHeader } from "@/components/site-header";
import { getSiteCopy } from "@/lib/site-copy";
import { PhotoGallery } from "@/components/photo-gallery";
import { DynamicTitle } from "@/components/dynamic-title";

export default function HomePage() {
  const { locale } = useLocale();
  const copy = getSiteCopy(locale);

  return (
    <>
      <DynamicTitle />
      <SiteHeader />
      <main id="top">

        {/* 1. HERO — photo background, centered */}
        <section className="hero">
          <div className="hero-bg-photo" aria-hidden="true">
            <img src="/images/hero-bg.jpg" alt="" fetchPriority="high" decoding="async" />
          </div>
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="shell hero-content">
            <p className="eyebrow hero-anim hero-anim-1">{copy.hero.eyebrow}</p>
            <h1 className="hero-anim hero-anim-2">{copy.hero.title}</h1>
            <p className="lead hero-anim hero-anim-3">{copy.hero.lead}</p>
            <div className="hero-cta hero-anim hero-anim-4">
              <a className="button button-primary hero-cta-btn" href="#contact">
                {copy.hero.cta}
              </a>
            </div>
          </div>
        </section>

        {/* 2. ABOUT — split layout with photo */}
        <section id="about" className="section section-about">
          <div className="about-layout">
            <div className="about-photo-col">
              <img src="/images/about-team.jpg" alt="SC Viking team" loading="lazy" decoding="async" />
            </div>
            <div className="about-text-col">
              <div className="about-content">
                <p className="eyebrow">{copy.about.eyebrow}</p>
                <h2>{copy.about.title}</h2>
                <p>{copy.about.text}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COACH — photo + expanded bio */}
        <section id="coach" className="section section-dark section-coach">
          <div className="coach-bg-photo" aria-hidden="true">
            <img src="/images/coach-bg.jpg" alt="" loading="lazy" decoding="async" />
          </div>
          <div className="shell coach-profile">
            <p className="eyebrow">{copy.coach.eyebrow}</p>
            <div className="coach-photo">
              <span>Р</span>
            </div>
            <h2>{copy.coach.name}</h2>
            <p className="coach-role">{copy.coach.role} · {copy.coach.credential}</p>
            <p>{copy.coach.bio}</p>
            <blockquote className="coach-quote">{copy.coach.philosophy}</blockquote>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="section section-midcta">
          <div className="shell midcta-inner">
            <a className="button button-primary" href="#contact">
              {copy.hero.cta}
            </a>
          </div>
        </section>

        {/* 4. ADVANTAGES — card grid */}
        <section id="advantages" className="section section-light">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{copy.advantages.eyebrow}</p>
              <h2>{copy.advantages.title}</h2>
            </div>
            <div className="grid grid-two">
              {copy.advantages.items.map((item, i) => (
                <article key={item.title} className="advantage-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. GALLERY — photo grid */}
        <section id="gallery" className="section section-gallery">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{copy.gallery.eyebrow}</p>
              <h2>{copy.gallery.title}</h2>
            </div>
            <PhotoGallery />
          </div>
        </section>

        {/* 6. VIDEO — YouTube shorts embedded */}
        <section className="section section-video">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{copy.video.eyebrow}</p>
              <h2>{copy.video.title}</h2>
            </div>
            <VideoCarousel />
            <p className="video-more">
              <a href="https://youtube.com/@vikingsk-2021" target="_blank" rel="noopener noreferrer">
                {copy.video.youtubeLabel} →
              </a>
            </p>
          </div>
        </section>

        {/* 7. LOCATION — photo + text split */}
        <section id="location" className="section section-light">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{copy.location.eyebrow}</p>
              <h2>{copy.location.title}</h2>
            </div>
            <div className="location-layout">
              <div className="location-photo-card">
                <img src="/images/arena.jpg" alt="Training arena" loading="lazy" decoding="async" />
                <span className="location-photo-label">{copy.location.photoLabel}</span>
              </div>
              <div className="location-text-col">
                <div className="location-content">
                  <p>{copy.location.text}</p>
                  <a className="button button-map" href={copy.location.mapUrl} target="_blank" rel="noopener noreferrer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {copy.location.mapLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. HOW IT WORKS — 3 steps */}
        <section className="section section-steps">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{copy.howItWorks.eyebrow}</p>
              <h2>{copy.howItWorks.title}</h2>
            </div>
            <div className="steps-grid">
              {copy.howItWorks.steps.map((step, i) => (
                <article key={step.num} className="step-card">
                  <span className="step-num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ — accordion-style */}
        <section className="section section-light section-faq">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{copy.faq.eyebrow}</p>
              <h2>{copy.faq.title}</h2>
            </div>
            <div className="faq-list">
              {copy.faq.items.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. CONTACT — form + messengers */}
        <section id="contact" className="section section-contact">
          <div className="shell contact-centered">
            <div className="section-heading">
              <p className="eyebrow">{copy.contact.eyebrow}</p>
              <h2>{copy.contact.title}</h2>
            </div>
            <ContactForm />
            <div className="contact-messengers">
              <p className="contact-messengers__label">{copy.contact.orLabel}</p>
              <div className="contact-messengers__buttons">
                <a className="messenger-btn messenger-btn--wa" href="https://wa.me/380999513717" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/whatsapp.svg" alt="" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a className="messenger-btn messenger-btn--tg" href="https://t.me/RostyslavByanov" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/telegram.svg" alt="" aria-hidden="true" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </section>
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