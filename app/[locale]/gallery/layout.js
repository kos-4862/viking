const metaByLocale = {
  ua: { title: "Галерея — SC Viking | Фото з тренувань та змагань", description: "Фотогалерея дитячого футбольного клубу SC Viking у Бухаресті." },
  en: { title: "Gallery — SC Viking | Training & Match Photos", description: "Photo gallery of SC Viking children's football club in Bucharest." },
  ro: { title: "Galerie — SC Viking | Fotografii de la antrenamente", description: "Galeria foto a clubului de fotbal pentru copii SC Viking din București." },
  ru: { title: "Галерея — SC Viking | Фото с тренировок и соревнований", description: "Фотогалерея детского футбольного клуба SC Viking в Бухаресте." },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = metaByLocale[locale] || metaByLocale.ua;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}/gallery` },
  };
}

export default function GalleryLayout({ children }) {
  return children;
}