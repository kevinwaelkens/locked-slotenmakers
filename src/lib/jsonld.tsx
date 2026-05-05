import { faq } from "~/data/faq";
import { services } from "~/data/services";
import { business } from "~/data/business";

const BUSINESS_ID = `${business.url}/#business`;

/** FAQPage schema — synced with src/data/faq.ts. */
export function faqJsonLdData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

/** Service[] graph — surfaces individual services to crawlers. */
export function servicesJsonLdData() {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      "@id": `${business.url}/#service-${s.slug}`,
      serviceType: s.title,
      name: s.title,
      description: s.description,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Gent" },
      category: "Locksmith",
    })),
  };
}

/** BreadcrumbList — pass an array of { name, path }. */
export function breadcrumbJsonLdData(
  trail: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: business.url + item.path,
    })),
  };
}

/** Tarieven page — Offer schema describing the pricing table. */
export function pricingJsonLdData() {
  return {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    name: "Tarieven depannage Locked Slotenmakers",
    priceCurrency: "EUR",
    provider: { "@id": BUSINESS_ID },
    description:
      "Forfait eerste uur op werkdagen overdag: € 75 (excl. btw). Avond/nacht: identiek. Dringende interventie: € 75 overdag, € 125 's avonds en 's nachts.",
  };
}

/** Area page — Service entity scoped to a city. */
export function areaJsonLdData({
  areaName,
  areaPostalCode,
  slug,
}: {
  areaName: string;
  areaPostalCode: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${business.url}/slotenmaker/${slug}/#service`,
        serviceType: `Slotenmaker in ${areaName}`,
        name: `Slotenmaker ${areaName}`,
        description: `Erkend slotenmaker voor spoedopeningen, slotvervanging en inbraakbeveiliging in ${areaName} (${areaPostalCode}).`,
        provider: { "@id": BUSINESS_ID },
        areaServed: {
          "@type": "City",
          name: areaName,
          address: {
            "@type": "PostalAddress",
            postalCode: areaPostalCode,
            addressCountry: "BE",
          },
        },
        category: "Locksmith",
      },
    ],
  };
}
