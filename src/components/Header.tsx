import { Link } from "@tanstack/react-router";
import { business } from "~/data/business";

export function Header() {
  return (
    <header className="top">
      <div className="wrap top-inner">
        <Link to="/" className="brand" aria-label="Locked Slotenmakers — home">
          <img
            src="/logo.webp"
            alt="Locked Slotenmakers"
            width={600}
            height={257}
            fetchPriority="high"
            decoding="async"
          />
        </Link>

        <nav className="primary" aria-label="Hoofdnavigatie">
          <Link to="/" hash="diensten">Diensten</Link>
          <Link to="/" hash="werkgebied">Werkgebied</Link>
          <Link to="/tarieven">Tarieven</Link>
          <Link to="/" hash="faq">FAQ</Link>
          <Link to="/" hash="contact">Contact</Link>
        </nav>

        <a
          href={`tel:${business.phoneRaw}`}
          className="top-call"
          aria-label={`Bel ${business.phone}`}
        >
          <span className="dot" aria-hidden="true" />
          <span>{business.phone}</span>
        </a>
      </div>
    </header>
  );
}
