import { business } from "~/data/business";
import { PhoneIcon, CheckIcon } from "./icons";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div className="kicker">Erkend slotenmaker · Gent &amp; randgemeenten</div>
        <h1 className="h1">
          Slotenmaker<br />
          in Gent, <em>snel</em> ter plaatse.
        </h1>
        <p className="hero-sub">
          Buitengesloten? Slot kapot? Olivier en zijn team komen op zeer korte tijd langs —
          voorzichtig, vakkundig, met transparante prijzen.
        </p>
        <div className="hero-actions">
          <a href={`tel:${business.phoneRaw}`} className="btn-call" id="hero-call">
            <span className="ic"><PhoneIcon /></span>
            <span>Bel nu — <span className="num">{business.phone}</span></span>
          </a>
          <a href="#diensten" className="btn-ghost">Bekijk diensten</a>
        </div>
        <div className="hero-meta">
          <div>
            <span className="check"><CheckIcon /></span>
            <span>Officieel erkend lid Vlaamse Slotenmakersunie</span>
          </div>
          <div>
            <span className="check"><CheckIcon /></span>
            <span>Transparante prijzen</span>
          </div>
        </div>
      </div>
    </section>
  );
}
