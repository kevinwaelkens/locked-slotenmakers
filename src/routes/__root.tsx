import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AnalyticsIntegration } from "~/components/AnalyticsIntegration";
import { CookieConsentBanner } from "~/components/CookieConsentBanner";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { MobileCallPill } from "~/components/MobileCallPill";
import { ConsentProvider } from "~/providers/ConsentProvider";
import appCss from "~/styles/app.css?url";

const SITE_URL = "https://locked-slotenmakers.be";
const OG_IMAGE = `${SITE_URL}/og-image.webp`;

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Locksmith", "LocalBusiness", "EmergencyService"],
  "@id": `${SITE_URL}/#business`,
  name: "Locked Slotenmakers",
  legalName: "Locked Slotenmakers BV",
  description:
    "Erkend slotenmaker in Gent voor spoedopeningen, slotvervanging, smart locks en inbraakbeveiliging.",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.webp`,
  image: OG_IMAGE,
  telephone: "+32497815850",
  email: "info@locked-slotenmakers.be",
  vatID: "BE0727444570",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer, Bancontact",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rooigemlaan 581",
    addressLocality: "Gent",
    postalCode: "9000",
    addressRegion: "Oost-Vlaanderen",
    addressCountry: "BE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 51.0623, longitude: 3.7344 },
  areaServed: [
    { "@type": "City", name: "Gent" },
    { "@type": "City", name: "Sint-Amandsberg" },
    { "@type": "City", name: "Gentbrugge" },
    { "@type": "City", name: "Ledeberg" },
    { "@type": "City", name: "Wondelgem" },
    { "@type": "City", name: "Drongen" },
    { "@type": "City", name: "Merelbeke" },
    { "@type": "City", name: "Destelbergen" },
    { "@type": "City", name: "Mariakerke" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  memberOf: {
    "@type": "Organization",
    name: "Vlaamse Slotenmakersunie",
    url: "https://www.vlaamse-slotenmakersunie.be/",
  },
  knowsAbout: [
    "ISEO",
    "Yale",
    "ABUS",
    "LITTO",
    "EVVA",
    "smart lock installatie",
    "inbraakbeveiliging",
    "veiligheidscilinder",
  ],
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "Locked Slotenmakers",
  description: "Erkend slotenmaker in Gent",
  inLanguage: "nl-BE",
  publisher: { "@id": `${SITE_URL}/#business` },
};

// Consent Mode v2 default — must execute before gtag.js loads.
const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",wait_for_update:500});`;

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,350..480,30..100&family=Inter:wght@300..700&display=swap";

// Non-blocking font CSS load: inject as media="print", flip to "all" onload.
// Falls back to a <noscript> tag below for clients without JS.
const fontLoaderScript = `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(FONTS_HREF)};l.media='print';l.onload=function(){l.media='all'};document.head.appendChild(l);})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,viewport-fit=cover",
      },
      {
        name: "keywords",
        content:
          "slotenmaker gent, slotenmaker sint-amandsberg, slot openen gent, buitengesloten gent, slotvervanging gent, inbraakbeveiliging gent, smart lock gent",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Locked Slotenmakers BV" },
      { name: "geo.region", content: "BE-VOV" },
      { name: "geo.placename", content: "Gent" },
      { name: "geo.position", content: "51.0623;3.7344" },
      { name: "ICBM", content: "51.0623, 3.7344" },
      {
        name: "theme-color",
        content: "#042B8D",
        media: "(prefers-color-scheme: light)",
      },
      {
        name: "theme-color",
        content: "#021A5C",
        media: "(prefers-color-scheme: dark)",
      },
      { name: "format-detection", content: "telephone=yes" },
      { name: "color-scheme", content: "light" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "nl_BE" },
      { property: "og:site_name", content: "Locked Slotenmakers" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Locked Slotenmakers — erkend slotenmaker in Gent",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/locked_logo.svg" },
      { rel: "icon", type: "image/webp", href: "/logo.webp" },
      { rel: "apple-touch-icon", href: "/logo.webp" },
      { rel: "alternate", hreflang: "nl-be", href: `${SITE_URL}/` },
      { rel: "alternate", hreflang: "x-default", href: `${SITE_URL}/` },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      { rel: "preload", as: "style", href: FONTS_HREF },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      { children: consentDefaultScript },
      { children: fontLoaderScript },
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteJsonLd),
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="nl-BE">
      <head>
        <HeadContent />
        <noscript>
          <link rel="stylesheet" href={FONTS_HREF} />
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Sla over naar inhoud
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <ConsentProvider>
      <Header />
      <main id="main-content">
        <section className="hero">
          <div className="wrap hero-inner">
            <div className="kicker">404 — Pagina niet gevonden</div>
            <h1 className="h1">
              Deze pagina <em>bestaat niet</em>.
            </h1>
            <p className="hero-sub">
              De link is mogelijk verouderd of verkeerd ingetypt. Ga terug naar
              de homepage of bel ons direct als u dringend hulp nodig heeft.
            </p>
            <div className="hero-actions" style={{ marginTop: 32 }}>
              <a href="/" className="btn-primary">
                Naar de homepage
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCallPill />
    </ConsentProvider>
  );
}

function RootLayout() {
  return (
    <ConsentProvider>
      <AnalyticsIntegration />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <MobileCallPill />
      <CookieConsentBanner />
    </ConsentProvider>
  );
}
