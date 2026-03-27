export const SOCIAL_LINKS = [
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/sc.viking"
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/fcvb.2021/"
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@fcvb.2021"
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCD5ho8RpSJ8vccMVvprGpwQ"
  }
];

function stripPhone(value) {
  return (value || "").replace(/[^\d+]/g, "");
}

function normalizeWhatsapp(value) {
  return (value || "").replace(/[^\d]/g, "");
}

export function getPublicRuntimeConfig() {
  const phoneLabel = process.env.NEXT_PUBLIC_CLUB_PHONE || "";
  const phoneHref = phoneLabel ? `tel:${stripPhone(phoneLabel)}` : "";
  const whatsappNumber = normalizeWhatsapp(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "380999513717");
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "";

  return {
    clubName: "SC Viking",
    phoneLabel,
    phoneHref,
    whatsappUrl,
    socialLinks: SOCIAL_LINKS
  };
}

export function getTelegramRuntimeConfig() {
  return {
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    chatId: process.env.TELEGRAM_CHAT_ID || ""
  };
}
