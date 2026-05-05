import { createFileRoute } from "@tanstack/react-router";
import { TarievenSection } from "~/components/TarievenSection";
import { Contact } from "~/components/Contact";
import {
  breadcrumbJsonLdData,
  pricingJsonLdData,
} from "~/lib/jsonld";

const SITE_URL = "https://locked-slotenmakers.be";

const TITLE =
  "Tarieven slotenmaker Gent | Locked Slotenmakers — transparante prijzen";
const DESCRIPTION =
  "Volledige prijslijst voor depannage in Gent en randgemeenten. Forfait eerste uur vanaf € 75 op werkdagen. Gratis offerte voor geplande werken.";
const CANONICAL = `${SITE_URL}/tarieven`;

export const Route = createFileRoute("/tarieven")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(pricingJsonLdData()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLdData([
            { name: "Home", path: "/" },
            { name: "Tarieven", path: "/tarieven" },
          ]),
        ),
      },
    ],
  }),
  component: TarievenPage,
});

function TarievenPage() {
  return (
    <>
      <TarievenSection showOfferCard={true} />
      <Contact />
    </>
  );
}
