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
  AreaJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServicesJsonLd,
} from "~/lib/jsonld";
import { useDocumentHead } from "~/lib/seo";

export const Route = createFileRoute("/slotenmaker/$slug")({
  loader: ({ params }) => {
    const area = findArea(params.slug);
    if (!area) throw notFound();
    return { area };
  },
  component: AreaPage,
});

function AreaPage() {
  const { area } = Route.useLoaderData();

  useDocumentHead({
    title: `Slotenmaker ${area.name} | Locked Slotenmakers — spoedopening, slotvervanging`,
    description: `Erkend slotenmaker in ${area.name} (${area.postalCode}). Spoedopeningen, slotvervanging en inbraakbeveiliging — meestal binnen ~${area.drivingTime} minuten ter plaatse vanuit Gent.`,
    path: `/slotenmaker/${area.slug}`,
  });

  return (
    <>
      <AreaJsonLd
        areaName={area.name}
        areaPostalCode={area.postalCode}
        slug={area.slug}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Slotenmaker", path: "/slotenmaker" },
          { name: area.name, path: `/slotenmaker/${area.slug}` },
        ]}
      />
      <FaqJsonLd />
      <ServicesJsonLd />

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
