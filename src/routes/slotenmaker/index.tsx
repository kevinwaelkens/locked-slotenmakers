import { createFileRoute, Link } from "@tanstack/react-router";
import { areas } from "~/data/areas";
import { Contact } from "~/components/Contact";
import { breadcrumbJsonLdData } from "~/lib/jsonld";

const SITE_URL = "https://locked-slotenmakers.be";

const TITLE =
  "Slotenmaker in Gent en omstreken | Locked Slotenmakers — kies uw gemeente";
const DESCRIPTION =
  "Erkend slotenmaker in Gent, Sint-Amandsberg, Gentbrugge, Ledeberg, Wondelgem, Drongen, Merelbeke, Destelbergen en Mariakerke. Vind uw gemeente en bel direct.";
const CANONICAL = `${SITE_URL}/slotenmaker`;

export const Route = createFileRoute("/slotenmaker/")({
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
        children: JSON.stringify(
          breadcrumbJsonLdData([
            { name: "Home", path: "/" },
            { name: "Slotenmaker", path: "/slotenmaker" },
          ]),
        ),
      },
    ],
  }),
  component: SlotenmakerOverview,
});

function SlotenmakerOverview() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="kicker">Werkgebied</div>
          <h1 className="h1">
            Slotenmaker voor <em>Gent</em>
            <br />
            en omstreken.
          </h1>
          <p className="hero-sub">
            Selecteer uw gemeente voor lokale informatie, indicatieve aanrijtijd
            en de meest voorkomende interventies in uw buurt.
          </p>
        </div>
      </section>

      <section className="services">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 48 }}>
            <h2 className="h2">Kies uw gemeente.</h2>
          </div>
          <div className="svc-grid">
            {areas.map((a) => (
              <Link
                key={a.slug}
                to="/slotenmaker/$slug"
                params={{ slug: a.slug }}
                className="svc"
                style={{ textDecoration: "none" }}
              >
                <h3>Slotenmaker {a.name}</h3>
                <p
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {a.postalCode} · ~{a.drivingTime} min ter plaatse
                </p>
                <p>{a.intro}</p>
                <span
                  style={{
                    marginTop: "auto",
                    color: "var(--color-brand)",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Bekijk pagina →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
