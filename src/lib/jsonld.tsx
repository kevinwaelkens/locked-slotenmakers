import { faq } from "~/data/faq";
import { services } from "~/data/services";
import { business } from "~/data/business";

const BUSINESS_ID = `${business.url}/#business`;

/** Inline a JSON-LD script. Renders nothing visually. */
function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** FAQPage schema — synced with src/data/faq.ts (visible FAQ uses the same source). */
export function FaqJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: { "@type": "Answer", text: entry.answer },
        })),
      }}
    />
  );
}

/** Service[] graph — surfaces individual services to AI/structured-data crawlers. */
export function ServicesJsonLd() {
  return (
    <JsonLd
      data={{
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
      }}
    />
  );
}

/** BreadcrumbList — pass an array of { name, path }, with the home page as item 1. */
export function BreadcrumbJsonLd({
  trail,
}: {
  trail: Array<{ name: string; path: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: business.url + item.path,
        })),
      }}
    />
  );
}

/** Tarieven page — Offer schema describing the pricing table. */
export function PricingJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "PriceSpecification",
        name: "Tarieven depannage Locked Slotenmakers",
        priceCurrency: "EUR",
        provider: { "@id": BUSINESS_ID },
        description:
          "Forfait eerste uur op werkdagen overdag: € 75 (excl. btw). Avond/nacht: identiek. Dringende interventie: € 75 overdag, € 125 's avonds en 's nachts.",
      }}
    />
  );
}

/** Area page — emits a Service entity scoped to this specific city, plus
 *  re-emits the LocalBusiness with this city as primary areaServed. Helps
 *  Google associate the URL with the city for "slotenmaker {city}" queries. */
export function AreaJsonLd({
  areaName,
  areaPostalCode,
  slug,
}: {
  areaName: string;
  areaPostalCode: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
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
      }}
    />
  );
}
