export const metadata = {
  title: "Галерея — SC Viking | Фото з тренувань та змагань",
  description:
    "Фотогалерея дитячого футбольного клубу SC Viking у Бухаресті. Фото з тренувань, матчів та офіційних змагань AMFB.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Галерея — SC Viking | Фото з тренувань та змагань",
    description:
      "Фотогалерея дитячого футбольного клубу SC Viking у Бухаресті.",
    url: "/gallery",
    type: "website",
  },
};

export default function GalleryLayout({ children }) {
  return children;
}