"use client";

import { useLocale } from "@/components/locale-provider";
import { getSiteCopy } from "@/lib/site-copy";
import { useRuntimeConfig } from "@/lib/use-runtime-config";

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
  const config = useRuntimeConfig();
  const { locale } = useLocale();
  const copy = getSiteCopy(locale);

  const phoneHref = config?.phoneHref || "tel:+380999513717";
  const phoneLabel = config?.phoneLabel || "+380999513717";
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
        <a className="button button-secondary button-phone" href={phoneHref}>
          <img className="button-icon" src="/icons/phone.svg" alt="" aria-hidden="true" />
          <span>{phoneLabel}</span>
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
