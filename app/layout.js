import "./globals.css";
import { Montserrat, Bebas_Neue } from "next/font/google";
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

export const metadata = {
  metadataBase: new URL("https://scviking2021.com"),
  verification: {
    other: { "msvalidate.01": "52CF6B3947142A72DCF25B82341764F3" },
  },
  robots: { index: true, follow: true },
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
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied'});gtag('js',new Date());gtag('config','G-0WMTCBF9MN');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}