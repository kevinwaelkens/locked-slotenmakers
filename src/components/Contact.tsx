import { useState } from "react";
import { business } from "~/data/business";
import { PhoneIcon, ArrowRightIcon } from "./icons";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      website: String(fd.get("website") ?? ""),
    };

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus({ kind: "ok" });
        form.reset();
        return;
      }

      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setStatus({
        kind: "error",
        message:
          data?.error ??
          "Verzenden mislukt. Probeer opnieuw of bel ons rechtstreeks.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Geen verbinding. Controleer uw internetverbinding of bel ons rechtstreeks.",
      });
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <div>
          <div className="kicker">Contact</div>
          <h2 className="h2">
            Buitengesloten?
            <br />
            <em>Bel direct.</em>
          </h2>
          <p className="lead" style={{ marginTop: 24 }}>
            In nood? Pak de telefoon — we zijn meestal binnen het uur ter plaatse.
            Geen spoed? Vul gerust het formulier in voor een offerte of vraag.
          </p>

          <a
            href={`tel:${business.phoneRaw}`}
            className="btn-call"
            style={{ marginTop: 32 }}
            aria-label={`Bel ${business.phone}`}
          >
            <span className="ic"><PhoneIcon /></span>
            <span><span className="num">{business.phone}</span></span>
          </a>

          <ul className="contact-meta">
            <li>
              <span className="meta-key">Mail</span>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </li>
            <li>
              <span className="meta-key">Kantoor</span>
              <span>
                {business.address.street} · {business.address.postalCode}{" "}
                {business.address.city}
              </span>
            </li>
            <li>
              <span className="meta-key">BTW</span>
              <span>{business.vat}</span>
            </li>
          </ul>
        </div>

        <form
          className="contact-form"
          aria-label="Contactformulier"
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="form-title">Stuur een bericht</h3>

          {/* Honeypot — visually hidden, real users never fill this */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              top: 0,
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <label>
              Laat dit leeg
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <label>
            <span>Naam</span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="Voornaam Achternaam"
              disabled={status.kind === "submitting"}
            />
          </label>
          <label>
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="naam@voorbeeld.be"
              disabled={status.kind === "submitting"}
            />
          </label>
          <label>
            <span>Telefoonnummer</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="04xx xx xx xx"
              disabled={status.kind === "submitting"}
            />
          </label>
          <label>
            <span>Waar kunnen we u mee helpen?</span>
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Korte beschrijving van uw vraag of probleem"
              disabled={status.kind === "submitting"}
            />
          </label>

          <button type="submit" disabled={status.kind === "submitting"}>
            <span>
              {status.kind === "submitting" ? "Verzenden…" : "Verzenden"}
            </span>
            <ArrowRightIcon size={14} />
          </button>

          {status.kind === "ok" && (
            <p className="form-msg" role="status">
              Bedankt voor uw bericht — we nemen zo snel mogelijk contact op.
            </p>
          )}

          {status.kind === "error" && (
            <p className="form-msg form-msg-error" role="alert">
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
