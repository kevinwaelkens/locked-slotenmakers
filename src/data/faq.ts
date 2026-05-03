export type FaqEntry = {
  question: string;
  answer: string;
  /** Optional rich body using a tiny subset of Markdown-style links: [text](url) */
  answerHtml?: string;
};

export const faq: FaqEntry[] = [
  {
    question: "Wat doet een slotenmaker als ik buitengesloten ben?",
    answer:
      "Onze slotenmaker komt vliegensvlug ter plaatse in Gent en randgemeenten, opent uw deur voorzichtig — meestal zonder schade aan slot of deur — en herstelt of vervangt het slot enkel als dat strikt nodig is. U bent meestal binnen het uur opnieuw binnen.",
  },
  {
    question: "Wat kost een spoedopening in Gent?",
    answer:
      "Op werkdagen tussen 08:30 en 17:00 betaalt u € 60 forfait voor het eerste uur (excl. btw). 's Avonds en 's nachts gelden hogere tarieven. De volledige prijslijst staat op onze tarievenpagina.",
    answerHtml:
      "Op werkdagen tussen 08:30 en 17:00 betaalt u € 60 forfait voor het eerste uur (excl. btw). 's Avonds en 's nachts gelden hogere tarieven. De volledige prijslijst staat [hier](#tarieven).",
  },
  {
    question: "Krijg ik een gratis offerte voor slotvervanging of beveiliging?",
    answer:
      "Ja. Voor geplande werken zoals slotvervanging, inbraakbeveiliging en smart lock-installaties maken we vrijblijvend en gratis een offerte op maat van uw woning of kantoor.",
    answerHtml:
      "Ja. Voor geplande werken zoals slotvervanging, inbraakbeveiliging en smart lock-installaties maken we vrijblijvend en **gratis** een offerte op maat van uw woning of kantoor. [Vraag uw offerte aan](#contact).",
  },
  {
    question: "Welke merken sloten plaatsen jullie?",
    answer:
      "We werken uitsluitend met hoogwaardige merken: ISEO, Yale, ABUS, LITTO en EVVA — voor zowel mechanische veiligheidscilinders als smart locks. We adviseren u graag welk slot het beste past bij uw deur en gebruik.",
    answerHtml:
      "We werken uitsluitend met hoogwaardige merken: **ISEO, Yale, ABUS, LITTO** en **EVVA** — voor zowel mechanische veiligheidscilinders als smart locks. We adviseren u graag welk slot het beste past bij uw deur en gebruik.",
  },
  {
    question: "Werken jullie ook 's avonds en 's nachts?",
    answer:
      "Op werkdagen zijn we permanent bereikbaar — ook 's avonds en 's nachts. In het weekend en op feestdagen zijn we niet beschikbaar voor depannages.",
  },
  {
    question: "In welke gemeenten zijn jullie actief?",
    answer:
      "We bedienen volledig Gent en de aangrenzende deelgemeenten: Sint-Amandsberg, Gentbrugge, Ledeberg, Wondelgem, Drongen, Merelbeke, Destelbergen en Mariakerke. Twijfelt u of we bij u langskomen? Bel even.",
    answerHtml:
      "We bedienen volledig Gent en de aangrenzende deelgemeenten: Sint-Amandsberg, Gentbrugge, Ledeberg, Wondelgem, Drongen, Merelbeke, Destelbergen en Mariakerke. Twijfelt u of we bij u langskomen? [Bel even](tel:+32497815850).",
  },
];
