import { Link } from "@tanstack/react-router";
import { areas } from "~/data/areas";

export function Area() {
  return (
    <section className="area" id="werkgebied">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">De slotenmaker voor Gent en omstreken.</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Wanneer u in nood bent, is één van onze medewerkers snel bij u ter plekke.
            Klik op uw gemeente voor lokale info en indicatieve aanrijtijd.
          </p>
        </div>
        <ul aria-label="Bedeelde gemeenten">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link
                to="/slotenmaker/$slug"
                params={{ slug: a.slug }}
                className="area-link"
              >
                <span>{a.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
