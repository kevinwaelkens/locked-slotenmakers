import { ArrowRightIcon } from "./icons";

export function OfferCard() {
  return (
    <aside className="offer-card" aria-label="Gratis offerte">
      <div className="offer-card-text">
        <h3 className="offer-card-title">
          Geen depannage maar geplande werken?
          <br />
          <em>Gratis offerte op maat.</em>
        </h3>
        <p>
          Voor slotvervanging, inbraakbeveiliging, smart lock-installaties of raambeveiliging
          maken wij vrijblijvend en gratis een offerte op maat van uw woning of kantoor.
        </p>
      </div>
      <div className="offer-card-actions">
        <a href="#contact" className="btn-call on-light-cta">
          <span>Vraag uw offerte</span>
          <ArrowRightIcon size={14} />
        </a>
      </div>
    </aside>
  );
}
