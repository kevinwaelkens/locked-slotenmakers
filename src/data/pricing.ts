export type PricingRow = {
  label: string;
  sublabel?: string;
  /** prices in EUR, indexed by column slot */
  prices: number[];
  emphasis?: boolean;
};

export const pricingColumns = [
  { group: "Werkdagen", time: "08:30 – 17:00" },
  { group: "Werkdagen", time: "17:00 – 08:30" },
] as const;

export const pricingRows: PricingRow[] = [
  {
    label: "Forfait eerste uur",
    prices: [75, 75],
  },
  {
    label: "Per extra 15 min",
    prices: [15, 15],
  },
  {
    label: "Dringende interventie",
    sublabel: "incl. eerste 30 min",
    prices: [75, 125],
    emphasis: true,
  },
];

export const pricingNote =
  "In het weekend en op feestdagen zijn we niet beschikbaar voor depannages.";
export const pricingDisclaimer = "Alle prijzen excl. btw";
