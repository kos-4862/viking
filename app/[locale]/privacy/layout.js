const metaByLocale = {
  ua: { title: "Політика конфіденційності — SC Viking", description: "Політика конфіденційності дитячого футбольного клубу SC Viking." },
  en: { title: "Privacy Policy — SC Viking", description: "Privacy policy of SC Viking children's football club." },
  ro: { title: "Politica de confidențialitate — SC Viking", description: "Politica de confidențialitate a clubului SC Viking." },
  ru: { title: "Политика конфиденциальности — SC Viking", description: "Политика конфиденциальности детского футбольного клуба SC Viking." },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = metaByLocale[locale] || metaByLocale.ua;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default function PrivacyLayout({ children }) {
  return children;
}