export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: "open" | "place" | "damage" | "smart" | "secure" | "window";
};

export const services: Service[] = [
  {
    slug: "spoedopening",
    title: "Slot openen",
    description:
      "Afgebroken sleutel of buitengesloten? Onze slotenmakers openen deuren, poorten en kluizen met expertise en voorzicht.",
    icon: "open",
  },
  {
    slug: "slotvervanging",
    title: "Sloten plaatsen",
    description:
      "Beveiliging van deuren, ramen en poorten met hoogwaardige veiligheidscilinders en smart locks. Vrijblijvend offerte.",
    icon: "place",
  },
  {
    slug: "inbraakschade",
    title: "Inbraakschade herstellen",
    description:
      "Is uw slot beschadigd na een geforceerde opening? We herstellen of vervangen het slot met spoed, vaak nog dezelfde dag.",
    icon: "damage",
  },
  {
    slug: "smart-lock",
    title: "Elektrische sloten",
    description:
      "Smart locks installeren in uw deur? We hebben de kennis en het vakmanschap om ze veilig en correct te plaatsen.",
    icon: "smart",
  },
  {
    slug: "inbraakbeveiliging",
    title: "Inbraakbeveiliging",
    description:
      "We beveiligen deuren en poorten van uw huis met veiligheidscilinders en extra inbraakwerend veiligheidsbeslag.",
    icon: "secure",
  },
  {
    slug: "raambeveiliging",
    title: "Raambeveiliging",
    description:
      "Hoogwaardige beveiliging op uw ramen zodat inbrekers ook daar geen kansen krijgen — discreet en effectief.",
    icon: "window",
  },
];
