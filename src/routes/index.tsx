import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "~/components/Hero";
import { Brands } from "~/components/Brands";
import { Intro } from "~/components/Intro";
import { Services } from "~/components/Services";
import { Area } from "~/components/Area";
import { FAQ } from "~/components/FAQ";
import { TarievenSection } from "~/components/TarievenSection";
import { Contact } from "~/components/Contact";
import {
  faqJsonLdData,
  servicesJsonLdData,
  breadcrumbJsonLdData,
} from "~/lib/jsonld";

const SITE_URL = "https://locked-slotenmakers.be";

const TITLE =
  "Slotenmaker Gent | Locked Slotenmakers · spoedopeningen, slotvervanging & inbraakbeveiliging";
const DESCRIPTION =
  "Erkend slotenmaker in Gent. Spoedopening, slotvervanging, smart locks en inbraakbeveiliging in Gent en randgemeenten. Lid Vlaamse Slotenmakersunie. Bel 0497 81 58 50.";
const CANONICAL = `${SITE_URL}/`;

export const Route = createFileRoute("/")({
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
      { type: "application/ld+json", children: JSON.stringify(faqJsonLdData()) },
      {
        type: "application/ld+json",
        children: JSON.stringify(servicesJsonLdData()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLdData([{ name: "Home", path: "/" }]),
        ),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <Intro />
      <Services />
      <Area />
      <FAQ />
      <TarievenSection />
      <Contact />
    </>
  );
}
