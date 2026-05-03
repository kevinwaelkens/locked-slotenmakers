import { Link } from "@tanstack/react-router";
import { business } from "~/data/business";
import { GA_MEASUREMENT_ID, openCookiePreferences } from "~/lib/analytics";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link
              to="/"
              className="brand brand-foot"
              style={{ marginBottom: 20 }}
              aria-label="Locked Slotenmakers — home"
            >
              <img
                src="/logo.webp"
                alt="Locked Slotenmakers"
                width={600}
                height={257}
                loading="lazy"
                decoding="async"
                style={{ height: 44 }}
              />
            </Link>
            <p style={{ maxWidth: 340, color: "var(--color-ink-soft)", marginTop: 16 }}>
              Erkend slotenmaker in Gent. Lid van de Vlaamse Slotenmakersunie.
              We werken voorzichtig, vakkundig en met respect voor uw woning.
            </p>
          </div>

          <div>
            <h4>Kantoor</h4>
            <p>
              {business.legalName}<br />
              {business.address.street}<br />
              {business.address.postalCode} {business.address.city}
            </p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>
              <a href={`tel:${business.phoneRaw}`}>{business.phone}</a>
              <br />
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </p>
          </div>
        </div>

        <div className="foot-bottom">
          <span>BTW {business.vat}</span>
          <span>© {new Date().getFullYear()} {business.legalName}</span>
          <span>{business.membership}</span>
          {GA_MEASUREMENT_ID ? (
            <button
              type="button"
              className="foot-cookie-link"
              onClick={openCookiePreferences}
            >
              Cookievoorkeuren
            </button>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
