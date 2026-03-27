import "./globals.css";
import { Montserrat, Bebas_Neue } from "next/font/google";
import { LocaleProvider } from "@/components/locale-provider";
import { ScrollManager } from "@/components/scroll-manager";
import { CookieConsent } from "@/components/cookie-consent";
import { getStructuredData } from "@/lib/structured-data";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const SITE_URL = "https://scviking2021.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    other: { "msvalidate.01": "52CF6B3947142A72DCF25B82341764F3" },
  },
  title: "SC Viking — Дитячий футбольний клуб у Бухаресті",
  description:
    "SC Viking — дитяча футбольна академія у Бухаресті для дітей 4–14 років. Тренер з ліцензією UEFA C, офіційні змагання AMFB, групи до 12 дітей. Пробне тренування безплатно.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SC Viking — Дитячий футбольний клуб у Бухаресті",
    description:
      "Футбольні тренування для дітей 4–14 років. Ліцензований тренер UEFA C, офіційні чемпіонати AMFB, групи до 12 дітей. Перше заняття безплатно.",
    url: SITE_URL,
    siteName: "SC Viking",
    images: [{ url: "/images/about-team.jpg", width: 1200, height: 630, alt: "SC Viking — дитячий футбол у Бухаресті" }],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SC Viking — Дитячий футбольний клуб у Бухаресті",
    description:
      "Футбольні тренування для дітей 4–14 років. Ліцензований тренер UEFA C. Пробне тренування безплатно.",
    images: ["/images/about-team.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const structuredData = getStructuredData();

  return (
    <html lang="uk" className={`${montserrat.variable} ${bebasNeue.variable}`}>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0WMTCBF9MN"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied'});gtag('js',new Date());`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <LocaleProvider>
          <ScrollManager />
          {children}
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}