import { Link } from "@tanstack/react-router";
import type { Area } from "~/data/areas";
import { findArea } from "~/data/areas";

type Props = { area: Area };

export function AreaCoverage({ area }: Props) {
  const adjacent =
    area.adjacent
      ?.map((slug) => findArea(slug))
      .filter((a): a is Area => Boolean(a)) ?? [];

  return (
    <section className="area" id="werkgebied">
      <div className="wrap">
        <div className="section-head" style={{ marginBottom: 40 }}>
          <h2 className="h2">Wij komen langs in deze {area.name}-buurten.</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Vanuit ons kantoor aan de Rooigemlaan staan we doorgaans binnen{" "}
            ~{area.drivingTime} minuten voor uw deur.
          </p>
        </div>

        {area.neighborhoods && area.neighborhoods.length > 0 && (
          <ul aria-label={`Buurten in ${area.name}`}>
            {area.neighborhoods.map((n) => (
              <li key={n}>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        )}

        {adjacent.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h3
              style={{
                fontSize: 13,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-ink-soft)",
                fontWeight: 600,
                margin: "0 0 16px",
              }}
            >
              Ook aangrenzende gemeenten
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {adjacent.map((a) => (
                <Link
                  key={a.slug}
                  to="/slotenmaker/$slug"
                  params={{ slug: a.slug }}
                  className="adjacent-pill"
                >
                  Slotenmaker {a.name}
                  <span aria-hidden="true" style={{ marginLeft: 8 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
