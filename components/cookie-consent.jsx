"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/components/locale-provider";

const GA_ID = "G-0WMTCBF9MN";

const copy = {
  uk: { text: "Ми використовуємо cookies для аналітики сайту.", accept: "Прийняти", decline: "Відхилити" },
  en: { text: "We use cookies for site analytics.", accept: "Accept", decline: "Decline" },
  ro: { text: "Folosim cookies pentru analiza site-ului.", accept: "Accept", decline: "Refuz" },
  ru: { text: "Мы используем cookies для аналитики сайта.", accept: "Принять", decline: "Отклонить" },
};

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { locale } = useLocale();
  const t = copy[locale] || copy.uk;

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "granted") {
      enableGA();
    } else if (!consent) {
      setVisible(true);
    }
    // "denied" → do nothing, stay hidden
  }, []);

  function enableGA() {
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
    });
    window.gtag?.("config", GA_ID);
  }

  function handleAccept() {
    localStorage.setItem("cookie_consent", "granted");
    enableGA();
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem("cookie_consent", "denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>{t.text}</p>
      <div className="cookie-buttons">
        <button onClick={handleDecline} className="cookie-btn cookie-btn--decline">{t.decline}</button>
        <button onClick={handleAccept} className="cookie-btn cookie-btn--accept">{t.accept}</button>
      </div>
    </div>
  );
}