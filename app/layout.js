import "./globals.css";
import { Montserrat, Bebas_Neue } from "next/font/google";
import Script from "next/script";
import { getStructuredData } from "@/lib/structured-data";
import { headers } from "next/headers";

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

const localeToBcp47 = { ua: "uk", en: "en", ro: "ro", ru: "ru" };

export const metadata = {
  metadataBase: new URL("https://scviking2021.com"),
  verification: {
    other: { "msvalidate.01": "52CF6B3947142A72DCF25B82341764F3" },
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }) {
  const structuredData = getStructuredData();
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "ua";
  const lang = localeToBcp47[locale] || "uk";

  return (
    <html lang={lang} className={`${montserrat.variable} ${bebasNeue.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#da1123" />
        <link rel="preload" as="image" href="/sc-viking-emblem-transparent.webp" type="image/webp" />
        <link rel="preload" as="image" href="/images/hero-bg.webp" type="image/webp" fetchPriority="high" />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-0WMTCBF9MN"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied'});gtag('js',new Date());gtag('config','G-0WMTCBF9MN');`}
      </Script>
      <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <body>{children}</body>
    </html>
  );
}