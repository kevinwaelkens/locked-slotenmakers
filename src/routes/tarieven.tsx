import { createFileRoute } from "@tanstack/react-router";
import { TarievenSection } from "~/components/TarievenSection";
import { Contact } from "~/components/Contact";
import {
  BreadcrumbJsonLd,
  PricingJsonLd,
} from "~/lib/jsonld";
import { useDocumentHead } from "~/lib/seo";

export const Route = createFileRoute("/tarieven")({
  component: TarievenPage,
});

function TarievenPage() {
  useDocumentHead({
    title:
      "Tarieven slotenmaker Gent | Locked Slotenmakers — transparante prijzen",
    description:
      "Volledige prijslijst voor depannage in Gent en randgemeenten. Forfait eerste uur vanaf € 60 op werkdagen. Gratis offerte voor geplande werken.",
    path: "/tarieven",
  });

  return (
    <>
      <PricingJsonLd />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Tarieven", path: "/tarieven" },
        ]}
      />

      <TarievenSection showOfferCard={true} />
      <Contact />
    </>
  );
}
