export const supportedLocales = [
  { code: "uk", label: "Українська", shortLabel: "UA", flag: "🇺🇦" },
  { code: "en", label: "English", shortLabel: "EN", flag: "🇬🇧" },
  { code: "ro", label: "Română", shortLabel: "RO", flag: "🇷🇴" },
  { code: "ru", label: "Русский", shortLabel: "RU", flag: "🇷🇺" }
];

const baseCopy = {
  pageTitle: "SC Viking — Дитячий футбольний клуб у Бухаресті",
  header: {
    brandTagline: "Футбольний клуб",
    localeLabel: "Мова",
    mobileSocialLabel: "Соцмережі та швидкий зв'язок",
    mobileCtaLabel: "Залишити заявку",
    navItems: [
      { href: "#about", label: "Про клуб" },
      { href: "#advantages", label: "Чому ми" },
      { href: "#coach", label: "Тренери" },
      { href: "#gallery", label: "Галерея" },
      { href: "#location", label: "Локація" },
      { href: "#contact", label: "Контакти" }
    ]
  },
  hero: {
    eyebrow: "Дитячий футбольний клуб · Бухарест",
    title: "SC Viking",
    lead: "Де діти знаходять команду, впевненість у собі і справжню радість від гри",
    cta: "Пробне тренування — безкоштовно",
    ctaSub: "Перше заняття без оплати. Тренер відповість протягом доби."
  },
  howItWorks: {
    eyebrow: "Як почати",
    title: "Три кроки до команди",
    steps: [
      {
        num: "01",
        title: "Пробне тренування",
        text: "Напиши у WhatsApp або заповни форму. Перше заняття безкоштовне, без зобов'язань."
      },
      {
        num: "02",
        title: "Приєднуйся до групи",
        text: "Обираєш зручний графік. Через місяць дитина вже частина команди."
      },
      {
        num: "03",
        title: "Граєш і зростаєш",
        text: "Регулярні тренування, офіційні чемпіонати AMFB і турніри Stelele Viitorului."
      }
    ]
  },
  about: {
    eyebrow: "Про клуб",
    title: "Футбол — це більше, ніж гра",
    intro: "SC Viking — клуб, створений з простою ідеєю: футбол робить дітей сильнішими не на полі, а в житті.",
    approach: "Тренерський штаб вчить не лише футболу — вони вчать працювати в команді, підніматись після невдач і брати відповідальність.",
    groups: [
      { ages: "4–7", ageUnit: "років", label: "Початківці" },
      { ages: "8–11", ageUnit: "років", label: "Просунуті" },
      { ages: "12–14", ageUnit: "років", label: "Досвідчені" },
    ],
    practice: "Постійна ігрова практика з найкращими колективами Бухареста: офіційні турніри федерації футболу Бухареста AMFB, Кубок Stelele Viitorului București та товариські ігри.",
  },
  advantages: {
    eyebrow: "Чому SC Viking",
    title: "Чому батьки обирають наш клуб",
    items: [
      {
        title: "Індивідуальний підхід",
        text: "Група 8–12 дітей. Тренер знає кожну дитину і працює з її сильними і слабкими сторонами."
      },
      {
        title: "Ліцензовані тренери",
        text: "Тренерський склад з ліцензією UEFA C. Сучасні методики, професійний підхід."
      },
      {
        title: "Дисципліна і характер",
        text: "На полі дитина вчиться поважати рішення, допомагати партнерам і не здаватись."
      },
      {
        title: "Чемпіонати та кубки",
        text: "Офіційні ігри чемпіонату AMFB та кубкові турніри Stelele Viitorului București."
      },
      {
        title: "Три групи за віком і рівнем",
        text: "Початківці (4–7 років), просунуті (8–11 років), досвідчені (12–14 років). Кожна дитина тренується на своєму рівні."
      },
      {
        title: "Товариські матчі",
        text: "Щотижневі ігри з клубами Бухареста — постійна ігрова практика."
      },
      {
        title: "Регулярні тренування",
        text: "Стабільний щотижневий графік у Бухаресті."
      }
    ]
  },
  coach: {
    eyebrow: "Тренери",
    name: "Ростислав",
    role: "Головний тренер",
    credential: "Ліцензія UEFA C",
    bio: "Не чекає, поки дітям сподобається футбол — створює умови, щоб їм захотілось повертатись. Кожна дитина отримує конкретний зворотний зв'язок на тренуванні. Турніри — це можливість вчитись, а не іспит.",
    philosophy: "Футбол — це навчання. Перемога — результат."
  },
  faq: {
    eyebrow: "Часті питання",
    title: "Батьки запитують",
    items: [
      {
        q: "Дитині 5 років і вона ніколи не грала. Вона відстане?",
        a: "Ні. Група від 4 до 7 років — це більше гра, ніж техніка. Через місяць-два всі на одному рівні, а з часом дитина переходить у просунуту групу."
      },
      {
        q: "А якщо дитині не сподобається?",
        a: "Пробне тренування безкоштовне, без зобов'язань. Не сподобалось — без проблем."
      },
      {
        q: "Як часто тренування?",
        a: "Тренування тричі на тиждень. Товариські ігри — щотижня. Офіційні матчі чемпіонату — раз на 2 тижні."
      },
      {
        q: "Чи безпечна локація?",
        a: "Критий манеж у Бухаресті. Територія під наглядом. Тренер присутній на кожному занятті."
      },
      {
        q: "Чи можуть батьки приходити?",
        a: "Завжди. Батьки спостерігають, підтримують, допомагають."
      }
    ]
  },
  gallery: {
    eyebrow: "Галерея",
    title: "Життя клубу в фокусі фотокамер"
  },
  video: {
    eyebrow: "Від перших кроків до перших перемог",
    title: "Дивись як ми граємо",
    youtubeLabel: "Більше на YouTube"
  },
  location: {
    eyebrow: "Де тренуємось",
    title: "Локація тренувань",
    text: "Тренування у сучасному критому манежі в Бухаресті. Територія під наглядом — тільки діти та батьки.",
    photoLabel: "Критий манеж",
    mapUrl: "https://maps.app.goo.gl/DxGoubEvT3mGUJ1R9",
    mapLabel: "Відкрити на карті"
  },
  contact: {
    eyebrow: "Запис на тренування",
    title: "Залиш заявку — ми зв'яжемось",
    orLabel: "або напиши тренеру напряму"
  },
  contactActions: {
    runtimeNote:
      "Після того як ти даси номер тренера і WhatsApp, тут з'являться живі кнопки контакту без переписування верстки."
  },
  form: {
    eyebrow: "Швидкий запис",
    title: "Залиш заявку і клуб зв'яжеться з тобою",
    fields: {
      nameLabel: "Ім'я",
      namePlaceholder: "Ваше ім'я",
      phoneLabel: "Телефон",
      phonePlaceholder: "+40...",
      ageLabel: "Вік дитини",
      agePlaceholder: "Наприклад: 8"
    },
    submitIdle: "Відправити заявку",
    submitLoading: "Надсилаємо...",
    validationError: "Заповніть ім'я, телефон і вік дитини.",
    genericError: "Щось пішло не так.",
    successWithTelegram: "Дякуємо, {name}. Заявка вже відправлена тренеру.",
    successPrototype: "Дякуємо, {name}. Форма працює в режимі прототипу, Telegram підключимо після налаштування."
  },
  footer: {
    eyebrow: "SC Viking",
    title: "© 2021–2026 SC Viking · Дитячий футбольний клуб · Бухарест",
    followLabel: "Слідкуй за нами"
  }
};

const localeOverrides = {
  en: {
    pageTitle: "SC Viking — Youth Football Club in Bucharest",
    header: {
      brandTagline: "Football Club",
      localeLabel: "Language",
      mobileSocialLabel: "Socials and quick contact",
      mobileCtaLabel: "Send request",
      navItems: [
        { href: "#about", label: "About" },
        { href: "#advantages", label: "Why Us" },
        { href: "#coach", label: "Coach" },
        { href: "#gallery", label: "Gallery" },
        { href: "#location", label: "Location" },
        { href: "#contact", label: "Contact" }
      ]
    },
    hero: {
      eyebrow: "Children's football club · Bucharest",
      lead: "Where children find a team, build confidence, and discover the real joy of the game",
      cta: "Free trial session",
      ctaSub: "First session at no cost. The coach will respond within a day."
    },
    howItWorks: {
      eyebrow: "How to get started",
      title: "Three steps to the team",
      steps: [
        {
          num: "01",
          title: "Trial session",
          text: "Message us on WhatsApp or fill in the form. The first session is free, no commitment required."
        },
        {
          num: "02",
          title: "Join a group",
          text: "Pick a schedule that works for you. Within a month, your child is already part of the team."
        },
        {
          num: "03",
          title: "Play and grow",
          text: "Regular training sessions, official AMFB championships, and Stelele Viitorului tournaments."
        }
      ]
    },
    about: {
      eyebrow: "About the club",
      title: "Football is more than a game",
      intro: "SC Viking is a club built on a simple idea: football makes children stronger not just on the pitch, but in life.",
      approach: "Our coaching staff teaches more than football — they teach kids to work as a team, bounce back from setbacks, and take responsibility.",
      groups: [
        { ages: "4–7", ageUnit: "years", label: "Beginners" },
        { ages: "8–11", ageUnit: "years", label: "Intermediate" },
        { ages: "12–14", ageUnit: "years", label: "Advanced" },
      ],
      practice: "Regular competitive practice with the best teams in Bucharest: official tournaments of the Bucharest Football Federation AMFB, Stelele Viitorului București Cup, and friendly matches.",
    },
    advantages: {
      eyebrow: "Why SC Viking",
      title: "Why parents choose our club",
      items: [
        {
          title: "Individual approach",
          text: "Groups of 8–12 children. The coach knows every child and works with their strengths and areas to develop."
        },
        {
          title: "Licensed coaches",
          text: "UEFA C licensed coaching staff. Modern methods, professional approach."
        },
        {
          title: "Discipline and character",
          text: "On the pitch children learn to respect decisions, support teammates, and never give up."
        },
        {
          title: "Championships and cups",
          text: "Official AMFB championship games and Stelele Viitorului București cup tournaments."
        },
        {
          title: "Three groups by age and level",
          text: "Beginners (ages 4–7), intermediate (ages 8–11), advanced (ages 12–14). Every child trains at the right level."
        },
        {
          title: "Friendly matches",
          text: "Weekly games against Bucharest clubs — consistent match practice."
        },
        {
          title: "Regular training",
          text: "A consistent weekly schedule in Bucharest."
        }
      ]
    },
    coach: {
      eyebrow: "Coach",
      name: "Rostyslav",
      role: "Head Coach",
      credential: "UEFA C Licence",
      bio: "Doesn't wait for children to fall in love with football — creates the conditions that make them want to come back. Every child gets specific, actionable feedback at each session. Tournaments are a chance to learn, not a test to pass.",
      philosophy: "Football is learning. Winning is the outcome."
    },
    faq: {
      eyebrow: "FAQ",
      title: "Parents ask",
      items: [
        {
          q: "My child is 5 and has never played before. Will they struggle to keep up?",
          a: "Not at all. The 4 to 7 age group is more about play than technique. Within a month or two everyone is at the same level, and over time your child moves up to the intermediate group."
        },
        {
          q: "What if my child doesn't enjoy it?",
          a: "The trial session is free with no commitment. If it's not the right fit — no problem at all."
        },
        {
          q: "How often are training sessions?",
          a: "Training three times a week. Friendly matches every week. Official championship games every two weeks."
        },
        {
          q: "Is the venue safe?",
          a: "An indoor arena in Bucharest with supervised access — only children and parents on site. The coach is present at every session."
        },
        {
          q: "Can parents watch?",
          a: "Always. Parents are welcome to watch, cheer, and lend a hand."
        }
      ]
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Club life through the lens"
    },
    video: {
      eyebrow: "From first steps to first wins",
      title: "Watch us play",
      youtubeLabel: "More on YouTube"
    },
    location: {
      eyebrow: "Where we train",
      title: "Training location",
      text: "Sessions take place in a modern indoor arena in Bucharest. Supervised grounds — only children and parents.",
      photoLabel: "Indoor arena",
      mapLabel: "Open on map"
    },
    contact: {
      eyebrow: "Sign up for training",
      title: "Leave a request — we will get in touch",
      orLabel: "or message the coach directly"
    },
    contactActions: {
      runtimeNote: "Once you share the coach's number and WhatsApp, live contact buttons will appear here without changing the layout."
    },
    form: {
      eyebrow: "Quick request",
      title: "Leave a request and the club will contact you",
      fields: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        phoneLabel: "Phone",
        phonePlaceholder: "+40...",
        ageLabel: "Child age",
        agePlaceholder: "For example: 8"
      },
      submitIdle: "Send request",
      submitLoading: "Sending...",
      validationError: "Please fill in the name, phone number, and child age.",
      genericError: "Something went wrong.",
      successWithTelegram: "Thank you, {name}. Your request has already been sent to the coach.",
      successPrototype: "Thank you, {name}. The form is running in prototype mode, and Telegram will be connected after setup."
    },
    footer: {
      title: "© 2021–2026 SC Viking · Children's Football Club · Bucharest",
      followLabel: "Follow us"
    }
  },
  ro: {
    pageTitle: "SC Viking — Club de fotbal pentru copii în București",
    header: {
      brandTagline: "Club de fotbal",
      localeLabel: "Limbă",
      mobileSocialLabel: "Rețele și contact rapid",
      mobileCtaLabel: "Trimite cererea",
      navItems: [
        { href: "#about", label: "Despre club" },
        { href: "#advantages", label: "De ce noi" },
        { href: "#coach", label: "Antrenor" },
        { href: "#gallery", label: "Galerie" },
        { href: "#location", label: "Locație" },
        { href: "#contact", label: "Contact" }
      ]
    },
    hero: {
      eyebrow: "Club de fotbal pentru copii · București",
      lead: "Unde copiii găsesc o echipă, capătă încredere în sine și descoperă bucuria adevărată a jocului",
      cta: "Antrenament de probă — gratuit",
      ctaSub: "Prima ședință fără plată. Antrenorul răspunde în 24 de ore."
    },
    howItWorks: {
      eyebrow: "Cum începi",
      title: "Trei pași până la echipă",
      steps: [
        {
          num: "01",
          title: "Antrenament de probă",
          text: "Scrie-ne pe WhatsApp sau completează formularul. Prima ședință e gratuită, fără niciun angajament."
        },
        {
          num: "02",
          title: "Alătură-te grupei",
          text: "Alegi programul care ți se potrivește. Într-o lună, copilul tău e deja parte din echipă."
        },
        {
          num: "03",
          title: "Joci și crești",
          text: "Antrenamente regulate, campionate oficiale AMFB și turneele Stelele Viitorului."
        }
      ]
    },
    about: {
      eyebrow: "Despre club",
      title: "Fotbalul este mai mult decât un joc",
      intro: "SC Viking este un club creat cu o idee simplă: fotbalul îi face pe copii mai puternici nu pe teren, ci în viață.",
      approach: "Echipa noastră de antrenori nu predă doar fotbal — îi învață pe copii să lucreze în echipă, să se ridice după eșecuri și să își asume responsabilitatea.",
      groups: [
        { ages: "4–7", ageUnit: "ani", label: "Începători" },
        { ages: "8–11", ageUnit: "ani", label: "Avansați" },
        { ages: "12–14", ageUnit: "ani", label: "Experimentați" },
      ],
      practice: "Practică competitivă constantă cu cele mai bune echipe din București: turnee oficiale ale Federației de Fotbal din București AMFB, Cupa Stelele Viitorului București și meciuri amicale.",
    },
    advantages: {
      eyebrow: "De ce SC Viking",
      title: "De ce părinții aleg clubul nostru",
      items: [
        {
          title: "Abordare individuală",
          text: "Grupe de 8–12 copii. Antrenorul cunoaște fiecare copil și lucrează cu punctele lui forte și cu cele slabe."
        },
        {
          title: "Antrenori licențiați",
          text: "Colectiv de antrenori cu licență UEFA C. Metode moderne, abordare profesională."
        },
        {
          title: "Disciplină și caracter",
          text: "Pe teren copilul învață să respecte deciziile, să îi susțină pe colegi și să nu renunțe."
        },
        {
          title: "Campionate și cupe",
          text: "Meciuri oficiale în campionatul AMFB și turnee de cupă Stelele Viitorului București."
        },
        {
          title: "Trei grupe după vârstă și nivel",
          text: "Începători (4–7 ani), avansați (8–11 ani), experimentați (12–14 ani). Fiecare copil la nivelul lui."
        },
        {
          title: "Meciuri amicale",
          text: "Jocuri săptămânale cu cluburi din București — practică constantă de meci."
        },
        {
          title: "Antrenamente regulate",
          text: "Program săptămânal stabil în București."
        }
      ]
    },
    coach: {
      eyebrow: "Antrenor",
      name: "Rostyslav",
      role: "Antrenor principal",
      credential: "Licență UEFA C",
      bio: "Nu așteaptă ca fotbalul să le placă copiilor de la sine — creează condițiile în care vor să revină. Fiecare copil primește feedback concret la fiecare antrenament. Turneele sunt o ocazie de a învăța, nu un examen.",
      philosophy: "Fotbalul înseamnă învățare. Victoria e rezultatul."
    },
    faq: {
      eyebrow: "Întrebări frecvente",
      title: "Părinții întreabă",
      items: [
        {
          q: "Copilul meu are 5 ani și n-a mai jucat niciodată. Va rămâne în urmă?",
          a: "Nu. Grupa de la 4 la 7 ani e mai mult joacă decât tehnică. Într-o lună-două toți sunt la același nivel, iar cu timpul copilul trece în grupa avansaților."
        },
        {
          q: "Cât costă?",
          a: "Depinde de grupă și de program. Scrie-ne pe WhatsApp și îți explicăm tot."
        },
        {
          q: "Ce se întâmplă dacă copilului nu îi place?",
          a: "Antrenamentul de probă e gratuit, fără angajament. Nu i-a plăcut — nicio problemă."
        },
        {
          q: "Cât de des sunt antrenamentele?",
          a: "Antrenamente de trei ori pe săptămână. Meciuri amicale în fiecare săptămână. Meciuri oficiale de campionat — o dată la 2 săptămâni."
        },
        {
          q: "Este locația sigură?",
          a: "Sală acoperită în București, cu acces supravegheat — doar copii și părinți. Antrenorul e prezent la fiecare ședință."
        },
        {
          q: "Pot veni părinții să privească?",
          a: "Oricând. Părinții sunt bineveniți să urmărească, să susțină și să ajute."
        }
      ]
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Viața clubului în focusul camerelor"
    },
    video: {
      eyebrow: "De la primii pași la primele victorii",
      title: "Privește cum jucăm",
      youtubeLabel: "Mai mult pe YouTube"
    },
    location: {
      eyebrow: "Unde ne antrenăm",
      title: "Locația antrenamentelor",
      text: "Antrenamentele au loc într-o sală acoperită modernă din București. Acces supravegheat — doar copii și părinți.",
      photoLabel: "Sală acoperită",
      mapLabel: "Deschide pe hartă"
    },
    contact: {
      eyebrow: "Înscrie-te la antrenament",
      title: "Lasă o cerere — te vom contacta",
      orLabel: "sau scrie direct antrenorului"
    },
    contactActions: {
      runtimeNote: "După ce ne trimiți numărul antrenorului și WhatsApp-ul, aici vor apărea butoane reale de contact fără schimbarea layoutului."
    },
    form: {
      eyebrow: "Cerere rapidă",
      title: "Lasă o cerere și clubul te va contacta",
      fields: {
        nameLabel: "Nume",
        namePlaceholder: "Numele tău",
        phoneLabel: "Telefon",
        phonePlaceholder: "+40...",
        ageLabel: "Vârsta copilului",
        agePlaceholder: "De exemplu: 8"
      },
      submitIdle: "Trimite cererea",
      submitLoading: "Se trimite...",
      validationError: "Completează numele, telefonul și vârsta copilului.",
      genericError: "A apărut o eroare.",
      successWithTelegram: "Mulțumim, {name}. Cererea a fost deja trimisă antrenorului.",
      successPrototype: "Mulțumim, {name}. Formularul funcționează acum în regim de prototip, iar Telegram va fi conectat după configurare."
    },
    footer: {
      title: "© 2021–2026 SC Viking · Club de fotbal pentru copii · București",
      followLabel: "Urmărește-ne"
    }
  },
  ru: {
    pageTitle: "SC Viking — Детский футбольный клуб в Бухаресте",
    header: {
      brandTagline: "Футбольный клуб",
      localeLabel: "Язык",
      mobileSocialLabel: "Соцсети и быстрый контакт",
      mobileCtaLabel: "Оставить заявку",
      navItems: [
        { href: "#about", label: "О клубе" },
        { href: "#advantages", label: "Почему мы" },
        { href: "#coach", label: "Тренерский состав" },
        { href: "#gallery", label: "Галерея" },
        { href: "#location", label: "Локация" },
        { href: "#contact", label: "Контакты" }
      ]
    },
    hero: {
      eyebrow: "Детский футбольный клуб · Бухарест",
      lead: "Где дети находят команду, обретают уверенность в себе и открывают настоящую радость игры",
      cta: "Пробная тренировка — бесплатно",
      ctaSub: "Первое занятие без оплаты. Тренер ответит в течение суток."
    },
    howItWorks: {
      eyebrow: "Как начать",
      title: "Три шага до команды",
      steps: [
        {
          num: "01",
          title: "Пробная тренировка",
          text: "Напиши в WhatsApp или заполни форму. Первое занятие бесплатное, без обязательств."
        },
        {
          num: "02",
          title: "Присоединяйся к группе",
          text: "Выбираешь удобное расписание. Через месяц ребёнок уже часть команды."
        },
        {
          num: "03",
          title: "Играешь и растёшь",
          text: "Регулярные тренировки, официальные чемпионаты AMFB и турниры Stelele Viitorului."
        }
      ]
    },
    about: {
      eyebrow: "О клубе",
      title: "Футбол — это больше, чем игра",
      intro: "SC Viking — клуб, созданный с простой идеей: футбол делает детей сильнее не на поле, а в жизни.",
      approach: "Тренерский штаб учит не только футболу — они учат работать в команде, подниматься после неудач и брать ответственность.",
      groups: [
        { ages: "4–7", ageUnit: "лет", label: "Начинающие" },
        { ages: "8–11", ageUnit: "лет", label: "Продвинутые" },
        { ages: "12–14", ageUnit: "лет", label: "Опытные" },
      ],
      practice: "Постоянная игровая практика с лучшими коллективами Бухареста: официальные турниры федерации футбола Бухареста AMFB, Кубок Stelele Viitorului București и товарищеские матчи.",
    },
    advantages: {
      eyebrow: "Почему SC Viking",
      title: "Почему родители выбирают наш клуб",
      items: [
        {
          title: "Индивидуальный подход",
          text: "Группа 8–12 детей. Тренер знает каждого ребёнка и работает с его сильными и слабыми сторонами."
        },
        {
          title: "Лицензированные тренеры",
          text: "Тренерский состав с лицензией UEFA C. Современные методики, профессиональный подход."
        },
        {
          title: "Дисциплина и характер",
          text: "На поле ребёнок учится уважать решения, поддерживать партнёров и не сдаваться."
        },
        {
          title: "Чемпионаты и кубки",
          text: "Официальные игры чемпионата AMFB и кубковые турниры Stelele Viitorului București."
        },
        {
          title: "Три группы по возрасту и уровню",
          text: "Начинающие (4–7 лет), продвинутые (8–11 лет), опытные (12–14 лет). Каждый ребёнок тренируется на своём уровне."
        },
        {
          title: "Товарищеские матчи",
          text: "Еженедельные игры с клубами Бухареста — постоянная игровая практика."
        },
        {
          title: "Регулярные тренировки",
          text: "Стабильное еженедельное расписание в Бухаресте."
        }
      ]
    },
    coach: {
      eyebrow: "Тренеры",
      name: "Ростислав",
      role: "Главный тренер",
      credential: "Лицензия UEFA C",
      bio: "Не ждёт, пока детям понравится футбол — создаёт условия, в которых им хочется возвращаться. Каждый ребёнок получает конкретную обратную связь на каждой тренировке. Турниры — это возможность учиться, а не экзамен.",
      philosophy: "Футбол — это обучение. Победа — результат."
    },
    faq: {
      eyebrow: "Частые вопросы",
      title: "Родители спрашивают",
      items: [
        {
          q: "Ребёнку 5 лет, он никогда не играл. Будет отставать?",
          a: "Нет. Группа от 4 до 7 лет — это больше игра, чем техника. Через месяц-два все на одном уровне, а со временем ребёнок переходит в продвинутую группу."
        },
        {
          q: "Сколько стоит?",
          a: "Зависит от возраста и расписания. Напишите в WhatsApp — расскажем подробно."
        },
        {
          q: "А если ребёнку не понравится?",
          a: "Пробная тренировка бесплатная, без обязательств. Не понравилось — без проблем."
        },
        {
          q: "Как часто тренировки?",
          a: "Тренировки три раза в неделю. Товарищеские игры — каждую неделю. Официальные матчи чемпионата — раз в 2 недели."
        },
        {
          q: "Безопасна ли локация?",
          a: "Крытый манеж в Бухаресте. Территория под наблюдением. Тренер присутствует на каждом занятии."
        },
        {
          q: "Могут ли родители присутствовать?",
          a: "Всегда. Родители наблюдают, поддерживают, помогают."
        }
      ]
    },
    gallery: {
      eyebrow: "Галерея",
      title: "Жизнь клуба в фокусе фотокамер"
    },
    video: {
      eyebrow: "От первых шагов до первых побед",
      title: "Смотрите, как мы играем",
      youtubeLabel: "Больше на YouTube"
    },
    location: {
      eyebrow: "Где тренируемся",
      title: "Локация тренировок",
      text: "Тренировки проходят в современном крытом манеже в Бухаресте. Территория под наблюдением — только дети и родители.",
      photoLabel: "Крытый манеж",
      mapLabel: "Открыть на карте"
    },
    contact: {
      eyebrow: "Запись на тренировку",
      title: "Оставь заявку — мы свяжемся",
      orLabel: "или напиши тренеру напрямую"
    },
    contactActions: {
      runtimeNote: "После того как ты дашь номер тренера и WhatsApp, здесь появятся живые кнопки контакта без переписывания вёрстки."
    },
    form: {
      eyebrow: "Быстрая заявка",
      title: "Оставь заявку, и клуб свяжется с тобой",
      fields: {
        nameLabel: "Имя",
        namePlaceholder: "Ваше имя",
        phoneLabel: "Телефон",
        phonePlaceholder: "+40...",
        ageLabel: "Возраст ребёнка",
        agePlaceholder: "Например: 8"
      },
      submitIdle: "Отправить заявку",
      submitLoading: "Отправляем...",
      validationError: "Заполните имя, телефон и возраст ребёнка.",
      genericError: "Что-то пошло не так.",
      successWithTelegram: "Спасибо, {name}. Заявка уже отправлена тренеру.",
      successPrototype: "Спасибо, {name}. Форма работает в режиме прототипа, Telegram подключим после настройки."
    },
    footer: {
      title: "© 2021–2026 SC Viking · Детский футбольный клуб · Бухарест",
      followLabel: "Подписывайтесь"
    }
  }
};

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeCopy(base, override) {
  if (Array.isArray(base) || Array.isArray(override)) {
    return override ?? base;
  }

  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override ?? base;
  }

  const merged = { ...base };

  for (const key of Object.keys(override)) {
    merged[key] = key in base ? mergeCopy(base[key], override[key]) : override[key];
  }

  return merged;
}

export function getSiteCopy(locale = "uk") {
  if (locale === "uk") {
    return baseCopy;
  }

  return mergeCopy(baseCopy, localeOverrides[locale] || {});
}