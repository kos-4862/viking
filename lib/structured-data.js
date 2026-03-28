/**
 * Schema.org structured data for SC Viking Academy.
 *
 * All blocks use JSON-LD format and are combined into a single @graph
 * for efficient delivery. Injected into <head> via layout.js.
 *
 * Omitted schemas:
 * - HowTo: rich results removed Sep 2023
 * - AggregateRating: no real reviews yet (placeholder ready below)
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

const SITE_URL = "https://scviking2021.com";

const VIDEOS = [
  // Highlights (longer videos)
  { id: "b7dCTjfvfmE", name: "SC Viking — Outdoor Match Highlights", desc: "Youth football match highlights from SC Viking outdoor game in Bucharest.", duration: "PT2M28S", date: "2026-03-27" },
  { id: "aba3jME0VTU", name: "SC Viking — Stelele Viitorului Cup", desc: "SC Viking competing at the Stelele Viitorului București Cup tournament.", duration: "PT4M8S", date: "2026-03-28" },
  { id: "Ns5ek9PI9JY", name: "SC Viking — Outdoor Match Drone View", desc: "Aerial drone footage of SC Viking youth football match.", duration: "PT38S", date: "2026-03-28" },
  { id: "k-e4fuMrmuo", name: "SC Viking vs Blue Team — Indoor Match", desc: "Indoor match action — SC Viking vs the blue team in the dome.", duration: "PT48S", date: "2026-03-28" },
  { id: "ZF8oyTL2RcA", name: "SC Viking — Tiki-Taka First Steps", desc: "Learning to play like Barcelona — short passes, ball control, and possession training.", duration: "PT38S", date: "2026-03-28" },
  { id: "R_Z0DxhNDxE", name: "SC Viking — Training Atmosphere", desc: "Training atmosphere at SC Viking — footballs on the pitch in Bucharest.", duration: "PT30S", date: "2026-03-28" },
  { id: "z_sypUed8jQ", name: "SC Viking — Top Corner Goal!", desc: "Amazing top corner goal by SC Viking player!", duration: "PT4S", date: "2026-03-27" },
  { id: "HGJVPO-lGwg", name: "SC Viking — Indoor Game Day", desc: "SC Viking playing indoors during winter season.", duration: "PT4S", date: "2026-03-27" },
  // Shorts (short clips)
  { id: "EqWP39F4X9g", name: "SC Viking — Agility Training Drill", desc: "Agility and coordination drills at SC Viking training.", duration: "PT30S", date: "2026-03-27" },
  { id: "7fR598yhHEE", name: "SC Viking — Team Spirit", desc: "SC Viking team huddle before the match — real team spirit!", duration: "PT8S", date: "2026-03-27" },
  { id: "H866o3xaaD8", name: "SC Viking — Tournament Day", desc: "Young Vikings at the youth football tournament in Bucharest.", duration: "PT7S", date: "2026-03-27" },
  { id: "JO6YakcAQzU", name: "SC Viking — Tournament Goal Moment", desc: "Exciting goal moment at the youth football tournament.", duration: "PT4S", date: "2026-03-28" },
  { id: "lWHSUdoaFnM", name: "SC Viking — Tournament Match Action", desc: "Match clip from a youth football tournament in Bucharest.", duration: "PT16S", date: "2026-03-28" },
  { id: "dM2jFjd1JYw", name: "SC Viking — Indoor Match Action", desc: "Fast-paced indoor football action in the training dome.", duration: "PT6S", date: "2026-03-28" },
  { id: "sv-WdtXpUM4", name: "SC Viking — Indoor Attack Play", desc: "Attacking play during indoor match at the training dome.", duration: "PT18S", date: "2026-03-28" },
  { id: "kT7xbgo0rSU", name: "SC Viking — Indoor Training Drill", desc: "Quick training drill in the indoor dome.", duration: "PT4S", date: "2026-03-28" },
];

function getVideoObjects() {
  return VIDEOS.map((v, i) => ({
    "@type": "VideoObject",
    "@id": `${SITE_URL}/#video-${i + 1}`,
    "name": v.name,
    "description": v.desc,
    "thumbnailUrl": `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
    "uploadDate": `${v.date}T00:00:00+03:00`,
    "duration": v.duration,
    "contentUrl": `https://www.youtube.com/watch?v=${v.id}`,
    "embedUrl": `https://www.youtube.com/embed/${v.id}`,
    "publisher": { "@id": `${SITE_URL}/#organization` },
  }));
}

export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [

      // ---------------------------------------------------------------
      // 1. WebSite — enables sitelinks search box potential
      // ---------------------------------------------------------------
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": "SC Viking",
        "description": "Children's football academy in Bucharest. Ages 4-14. UEFA-licensed coaching.",
        "inLanguage": ["uk", "en", "ro", "ru"],
        "publisher": { "@id": `${SITE_URL}/#organization` }
      },

      // ---------------------------------------------------------------
      // 2. WebPage — the single landing page
      // ---------------------------------------------------------------
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        "url": SITE_URL,
        "name": "SC Viking -- Children's Football Academy in Bucharest",
        "description": "SC Viking is a children's football club in Bucharest for ages 4-14. Free trial session. UEFA C licensed coach. Official AMFB championships.",
        "isPartOf": { "@id": `${SITE_URL}/#website` },
        "about": { "@id": `${SITE_URL}/#organization` },
        "inLanguage": "uk",
        "datePublished": "2024-01-01",
        "dateModified": "2026-03-27"
      },

      // ---------------------------------------------------------------
      // 3. Organization (SportsClub) — primary entity
      // ---------------------------------------------------------------
      {
        "@type": ["SportsClub", "SportsActivityLocation"],
        "@id": `${SITE_URL}/#organization`,
        "name": "SC Viking",
        "alternateName": "SC Viking Academy",
        "url": SITE_URL,
        "logo": `${SITE_URL}/Viking/Logo/sc-viking-emblem.jpg`,
        "image": `${SITE_URL}/images/about-team.jpg`,
        "description": "Children's football academy in Bucharest, Romania. Founded in 2021. Three age groups (4-7, 8-11, 12-14). Official AMFB championships and Stelele Viitorului tournaments.",
        "foundingDate": "2021",
        "sport": "Football",
        "email": "scvikingur@gmail.com",
        "telephone": "+380999513717",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bucharest",
          "addressCountry": "RO"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 44.4268,
          "longitude": 26.1025
        },
        "hasMap": "https://maps.app.goo.gl/DxGoubEvT3mGUJ1R9",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "telephone": "+380999513717",
            "email": "scvikingur@gmail.com",
            "availableLanguage": [
              { "@type": "Language", "name": "Ukrainian" },
              { "@type": "Language", "name": "English" },
              { "@type": "Language", "name": "Romanian" },
              { "@type": "Language", "name": "Russian" }
            ],
            "url": "https://wa.me/380999513717",
            "areaServed": {
              "@type": "City",
              "name": "Bucharest"
            }
          }
        ],
        "sameAs": [
          "https://www.facebook.com/sc.viking",
          "https://www.instagram.com/fcvb.2021/",
          "https://www.tiktok.com/@fcvb.2021",
          "https://www.youtube.com/channel/UCD5ho8RpSJ8vccMVvprGpwQ"
        ],
        "memberOf": {
          "@type": "SportsOrganization",
          "name": "AMFB",
          "alternateName": "Asociatia de Mini-Fotbal din Bucuresti",
          "url": "https://amfb.ro/"
        },
        "employee": { "@id": `${SITE_URL}/#coach` },
        "knowsLanguage": ["uk", "en", "ro", "ru"],
        "priceRange": "$$"
      },

      // ---------------------------------------------------------------
      // 4. Person — Head Coach Rostyslav
      // ---------------------------------------------------------------
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#coach`,
        "name": "Rostyslav",
        "jobTitle": "Head Coach",
        "description": "UEFA C licensed head coach at SC Viking. Creates conditions where children want to come back. Provides specific, actionable feedback at every session.",
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "license",
          "name": "UEFA C Licence"
        },
        "worksFor": { "@id": `${SITE_URL}/#organization` },
        "knowsAbout": ["Football coaching", "Youth football development", "UEFA methodology"]
      },

      // ---------------------------------------------------------------
      // 5. BreadcrumbList — virtual sections as breadcrumbs
      //    (single-page app, but helps Google understand structure)
      // ---------------------------------------------------------------
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About the Club",
            "item": `${SITE_URL}/#about`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Coach",
            "item": `${SITE_URL}/#coach`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Gallery",
            "item": `${SITE_URL}/#gallery`
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Location",
            "item": `${SITE_URL}/#location`
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Contact",
            "item": `${SITE_URL}/#contact`
          }
        ]
      },

      // ---------------------------------------------------------------
      // 6. VideoObject — YouTube videos embedded on the page
      // ---------------------------------------------------------------
      ...getVideoObjects(),

      // ---------------------------------------------------------------
      // 7. FAQPage — common parent questions
      // ---------------------------------------------------------------
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "My child is 5 and has never played before. Will they struggle to keep up?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not at all. The 4 to 7 age group is more about play than technique. Within a month or two everyone is at the same level, and over time your child moves up to the intermediate group."
            }
          },
          {
            "@type": "Question",
            "name": "What if my child doesn't enjoy it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The first session is free with no commitment. If it's not the right fit — no problem at all."
            }
          },
          {
            "@type": "Question",
            "name": "How often are training sessions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Training three times a week. Friendly matches every week. Official championship games every two weeks."
            }
          },
          {
            "@type": "Question",
            "name": "Is the venue safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An indoor arena in Bucharest with supervised access — only children and parents on site. The coach is present at every session."
            }
          },
          {
            "@type": "Question",
            "name": "Can parents watch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Always. Parents are welcome to watch, cheer, and lend a hand."
            }
          }
        ]
      },

      // ---------------------------------------------------------------
      // 8. Offer — Free trial session (the main CTA)
      // ---------------------------------------------------------------
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#free-trial`,
        "name": "Free Trial Football Session",
        "description": "First training session is free with no commitment. For children ages 4-14.",
        "price": "0",
        "priceCurrency": "RON",
        "availability": "https://schema.org/InStock",
        "offeredBy": { "@id": `${SITE_URL}/#organization` },
        "eligibleRegion": {
          "@type": "City",
          "name": "Bucharest"
        }
      }
    ]
  };
}

/**
 * Ready-to-use AggregateRating block.
 * Uncomment and add to the @graph array when the club
 * has collected real testimonials/reviews.
 *
 * IMPORTANT: Do NOT add this without real reviews --
 * Google penalizes fake or placeholder ratings.
 *
 * Usage: import and spread into the Organization block:
 *   "aggregateRating": getAggregateRatingPlaceholder()
 */
export function getAggregateRatingPlaceholder() {
  return {
    "@type": "AggregateRating",
    // Replace these with real values:
    "ratingValue": "5.0",
    "reviewCount": "1",
    "bestRating": "5",
    "worstRating": "1"
  };
}

/**
 * Ready-to-use Review block template.
 * Use when adding individual parent testimonials.
 *
 * Usage:
 *   {
 *     "@type": "Review",
 *     "author": { "@type": "Person", "name": "Parent Name" },
 *     "reviewRating": { "@type": "Rating", "ratingValue": "5" },
 *     "reviewBody": "Actual review text here.",
 *     "datePublished": "2026-01-15",
 *     "itemReviewed": { "@id": "${SITE_URL}/#organization" }
 *   }
 */