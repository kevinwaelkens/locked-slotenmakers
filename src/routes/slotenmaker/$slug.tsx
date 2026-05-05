import { createFileRoute, notFound } from "@tanstack/react-router";
import { findArea } from "~/data/areas";
import { AreaHero } from "~/components/AreaHero";
import { AreaIntroBody } from "~/components/AreaIntroBody";
import { AreaCoverage } from "~/components/AreaCoverage";
import { Services } from "~/components/Services";
import { TarievenSection } from "~/components/TarievenSection";
import { FAQ } from "~/components/FAQ";
import { Contact } from "~/components/Contact";
import {
  areaJsonLdData,
  breadcrumbJsonLdData,
  faqJsonLdData,
  servicesJsonLdData,
} from "~/lib/jsonld";

const SITE_URL = "https://locked-slotenmakers.be";

export const Route = createFileRoute("/slotenmaker/$slug")({
  loader: ({ params }) => {
    const area = findArea(params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData, params }) => {
    const area = loaderData?.area ?? findArea(params.slug);
    if (!area) return {};
    const title = `Slotenmaker ${area.name} | Locked Slotenmakers — spoedopening, slotvervanging`;
    const description = `Erkend slotenmaker in ${area.name} (${area.postalCode}). Spoedopeningen, slotvervanging en inbraakbeveiliging — meestal binnen ~${area.drivingTime} minuten ter plaatse vanuit Gent.`;
    const canonical = `${SITE_URL}/slotenmaker/${area.slug}/`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            areaJsonLdData({
              areaName: area.name,
              areaPostalCode: area.postalCode,
              slug: area.slug,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLdData([
              { name: "Home", path: "/" },
              { name: "Slotenmaker", path: "/slotenmaker/" },
              { name: area.name, path: `/slotenmaker/${area.slug}/` },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLdData()),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(servicesJsonLdData()),
        },
      ],
    };
  },
  component: AreaPage,
});

function AreaPage() {
  const { area } = Route.useLoaderData();

  return (
    <>
      <AreaHero area={area} />
      <AreaIntroBody area={area} />
      <Services />
      <AreaCoverage area={area} />
      <TarievenSection showOfferCard={true} />
      <FAQ />
      <Contact />
    </>
  );
}
