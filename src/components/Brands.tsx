type Brand = {
  slug: string;
  name: string;
  url: string;
  title: string;
  /** intrinsic dimensions of the asset for CLS prevention */
  width: number;
  height: number;
};

const brands: Brand[] = [
  {
    slug: "iseo",
    name: "ISEO",
    url: "https://www.iseo.com/",
    title: "ISEO — Italiaanse fabrikant van veiligheidssloten",
    width: 243,
    height: 96,
  },
  {
    slug: "yale",
    name: "Yale",
    url: "https://www.yalehome.com/",
    title: "Yale — sloten en smart locks",
    width: 96,
    height: 96,
  },
  {
    slug: "abus",
    name: "ABUS",
    url: "https://www.abus.com/",
    title: "ABUS — Duitse beveiligingsspecialist",
    width: 232,
    height: 96,
  },
  {
    slug: "litto",
    name: "LITTO",
    url: "https://www.litto.be/",
    title: "LITTO — Belgisch hang- en sluitwerk",
    width: 120,
    height: 96,
  },
  {
    slug: "evva",
    name: "EVVA",
    url: "https://www.evva.com/",
    title: "EVVA — Oostenrijkse sluitsystemen",
    width: 96,
    height: 96,
  },
];

export function Brands() {
  return (
    <section className="brands" aria-label="Sloten merken die wij plaatsen">
      <div className="wrap brands-inner">
        <p className="brands-label">
          Wij plaatsen nieuwe sloten van de hoogste kwaliteit — uitsluitend van
        </p>
        <ul className="brands-list">
          {brands.map((b) => (
            <li key={b.slug}>
              <a
                href={b.url}
                target="_blank"
                rel="noopener external"
                title={b.title}
              >
                <img
                  className="brand-logo"
                  src={`/brands/${b.slug}.webp`}
                  alt={`${b.name} logo`}
                  width={b.width}
                  height={b.height}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
