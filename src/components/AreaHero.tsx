import type { Area } from "~/data/areas";
import { business } from "~/data/business";
import { PhoneIcon, CheckIcon } from "./icons";

export function AreaHero({ area }: { area: Area }) {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div className="kicker">
          Slotenmaker · meestal binnen ~{area.drivingTime} min ter plaatse
        </div>
        <h1 className="h1">
          Slotenmaker in <em>{area.name}</em>.
        </h1>
        <p className="hero-sub">{area.intro}</p>

        <div className="hero-actions">
          <a href={`tel:${business.phoneRaw}`} className="btn-call" id="hero-call">
            <span className="ic">
              <PhoneIcon />
            </span>
            <span>
              Bel nu — <span className="num">{business.phone}</span>
            </span>
          </a>
          <a href="#diensten" className="btn-ghost">
            Bekijk diensten
          </a>
        </div>

        <div className="hero-meta">
          <div>
            <span className="check">
              <CheckIcon />
            </span>
            <span>Erkend lid Vlaamse Slotenmakersunie</span>
          </div>
          <div>
            <span className="check">
              <CheckIcon />
            </span>
            <span>Postcode {area.postalCode} · transparante prijzen</span>
          </div>
        </div>
      </div>
    </section>
  );
}
