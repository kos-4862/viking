"use client";

import { useLocale } from "@/components/locale-provider";
import { SiteHeader } from "@/components/site-header";
import { MobileBottomBar } from "@/components/mobile-bottom-bar";

const copy = {
  uk: {
    title: "Політика конфіденційності",
    lastUpdated: "Останнє оновлення: 28 березня 2026",
    sections: [
      {
        heading: "1. Хто ми",
        text: "SC Viking — дитячий футбольний клуб у Бухаресті, Румунія. Сайт: scviking2021.com. Контакт: через форму на сайті або месенджери (WhatsApp, Telegram).",
      },
      {
        heading: "2. Які дані ми збираємо",
        text: "Через контактну форму ми збираємо: ім'я, номер телефону та вік дитини. Ці дані використовуються виключно для зв'язку з вами щодо тренувань.",
      },
      {
        heading: "3. Cookies та аналітика",
        text: "Ми використовуємо Google Analytics 4 для аналізу відвідуваності сайту. Аналітичні cookies встановлюються лише після вашої згоди через банер cookies. Ви можете відхилити cookies — сайт працюватиме без обмежень.",
      },
      {
        heading: "4. Як ми використовуємо дані",
        text: "Ваші дані використовуються тільки для: відповіді на вашу заявку, організації пробного тренування, інформування про розклад занять. Ми не продаємо і не передаємо дані третім особам для маркетингових цілей.",
      },
      {
        heading: "5. Зберігання даних",
        text: "Контактні дані зберігаються до тих пір, поки це необхідно для цілей, зазначених вище. Ви маєте право запросити видалення своїх даних у будь-який момент.",
      },
      {
        heading: "6. Ваші права (GDPR)",
        text: "Відповідно до GDPR, ви маєте право на: доступ до своїх даних, виправлення неточних даних, видалення даних, обмеження обробки, перенесення даних. Для реалізації будь-якого з цих прав зв'яжіться з нами через форму на сайті.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: March 28, 2026",
    sections: [
      {
        heading: "1. Who we are",
        text: "SC Viking is a children's football club in Bucharest, Romania. Website: scviking2021.com. Contact: via the website form or messengers (WhatsApp, Telegram).",
      },
      {
        heading: "2. What data we collect",
        text: "Through the contact form we collect: name, phone number, and child's age. This data is used exclusively to contact you regarding training sessions.",
      },
      {
        heading: "3. Cookies and analytics",
        text: "We use Google Analytics 4 to analyze website traffic. Analytics cookies are only set after your consent via the cookie banner. You can decline cookies — the site will work without limitations.",
      },
      {
        heading: "4. How we use data",
        text: "Your data is used only to: respond to your inquiry, organize a trial training session, inform you about the schedule. We do not sell or share data with third parties for marketing purposes.",
      },
      {
        heading: "5. Data retention",
        text: "Contact data is stored as long as necessary for the purposes stated above. You have the right to request deletion of your data at any time.",
      },
      {
        heading: "6. Your rights (GDPR)",
        text: "Under GDPR, you have the right to: access your data, rectify inaccurate data, erase data, restrict processing, data portability. To exercise any of these rights, contact us via the website form.",
      },
    ],
  },
  ro: {
    title: "Politica de confidențialitate",
    lastUpdated: "Ultima actualizare: 28 martie 2026",
    sections: [
      {
        heading: "1. Cine suntem",
        text: "SC Viking este un club de fotbal pentru copii în București, România. Site: scviking2021.com. Contact: prin formularul de pe site sau mesagerie (WhatsApp, Telegram).",
      },
      {
        heading: "2. Ce date colectăm",
        text: "Prin formularul de contact colectăm: numele, numărul de telefon și vârsta copilului. Aceste date sunt utilizate exclusiv pentru a vă contacta în legătură cu antrenamentele.",
      },
      {
        heading: "3. Cookie-uri și analiză",
        text: "Folosim Google Analytics 4 pentru a analiza traficul site-ului. Cookie-urile analitice sunt setate doar după consimțământul dvs. prin bannerul de cookie-uri. Puteți refuza cookie-urile — site-ul va funcționa fără limitări.",
      },
      {
        heading: "4. Cum folosim datele",
        text: "Datele dvs. sunt utilizate doar pentru: a răspunde la cererea dvs., a organiza un antrenament de probă, a vă informa despre program. Nu vindem și nu transmitem date terților în scopuri de marketing.",
      },
      {
        heading: "5. Stocarea datelor",
        text: "Datele de contact sunt stocate atât timp cât este necesar pentru scopurile menționate mai sus. Aveți dreptul de a solicita ștergerea datelor dvs. în orice moment.",
      },
      {
        heading: "6. Drepturile dvs. (GDPR)",
        text: "Conform GDPR, aveți dreptul la: accesul la datele dvs., rectificarea datelor inexacte, ștergerea datelor, restricționarea prelucrării, portabilitatea datelor. Pentru a exercita oricare dintre aceste drepturi, contactați-ne prin formularul de pe site.",
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    lastUpdated: "Последнее обновление: 28 марта 2026",
    sections: [
      {
        heading: "1. Кто мы",
        text: "SC Viking — детский футбольный клуб в Бухаресте, Румыния. Сайт: scviking2021.com. Контакт: через форму на сайте или мессенджеры (WhatsApp, Telegram).",
      },
      {
        heading: "2. Какие данные мы собираем",
        text: "Через контактную форму мы собираем: имя, номер телефона и возраст ребёнка. Эти данные используются исключительно для связи с вами по поводу тренировок.",
      },
      {
        heading: "3. Cookies и аналитика",
        text: "Мы используем Google Analytics 4 для анализа посещаемости сайта. Аналитические cookies устанавливаются только после вашего согласия через баннер cookies. Вы можете отклонить cookies — сайт будет работать без ограничений.",
      },
      {
        heading: "4. Как мы используем данные",
        text: "Ваши данные используются только для: ответа на вашу заявку, организации пробной тренировки, информирования о расписании. Мы не продаём и не передаём данные третьим лицам в маркетинговых целях.",
      },
      {
        heading: "5. Хранение данных",
        text: "Контактные данные хранятся до тех пор, пока это необходимо для указанных выше целей. Вы имеете право запросить удаление своих данных в любой момент.",
      },
      {
        heading: "6. Ваши права (GDPR)",
        text: "В соответствии с GDPR, вы имеете право на: доступ к своим данным, исправление неточных данных, удаление данных, ограничение обработки, перенос данных. Для реализации любого из этих прав свяжитесь с нами через форму на сайте.",
      },
    ],
  },
};

export default function PrivacyPage() {
  const { locale } = useLocale();
  const t = copy[locale] || copy.uk;

  return (
    <>
      <SiteHeader />
      <main className="privacy-page">
        <div className="shell">
          <a href={`/${locale}`} className="gallery-back">
            ← {locale === "en" ? "Home" : locale === "ro" ? "Acasă" : locale === "ru" ? "На главную" : "На головну"}
          </a>
          <h1>{t.title}</h1>
          <p className="privacy-updated">{t.lastUpdated}</p>
          {t.sections.map((s, i) => (
            <section key={i} className="privacy-section">
              <h2>{s.heading}</h2>
              <p>{s.text}</p>
            </section>
          ))}
        </div>
      </main>
      <MobileBottomBar />
    </>
  );
}