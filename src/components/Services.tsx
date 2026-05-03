import { services } from "~/data/services";
import { ServiceIcon } from "./icons";

export function Services() {
  return (
    <section className="services" id="diensten">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">Onze diensten als slotenmaker in Gent.</h2>
        </div>
        <div className="svc-grid">
          {services.map((s) => (
            <article key={s.slug} className="svc">
              <div className="svc-icon">
                <ServiceIcon type={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
