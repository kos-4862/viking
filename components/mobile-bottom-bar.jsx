"use client";

import { useRuntimeConfig } from "@/lib/use-runtime-config";
import { useLocale } from "@/components/locale-provider";
import { getSiteCopy } from "@/lib/site-copy";

const fallbackWhatsappUrl = "https://wa.me/380999513717";

export function MobileBottomBar() {
  const config = useRuntimeConfig();
  const { locale } = useLocale();
  const copy = getSiteCopy(locale);

  const whatsappUrl = config?.whatsappUrl || fallbackWhatsappUrl;
  const phoneHref = config?.phoneHref || "tel:+380999513717";

  return (
    <div className="mobile-bottom-bar">
      <a href={`/${locale}/#contact`} className="mbb-cta">
        Зв'язатися з нами
      </a>
      <div className="mobile-bottom-bar__divider" />
      <div className="mobile-bottom-bar__messengers">
        <a href={phoneHref} aria-label="Phone" className="mbb-phone" onClick={() => window.gtag?.("event", "contact_click", { method: "phone" })}>
          <img src="/icons/phone.svg" alt="Phone" aria-hidden="true" />
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="mbb-wa" onClick={() => window.gtag?.("event", "contact_click", { method: "whatsapp" })}>
          <img src="/icons/whatsapp.svg" alt="WhatsApp" aria-hidden="true" />
        </a>
        <a href="https://t.me/RostyslavByanov" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="mbb-tg" onClick={() => window.gtag?.("event", "contact_click", { method: "telegram" })}>
          <img src="/icons/telegram-blue.svg" alt="Telegram" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}