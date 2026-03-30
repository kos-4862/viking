import { LocaleProvider } from "@/components/locale-provider";
import { ScrollManager } from "@/components/scroll-manager";
import { CookieConsent } from "@/components/cookie-consent";
import { supportedLocales } from "@/lib/site-copy";

const SITE_URL = "https://scviking2021.com";

const metaByLocale = {
  ua: {
    title: "SC Viking — Дитячий футбольний клуб у Бухаресті | 4–14 років",
    description:
      "Школа футболу для дітей у Бухаресті. Групи 8–12 дітей, тренер з ліцензією UEFA C. Офіційні чемпіонати AMFB та Кубок Stelele Viitorului. Перше тренування безкоштовно.",
    ogDescription:
      "Футбол для дітей у Бухаресті, 4–14 років. Тренер з ліцензією UEFA C, чемпіонати AMFB. Перше заняття безкоштовно.",
  },
  en: {
    title: "SC Viking — Kids Football Club in Bucharest | Ages 4–14",
    description:
      "Children's football club in Bucharest. Small groups of 8–12 kids, UEFA C licensed coach. Official AMFB championships and Stelele Viitorului Cup. Free trial session.",
    ogDescription:
      "Kids football training in Bucharest for ages 4–14. UEFA C licensed coach, official AMFB championships. First session free.",
  },
  ro: {
    title: "SC Viking — Club de fotbal pentru copii în București | 4–14 ani",
    description:
      "Club de fotbal pentru copii în București. Grupe mici de 8–12 copii, antrenor cu licență UEFA C. Campionate oficiale AMFB și Cupa Stelele Viitorului. Prima ședință gratuită.",
    ogDescription:
      "Antrenamente de fotbal pentru copii 4–14 ani în București. Antrenor cu licență UEFA C, campionate AMFB. Prima ședință gratuită.",
  },
  ru: {
    title: "SC Viking — Детский футбольный клуб в Бухаресте | 4–14 лет",
    description:
      "Школа футбола для детей в Бухаресте. Группы 8–12 детей, тренер с лицензией UEFA C. Официальные чемпионаты AMFB и Кубок Stelele Viitorului. Первая тренировка бесплатно.",
    ogDescription:
      "Футбол для детей в Бухаресте, 4–14 лет. Тренер с лицензией UEFA C, чемпионаты AMFB. Первое занятие бесплатно.",
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
      images: [{ url: "/images/about-team.jpg", width: 1200, height: 630, alt: "SC Viking — kids football club Bucharest, team photo" }],
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