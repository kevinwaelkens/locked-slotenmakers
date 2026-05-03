import type { Area } from "~/data/areas";

export function AreaIntroBody({ area }: { area: Area }) {
  const paragraphs = area.body.split("\n\n");

  return (
    <section className="intro">
      <div className="wrap intro-inner">
        <h2 className="h2">
          Dringend een slotenmaker in {area.name}?
        </h2>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ marginTop: i === 0 ? 24 : 16 }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
