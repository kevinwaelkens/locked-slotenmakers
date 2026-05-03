import { faq } from "~/data/faq";
import type { ReactNode } from "react";

/** Tiny parser: turns [text](url) and **bold** into ReactNode array. */
function renderRich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let cursor = 0;
  // Combined regex: matches either [text](url) or **bold**
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > cursor) out.push(text.slice(cursor, m.index));
    if (m[1] && m[2]) {
      out.push(
        <a key={key++} href={m[2]}>
          {m[1]}
        </a>,
      );
    } else if (m[3]) {
      out.push(<strong key={key++}>{m[3]}</strong>);
    }
    cursor = m.index + m[0].length;
  }
  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

export function FAQ() {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="section-head" style={{ marginBottom: 48 }}>
          <h2 className="h2">Veelgestelde vragen.</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            De vragen die we het vaakst krijgen, kort en duidelijk beantwoord.
          </p>
        </div>

        <div className="faq-list">
          {faq.map((entry, i) => (
            <details key={entry.question} className="faq-item" open={i === 0}>
              <summary>
                <span>{entry.question}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <div className="faq-body">
                <p>{renderRich(entry.answerHtml ?? entry.answer)}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
