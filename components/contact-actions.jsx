"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { getSiteCopy } from "@/lib/site-copy";

const fallbackWhatsappUrl = "https://wa.me/380999513717";

function WhatsAppLabel() {
  return (
    <>
      <img className="button-icon" src="/icons/whatsapp.svg" alt="" aria-hidden="true" />
      <span>WhatsApp</span>
    </>
  );
}

export function ContactActions() {
  const [config, setConfig] = useState(null);
  const { locale } = useLocale();
  const copy = getSiteCopy(locale);

  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      try {
        const response = await fetch("/api/public-config", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (isMounted) {
          setConfig(data);
        }
      } catch {
        // Ignore config fetch failures and keep the placeholder UI.
      }
    }

    loadConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  const phoneHref = config?.phoneHref || "";
  const phoneLabel = config?.phoneLabel || "";
  const whatsappUrl = config?.whatsappUrl || fallbackWhatsappUrl;

  if (!phoneHref && !whatsappUrl) {
    return (
      <div className="contact-runtime-note">
        {copy.contactActions.runtimeNote}
      </div>
    );
  }

  return (
    <div className="contact-actions">
      {phoneHref ? (
        <a className="button button-secondary" href={phoneHref}>
          {phoneLabel}
        </a>
      ) : null}

      {whatsappUrl ? (
        <a className="button button-primary button-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <WhatsAppLabel />
        </a>
      ) : null}
    </div>
  );
}
