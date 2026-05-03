export type Area = {
  slug: string;
  /** Display name as it appears in headings, links, breadcrumbs */
  name: string;
  /** Possessive / locative form for natural sentences ("in {locative}") */
  locative: string;
  postalCode: string;
  /** Approximate driving time from Rooigemlaan 581 in minutes */
  drivingTime: number;
  /** Short subtitle for the area page hero (under H1) */
  intro: string;
  /** 2-3 paragraph body text — unique per area to avoid duplicate-content issues.
   *  Paragraphs separated by \n\n. */
  body: string;
  /** Confident-only neighborhood / subdistrict references — appear on the page */
  neighborhoods?: string[];
  /** Slugs of nearby areas — used to cross-link area pages */
  adjacent?: string[];
};

export const areas: Area[] = [
  {
    slug: "gent",
    name: "Gent",
    locative: "Gent",
    postalCode: "9000",
    drivingTime: 5,
    intro:
      "Snel ter plaatse in heel het centrum van Gent — Korenmarkt, Vrijdagmarkt, Sint-Pieters, Brugse Poort en alle aangrenzende wijken.",
    body:
      "Vanuit ons kantoor aan de Rooigemlaan zijn we doorgaans binnen vijf à tien minuten in om het even welke wijk van Gent. Of u nu woont in het hartje van de stad, in de buurt van de Vrijdagmarkt, of in een van de gordelwijken zoals Brugse Poort, Sluizeken-Tolhuis-Ham of Sint-Pieters-Aalst — onze slotenmakers staan vlot en discreet bij u aan de deur.\n\nGent kent veel oudere panden met traditionele meerpuntsloten en specifieke veiligheidscilinders. We hebben jarenlange ervaring met deze sloten en kunnen ze vakkundig openen, herstellen of vervangen. Voor nieuwbouw en gerenoveerde appartementen plaatsen we ook smart locks en moderne SKG-gecertificeerde cilinders.\n\nWoont u in een huurpand? Geen probleem — we leveren steeds een correcte factuur waarmee u uw kosten eenvoudig kan voorleggen aan eigenaar of syndicus.",
    neighborhoods: [
      "Centrum",
      "Brugse Poort",
      "Sluizeken-Tolhuis-Ham",
      "Sint-Pieters-Aalst",
      "Watersportbaan",
      "Macharius-Heirnis",
      "Muide-Meulestede",
    ],
    adjacent: ["sint-amandsberg", "ledeberg", "wondelgem", "mariakerke"],
  },
  {
    slug: "sint-amandsberg",
    name: "Sint-Amandsberg",
    locative: "Sint-Amandsberg",
    postalCode: "9040",
    drivingTime: 10,
    intro:
      "Erkend slotenmaker voor Sint-Amandsberg en omgeving Dampoort — meestal binnen 10 minuten ter plaatse.",
    body:
      "Sint-Amandsberg (postcode 9040) is een van de dichtstbevolkte deelgemeenten van Gent en grenst meteen aan het stadscentrum. Vanuit de Rooigemlaan zijn we hier vlot binnen tien minuten, ook tijdens de spits via de Dampoort.\n\nWe komen vaak aan de deur in de buurten rond Heirnis, het Oud Begijnhof en de wijken aan beide zijden van de Antwerpsesteenweg. Of u nu een dichtgeslagen voordeur hebt, een sleutel afgebroken in het slot, of u uw woning wilt beveiligen na een verhuis — onze slotenmakers helpen u vakkundig en zonder onnodige schade.\n\nVoor woningen in Sint-Amandsberg adviseren we vaak een SKG**-cilinder met anti-kerntrek bescherming, zeker bij voordeuren die uitkomen op straat. Voor een vrijblijvend advies of offerte op maat: bel ons of stuur een berichtje.",
    neighborhoods: ["Heirnis", "Oud Begijnhof", "Dampoort", "Sint-Bernadette"],
    adjacent: ["gent", "destelbergen", "gentbrugge"],
  },
  {
    slug: "gentbrugge",
    name: "Gentbrugge",
    locative: "Gentbrugge",
    postalCode: "9050",
    drivingTime: 12,
    intro:
      "Slotenmaker voor Gentbrugge en de wijken aan de Schelde — vlot ter plaatse vanuit Gent.",
    body:
      "Gentbrugge (postcode 9050) ligt in het zuidoosten van Gent, aan beide zijden van de Schelde. Via de Brusselsesteenweg en de E17 zijn we hier doorgaans binnen een twaalftal minuten.\n\nDe woningen in Gentbrugge zijn een mix van vooroorlogse rijhuizen en recentere appartementsblokken. Onze slotenmakers werken met alle gangbare slotsystemen — van eenvoudige profielcilinders tot meerpuntsvergrendeling op nieuwbouw. Voor inbraakbeveiliging adviseren we standaard een degelijke SKG-cilinder en versterkt veiligheidsbeslag.\n\nBent u na een inbraak met spoed een herstelling nodig? We zijn op werkdagen permanent bereikbaar en plaatsen vaak nog dezelfde dag een nieuw slot zodat uw woning meteen weer veilig is.",
    neighborhoods: ["Land van Rhode", "Moscou", "Vogelhoek"],
    adjacent: ["gent", "ledeberg", "merelbeke", "sint-amandsberg"],
  },
  {
    slug: "ledeberg",
    name: "Ledeberg",
    locative: "Ledeberg",
    postalCode: "9050",
    drivingTime: 10,
    intro:
      "Slotenmaker in Ledeberg — voor spoedopening, slotvervanging en beveiliging in de Hundelgemsesteenweg-buurt en omgeving.",
    body:
      "Ledeberg (postcode 9050) sluit direct aan op het zuidoosten van het Gentse stadscentrum, met de Hundelgemsesteenweg als belangrijkste verkeersader. Vanuit de Rooigemlaan zijn we hier vlot binnen een tiental minuten.\n\nIn de wijken rond het Ledebergplein en de Hundelgemsesteenweg krijgen we regelmatig oproepen voor spoedopeningen en slotvervangingen. We werken voorzichtig om schade aan deur of kozijn te vermijden, en geven u vooraf duidelijkheid over de prijs.\n\nVoor handelszaken op de Hundelgemsesteenweg of in de buurt verzorgen we ook beveiligingsadvies en plaatsing van inbraakwerend hang- en sluitwerk. Een vrijblijvende offerte op maat van uw zaak is gratis.",
    neighborhoods: ["Hundelgemsesteenweg", "Bellevuewijk"],
    adjacent: ["gent", "gentbrugge", "merelbeke"],
  },
  {
    slug: "wondelgem",
    name: "Wondelgem",
    locative: "Wondelgem",
    postalCode: "9032",
    drivingTime: 15,
    intro:
      "Slotenmaker voor Wondelgem en de noordelijke rand van Gent — meestal binnen 15 minuten aan uw deur.",
    body:
      "Wondelgem (postcode 9032) ligt aan de noordwestelijke rand van Gent. Vanuit de Rooigemlaan rijden we via de Drongensesteenweg of de Bevrijdingslaan, doorgaans binnen een kwartier ter plaatse.\n\nDe woningen in Wondelgem zijn vaak vrijstaand of half-open, met poorten en bijgebouwen die ook hun eigen sloten hebben. Onze slotenmakers werken niet alleen aan voordeuren, maar ook aan tuinpoorten, garagedeuren en kluizen. Voor industrie- en bedrijfspanden in de regio bieden we onderhoudscontracten aan.\n\nNa een verhuis raden we steevast aan om alle cilinders te vervangen — u weet immers niet wie er nog sleutels heeft. Een SKG-cilinderpakket plaatsen we gewoonlijk in een halve dag.",
    neighborhoods: ["Centrum Wondelgem", "Industrieweg-buurt"],
    adjacent: ["gent", "mariakerke"],
  },
  {
    slug: "drongen",
    name: "Drongen",
    locative: "Drongen",
    postalCode: "9031",
    drivingTime: 12,
    intro:
      "Slotenmaker in Drongen — voor woningen rond de Oude Abdij, het centrum en de Drongense Meersen.",
    body:
      "Drongen (postcode 9031) ligt ten westen van Gent. Vanuit de Rooigemlaan zijn we hier — afhankelijk van het verkeer — vlot binnen tien à vijftien minuten via de Deinsesteenweg.\n\nIn Drongen vinden we een mix van oudere woningen rond het historische centrum en de Oude Abdij, en moderne vrijstaande huizen in de groene wijken aan de rand. Onze slotenmakers zijn vertrouwd met beide types: van oude binnendeurslotjes tot moderne meerpuntsvergrendelingen en smart locks.\n\nWe verzorgen ook de complete beveiliging van uw woning: van inbraakwerende veiligheidscilinders tot raambeveiliging en smart locks die u op afstand kunt bedienen. Voor planmatige werken altijd een gratis offerte op maat.",
    neighborhoods: ["Centrum Drongen", "Drongense Meersen-buurt"],
    adjacent: ["gent", "mariakerke"],
  },
  {
    slug: "merelbeke",
    name: "Merelbeke",
    locative: "Merelbeke",
    postalCode: "9820",
    drivingTime: 15,
    intro:
      "Slotenmaker voor Merelbeke en deelgemeenten — vlot ter plaatse vanuit Gent.",
    body:
      "Merelbeke (postcode 9820) is een aparte gemeente net ten zuiden van Gent, met onder meer de deelgemeenten Bottelare, Lemberge, Munte en Schelderode. Vanuit de Rooigemlaan zijn we doorgaans binnen een kwartier ter plaatse.\n\nDe woningen in Merelbeke zijn voornamelijk eengezinswoningen met grotere percelen, wat ook betekent: meer deuren, poorten en bijgebouwen om te beveiligen. Onze slotenmakers werken aan voordeuren, achterdeuren, kelderdeuren, tuinpoorten en garages.\n\nNa een inbraakpoging zijn we vaak nog dezelfde werkdag ter plaatse om uw beveiliging meteen weer in orde te brengen. Voor een grondiger advies omtrent inbraakbeveiliging maken we vrijblijvend een offerte op maat.",
    neighborhoods: ["Centrum Merelbeke", "Bottelare", "Schelderode"],
    adjacent: ["gentbrugge", "ledeberg"],
  },
  {
    slug: "destelbergen",
    name: "Destelbergen",
    locative: "Destelbergen",
    postalCode: "9070",
    drivingTime: 18,
    intro:
      "Slotenmaker in Destelbergen en Heusden — uw lokale slotenmaker net buiten Gent.",
    body:
      "Destelbergen (postcode 9070) ligt direct ten oosten van Gent en omvat ook de deelgemeente Heusden. Via de Antwerpsesteenweg of de R4 zijn we hier doorgaans binnen vijftien à twintig minuten.\n\nDe gemeente kent een mix van rustige residentiële wijken en oudere centrum-bebouwing rond de kerken van Destelbergen en Heusden. Onze slotenmakers behandelen alle types woningen — van oude rijhuizen tot moderne villa's met smart-lock-systemen.\n\nDoor onze ligging in Gent zijn we ook bij dringende interventies steeds vlot ter plaatse. Voor planmatige werken zoals het volledig vervangen van uw cilinderpakket of het plaatsen van inbraakbeveiliging maken we gratis een offerte op maat.",
    neighborhoods: ["Centrum Destelbergen", "Heusden"],
    adjacent: ["sint-amandsberg", "gentbrugge"],
  },
  {
    slug: "mariakerke",
    name: "Mariakerke",
    locative: "Mariakerke",
    postalCode: "9030",
    drivingTime: 10,
    intro:
      "Slotenmaker voor Mariakerke en de westelijke rand van Gent — snel en vakkundig ter plaatse.",
    body:
      "Mariakerke (postcode 9030) is een deelgemeente aan de westelijke rand van Gent. Vanuit de Rooigemlaan zijn we hier op enkele minuten — Mariakerke ligt letterlijk om de hoek.\n\nDe woningen in Mariakerke zijn voornamelijk eengezinswoningen, een groot deel uit de jaren '60-'80, met traditionele profielcilinders. Onze slotenmakers werken hier dagelijks: spoedopeningen, slotvervanging, smart locks en versterkt hang- en sluitwerk.\n\nDoor onze nabijheid kunnen we vaak op zeer korte termijn ter plaatse zijn. Net buitengesloten? Bel ons even — meestal staan we binnen het kwartier voor uw deur.",
    neighborhoods: ["Centrum Mariakerke", "Wondelgemmeersen-buurt"],
    adjacent: ["gent", "wondelgem", "drongen"],
  },
];

/** Convenience: get an area by slug, or undefined if it doesn't exist. */
export function findArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
