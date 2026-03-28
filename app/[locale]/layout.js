import { LocaleProvider } from "@/components/locale-provider";
import { ScrollManager } from "@/components/scroll-manager";
import { CookieConsent } from "@/components/cookie-consent";
import { supportedLocales } from "@/lib/site-copy";

const SITE_URL = "https://scviking2021.com";

const metaByLocale = {
  ua: {
    title: "SC Viking — Дитячий футбольний клуб у Бухаресті",
    description:
      "SC Viking — дитяча футбольна академія у Бухаресті для дітей 4–14 років. Тренер з ліцензією UEFA C, офіційні змагання AMFB, групи до 12 дітей. Пробне тренування безплатно.",
    ogDescription:
      "Футбольні тренування для дітей 4–14 років. Ліцензований тренер UEFA C, офіційні чемпіонати AMFB, групи до 12 дітей. Перше заняття безплатно.",
  },
  en: {
    title: "SC Viking — Children's Football Club in Bucharest",
    description:
      "SC Viking — children's football academy in Bucharest for ages 4–14. UEFA C licensed coach, official AMFB competitions, groups up to 12 kids. Free trial session.",
    ogDescription:
      "Football training for children 4–14. UEFA C licensed coach, official AMFB championships, groups up to 12 kids. First session free.",
  },
  ro: {
    title: "SC Viking — Club de fotbal pentru copii în București",
    description:
      "SC Viking — academie de fotbal pentru copii în București, vârste 4–14 ani. Antrenor cu licență UEFA C, competiții oficiale AMFB, grupe de max 12 copii. Prima ședință gratuită.",
    ogDescription:
      "Antrenamente de fotbal pentru copii 4–14 ani. Antrenor cu licență UEFA C, campionate oficiale AMFB. Prima ședință gratuită.",
  },
  ru: {
    title: "SC Viking — Детский футбольный клуб в Бухаресте",
    description:
      "SC Viking — детская футбольная академия в Бухаресте для детей 4–14 лет. Тренер с лицензией UEFA C, официальные соревнования AMFB, группы до 12 детей. Пробная тренировка бесплатно.",
    ogDescription:
      "Футбольные тренировки для детей 4–14 лет. Лицензированный тренер UEFA C, официальные чемпионаты AMFB. Первое занятие бесплатно.",
  },
};

const localeToOgLocale = { ua: "uk_UA", en: "en_GB", ro: "ro_RO", ru: "ru_RU" };

export function generateStaticParams() {
  return supportedLocales.map((l) => ({ locale: l.code }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = metaByLocale[locale] || metaByLocale.ua;

  const languages = {};
  supportedLocales.forEach((l) => {
    const hreflang = l.code === "ua" ? "uk" : l.code;
    languages[hreflang] = `/${l.code}`;
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      url: `${SITE_URL}/${locale}`,
      siteName: "SC Viking",
      images: [{ url: "/images/about-team.jpg", width: 1200, height: 630, alt: "SC Viking" }],
      locale: localeToOgLocale[locale] || "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.ogDescription,
      images: ["/images/about-team.jpg"],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <LocaleProvider initialLocale={locale}>
      <ScrollManager />
      {children}
      <CookieConsent />
    </LocaleProvider>
  );
}