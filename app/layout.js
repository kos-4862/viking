import "./globals.css";
import { LocaleProvider } from "@/components/locale-provider";
import { ScrollManager } from "@/components/scroll-manager";

export const metadata = {
  title: "SC Viking",
  description:
    "SC Viking football club prototype on Next.js with a premium academy-style structure, dynamic contact form, and Cloudflare-ready deployment."
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <LocaleProvider>
          <ScrollManager />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
