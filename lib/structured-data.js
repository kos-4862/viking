/**
 * Schema.org structured data for SC Viking Academy.
 *
 * All blocks use JSON-LD format and are combined into a single @graph
 * for efficient delivery. Injected into <head> via layout.js.
 *
 * Omitted schemas:
 * - FAQPage: restricted to gov/healthcare sites since Aug 2023
 * - HowTo: rich results removed Sep 2023
 * - AggregateRating: no real reviews yet (placeholder ready below)
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

const SITE_URL = "https://scviking2021.com";

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
          "https://www.youtube.com/@vikingsk-2021"
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
      // 6. VideoObject x3 — YouTube Shorts embedded on the page
      // ---------------------------------------------------------------
      {
        "@type": "VideoObject",
        "@id": `${SITE_URL}/#video-1`,
        "name": "SC Viking training",
        "description": "SC Viking children's football training session in Bucharest.",
        "thumbnailUrl": "https://img.youtube.com/vi/EqWP39F4X9g/hqdefault.jpg",
        "uploadDate": "2024-01-01",
        "contentUrl": "https://www.youtube.com/shorts/EqWP39F4X9g",
        "embedUrl": "https://www.youtube.com/embed/EqWP39F4X9g",
        "publisher": { "@id": `${SITE_URL}/#organization` }
      },
      {
        "@type": "VideoObject",
        "@id": `${SITE_URL}/#video-2`,
        "name": "SC Viking match",
        "description": "SC Viking children's football match highlights.",
        "thumbnailUrl": "https://img.youtube.com/vi/7fR598yhHEE/hqdefault.jpg",
        "uploadDate": "2024-01-01",
        "contentUrl": "https://www.youtube.com/shorts/7fR598yhHEE",
        "embedUrl": "https://www.youtube.com/embed/7fR598yhHEE",
        "publisher": { "@id": `${SITE_URL}/#organization` }
      },
      {
        "@type": "VideoObject",
        "@id": `${SITE_URL}/#video-3`,
        "name": "SC Viking goal",
        "description": "Goal scored by SC Viking youth football team.",
        "thumbnailUrl": "https://img.youtube.com/vi/H866o3xaaD8/hqdefault.jpg",
        "uploadDate": "2024-01-01",
        "contentUrl": "https://www.youtube.com/shorts/H866o3xaaD8",
        "embedUrl": "https://www.youtube.com/embed/H866o3xaaD8",
        "publisher": { "@id": `${SITE_URL}/#organization` }
      },

      // ---------------------------------------------------------------
      // 7. Offer — Free trial session (the main CTA)
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