import {
  pricingColumns,
  pricingRows,
  pricingNote,
  pricingDisclaimer,
} from "~/data/pricing";
import { OfferCard } from "./OfferCard";

type Props = {
  /** Show the offer card with the gratis-offerte CTA below the table */
  showOfferCard?: boolean;
};

export function TarievenSection({ showOfferCard = true }: Props) {
  // Group columns by their `group` label to render the spanning header
  const groups = pricingColumns.reduce<
    Array<{ group: string; count: number; times: string[] }>
  >((acc, col) => {
    const last = acc[acc.length - 1];
    if (last && last.group === col.group) {
      last.count += 1;
      last.times.push(col.time);
    } else {
      acc.push({ group: col.group, count: 1, times: [col.time] });
    }
    return acc;
  }, []);

  return (
    <section className="tarieven" id="tarieven">
      <div className="wrap">
        <div
          className="section-head"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <h2 className="h2">Transparante prijzen, geen verrassingen.</h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Forfaits voor depannage in Gent en randgemeenten. U ontvangt steeds een
              correcte factuur ter plaatse.
            </p>
          </div>
          <span className="tarif-tag">{pricingDisclaimer}</span>
        </div>

        <div className="tarif-scroll">
          <table className="tarif-table" aria-label="Tarieven depannages werkdagen">
            <colgroup>
              <col style={{ width: "40%" }} />
              {pricingColumns.map((_, i) => (
                <col key={i} />
              ))}
            </colgroup>
            <thead>
              <tr className="tarif-head-1">
                <th scope="col" />
                {groups.map((g) => (
                  <th key={g.group} scope="colgroup" colSpan={g.count}>
                    {g.group}
                  </th>
                ))}
              </tr>
              <tr className="tarif-head-2">
                <th scope="col">Interventie</th>
                {pricingColumns.map((c) => (
                  <th key={c.time} scope="col">{c.time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingRows.map((row) => (
                <tr key={row.label} className={row.emphasis ? "tarif-row-emph" : ""}>
                  <th scope="row">
                    {row.label}
                    {row.sublabel && (
                      <span className="tarif-row-sub">{row.sublabel}</span>
                    )}
                  </th>
                  {row.prices.map((price, i) => (
                    <td key={i}>€&nbsp;{price}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="tarif-note">{pricingNote}</p>

        {showOfferCard && <OfferCard />}
      </div>
    </section>
  );
}
