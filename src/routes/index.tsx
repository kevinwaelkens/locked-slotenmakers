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
  FaqJsonLd,
  ServicesJsonLd,
  BreadcrumbJsonLd,
} from "~/lib/jsonld";
import { useDocumentHead } from "~/lib/seo";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  useDocumentHead({
    title:
      "Slotenmaker Gent | Locked Slotenmakers · spoedopeningen, slotvervanging & inbraakbeveiliging",
    description:
      "Erkend slotenmaker in Gent. Spoedopening, slotvervanging, smart locks en inbraakbeveiliging in Gent en randgemeenten. Lid Vlaamse Slotenmakersunie. Bel 0497 81 58 50.",
    path: "/",
  });

  return (
    <>
      {/* Route-specific structured data — these scripts get added to the DOM
          and stay accessible to crawlers that execute JS. */}
      <FaqJsonLd />
      <ServicesJsonLd />
      <BreadcrumbJsonLd trail={[{ name: "Home", path: "/" }]} />

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
