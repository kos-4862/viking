"use client";

import { useEffect, useState } from "react";

const fallbackWhatsappUrl = "https://wa.me/380999513717";

export function MobileBottomBar() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/public-config", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => mounted && data && setConfig(data))
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const whatsappUrl = config?.whatsappUrl || fallbackWhatsappUrl;

  return (
    <div className="mobile-bottom-bar">
      <div className="mobile-bottom-bar__messengers">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="mbb-wa">
          <img src="/icons/whatsapp.svg" alt="" aria-hidden="true" />
        </a>
        <a href="https://t.me/RostyslavByanov" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="mbb-tg">
          <img src="/icons/telegram.svg" alt="" aria-hidden="true" />
        </a>
      </div>
      <div className="mobile-bottom-bar__divider" />
      <div className="mobile-bottom-bar__socials">
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
  );
}