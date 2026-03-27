"use client";

import { useEffect, useRef, useState } from "react";
import { getSiteCopy, supportedLocales } from "@/lib/site-copy";
import { useLocale } from "@/components/locale-provider";
import { useRuntimeConfig } from "@/lib/use-runtime-config";

const socialItems = [
  {
    href: "https://www.facebook.com/sc.viking",
    label: "Facebook",
    icon: "/icons/facebook.svg"
  },
  {
    href: "https://www.instagram.com/fcvb.2021/",
    label: "Instagram",
    icon: "/icons/instagram.svg"
  },
  {
    href: "https://www.tiktok.com/@fcvb.2021",
    label: "TikTok",
    icon: "/icons/tiktok.svg"
  },
  {
    href: "https://t.me/RostyslavByanov",
    label: "Telegram",
    icon: "/icons/telegram.svg"
  }
];

const fallbackWhatsappUrl = "https://wa.me/380999513717";

function LanguageDropdown({ copy, locale, setLocale, mobile = false }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const currentLocale = supportedLocales.find((item) => item.code === locale) || supportedLocales[0];

  useEffect(() => {
    function handlePointerDown(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  function handleSelect(nextLocale) {
    setLocale(nextLocale);
    setOpen(false);
  }

  return (
    <div
      ref={wrapperRef}
      className={`language-dropdown${mobile ? " language-dropdown-mobile" : ""}${open ? " is-open" : ""}`}
    >
      <button
        type="button"
        className="language-dropdown__trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={copy.header.localeLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="language-dropdown__flag" aria-hidden="true">
          {currentLocale.flag}
        </span>
        <span className="language-dropdown__value">{currentLocale.shortLabel}</span>
      </button>

      <div className="language-dropdown__menu" role="listbox" aria-label={copy.header.localeLabel}>
        {supportedLocales.map((item) => (
          <button
            key={item.code}
            type="button"
            role="option"
            aria-selected={locale === item.code}
            className={`language-dropdown__option${locale === item.code ? " is-active" : ""}`}
            onClick={() => handleSelect(item.code)}
          >
            <span className="language-dropdown__flag" aria-hidden="true">
              {item.flag}
            </span>
            <span className="language-dropdown__option-copy">
              <strong>{item.shortLabel}</strong>
              <span>{item.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const runtimeConfig = useRuntimeConfig();
  const { locale, setLocale } = useLocale();
  const copy = getSiteCopy(locale);

  const closeMenu = () => setOpen(false);

  const phoneLabel = runtimeConfig?.phoneLabel || "";
  const phoneHref = runtimeConfig?.phoneHref || "";
  const whatsappUrl = runtimeConfig?.whatsappUrl || fallbackWhatsappUrl;
  const mobileSocialItems = [
    ...socialItems,
    {
      href: whatsappUrl,
      label: "WhatsApp",
      icon: "/icons/whatsapp.svg"
    }
  ];

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="/" aria-label="SC Viking home" onClick={closeMenu}>
          <img src="/sc-viking-emblem.jpg" alt="SC Viking emblem" />
          <div className="brand-copy">
            <strong>SC Viking</strong>
            <span>{copy.header.brandTagline}</span>
          </div>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav id="primary-nav" className={`primary-nav${open ? " is-open" : ""}`} aria-label="Primary">
          {copy.header.navItems.map((item) => (
            <a key={item.href} href={`/${item.href}`} onClick={closeMenu}>
              {item.label}
            </a>
          ))}

          <div className="mobile-nav-panel">
            <LanguageDropdown copy={copy} locale={locale} setLocale={setLocale} mobile />
            {phoneHref ? (
              <a className="mobile-nav-phone" href={phoneHref} onClick={closeMenu}>
                {phoneLabel}
              </a>
            ) : null}
            <a className="mobile-nav-link" href="/#contact" onClick={closeMenu}>
              {copy.header.mobileCtaLabel}
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <LanguageDropdown copy={copy} locale={locale} setLocale={setLocale} />
          {phoneHref ? (
            <a className="header-phone" href={phoneHref}>
              {phoneLabel}
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
