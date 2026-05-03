# Locked Slotenmakers

Marketing website voor [Locked Slotenmakers BV](https://locked-slotenmakers.be) — erkend slotenmaker in Gent.

Stack: **Vite v8** · **React 19** · **TanStack Router** (file-based) · **Tailwind v4** · **TypeScript strict** · **Resend** voor formulier-mails · gehost op **Vercel**.

## Lokaal draaien

```bash
bun install
cp .env.example .env  # vul RESEND_API_KEY in
bun dev
```

Open <http://localhost:5173>. HMR + TanStack Router devtools onderaan.

```bash
bun run build       # productie build naar dist/
bun run preview     # bekijk de build lokaal
bun run typecheck   # tsc --noEmit
```

## Deploy naar Vercel

```bash
bunx vercel --prod
```

Of via vercel.com → Import Git Repository → kies dit repo. Settings worden automatisch overgenomen uit `vercel.json`.

**Env vars op Vercel** (Settings → Environment Variables):

| Naam | Waarde | Scope |
|---|---|---|
| `RESEND_API_KEY` | Je Resend API key | Production, Preview, Development |

**Custom domein** koppelen:
1. Vercel project → Settings → Domains → `locked-slotenmakers.be`
2. Bij Combell DNS → `A` record naar Vercel's IP, of (beter) verhuis nameservers naar Cloudflare en wijs daar het domein door

## Resend — contactformulier

Het contactformulier post naar `/api/contact` (een Vercel Edge Function) die via Resend een mail stuurt naar `info@locked-slotenmakers.be`.

**Setup in 3 stappen:**

1. **Domein toevoegen op Resend** ([resend.com/domains](https://resend.com/domains))
   - Add `locked-slotenmakers.be`
   - Voeg de SPF + DKIM TXT records toe in Combell of Cloudflare DNS
   - Wacht op verificatie (meestal binnen 30 min)

2. **API key aanmaken** ([resend.com/api-keys](https://resend.com/api-keys))
   - Create API Key, naam: `Locked website production`
   - Permission: Send emails, Full access (of beperkt tot 1 domein)
   - Kopieer de `re_xxxxx` key

3. **Key in Vercel zetten**
   - Vercel project → Settings → Environment Variables
   - Naam `RESEND_API_KEY`, value de key, scope alle environments
   - Redeploy

**Het from-adres** is `noreply@locked-slotenmakers.be` (zie `api/contact.ts`). Wijzigen kan in dat bestand. **Reply-to** wordt automatisch op het ingevulde e-mailadres gezet, dus Olivier kan rechtstreeks antwoorden vanuit zijn mailbox.

**Spam protection**: het formulier heeft een verborgen honeypot field (`website`). Bots vullen het in, mensen zien het nooit. Server-side rejecten we het submit silently als het ingevuld is.

## Per-gemeente landing pages

Voor lokale SEO is er één pagina per bediende gemeente, op `/slotenmaker/{slug}`:

- `/slotenmaker/gent`
- `/slotenmaker/sint-amandsberg`
- `/slotenmaker/gentbrugge`
- `/slotenmaker/ledeberg`
- `/slotenmaker/wondelgem`
- `/slotenmaker/drongen`
- `/slotenmaker/merelbeke`
- `/slotenmaker/destelbergen`
- `/slotenmaker/mariakerke`

Plus een hub pagina op `/slotenmaker` die alle gemeenten lijst.

**Eén dynamische route** (`src/routes/slotenmaker/$slug.tsx`) genereert alle 9 pagina's vanuit de data in `src/data/areas.ts`. Elke pagina heeft:

- Unieke title + meta-description met de gemeentenaam
- H1 met de gemeentenaam
- 200-300 woorden lokale content (`body` in de data)
- Lijst met buurten / wijken (`neighborhoods`)
- Cross-links naar aangrenzende gemeenten (`adjacent`)
- Eigen JSON-LD `Service` schema scoped aan deze stad
- BreadcrumbList Home → Slotenmaker → Gemeente

**Content aanpassen**: open `src/data/areas.ts` en bewerk de `intro`, `body`, `neighborhoods` of `adjacent` velden per gemeente. De pagina werkt automatisch bij. Voor extra hyperlocaal effect mag je in de `body` straatnamen of buurthuizen toevoegen die Olivier kent uit ervaring.

**Een nieuwe gemeente toevoegen?**
1. Append een nieuw entry in `src/data/areas.ts`
2. Voeg de URL toe aan `public/sitemap.xml`
3. Eventueel toevoegen aan `adjacent` arrays van naburige entries

## Project structuur

```
api/
└── contact.ts          Vercel Edge Function: Resend mail-relay

src/
├── components/         Presentation only — geen data fetching
│   ├── Header.tsx
│   ├── Hero.tsx        Homepage hero
│   ├── AreaHero.tsx    Per-gemeente hero
│   ├── AreaIntroBody.tsx
│   ├── AreaCoverage.tsx
│   ├── Brands.tsx
│   ├── Intro.tsx
│   ├── Services.tsx
│   ├── Area.tsx        Homepage gemeentenlijst (links naar /slotenmaker/$slug)
│   ├── FAQ.tsx
│   ├── TarievenSection.tsx
│   ├── OfferCard.tsx
│   ├── Contact.tsx     Wired aan /api/contact via fetch
│   ├── Footer.tsx
│   ├── MobileCallPill.tsx
│   └── icons.tsx
├── data/               Single source of truth
│   ├── business.ts
│   ├── services.ts
│   ├── areas.ts        9 gemeenten met rijke per-area content
│   ├── faq.ts
│   └── pricing.ts
├── lib/
│   ├── seo.ts          useDocumentHead — update meta tags per route
│   └── jsonld.tsx      Faq, Services, Breadcrumb, Pricing, Area JSON-LD
├── routes/
│   ├── __root.tsx              Root layout
│   ├── index.tsx               /
│   ├── tarieven.tsx            /tarieven
│   └── slotenmaker/
│       ├── index.tsx           /slotenmaker (hub)
│       └── $slug.tsx           /slotenmaker/{gemeente}
├── styles/
│   └── app.css
└── main.tsx
```

## SEO — wat er al inzit

- **`index.html`** heeft alle SEO-fundamenten gehard-codeerd voor de homepage:
  - Title + description + keywords + canonical + hreflang
  - Open Graph + Twitter Card
  - Geo-meta tags voor Gent
  - JSON-LD `Locksmith` + `LocalBusiness` + `EmergencyService`
  - JSON-LD `WebSite` voor sitelinks-searchbox
- **Per route** voegt `useDocumentHead` + JSON-LD componenten dynamisch toe:
  - `/` → FAQPage + Service[] + BreadcrumbList
  - `/tarieven` → BreadcrumbList + PriceSpecification
  - `/slotenmaker` → BreadcrumbList
  - `/slotenmaker/$slug` → Service (per stad) + FAQPage + Service[] + BreadcrumbList
- **`robots.txt`** + **`sitemap.xml`** met alle 12 URLs
- **WebP logos** met expliciete `width`/`height` (geen CLS)
- **Lazy loading** op below-the-fold images
- **Skip-to-content link** voor screen readers
- **`prefers-reduced-motion`** honored
- **`aria-hidden`** op decoratieve icons, `aria-label` op interactieve elementen
- **Tap targets 44px+** overal

## SEO — wat nog moet (nice-to-haves)

### Technisch

- [ ] **Pre-rendering / SSR** — meta tags voor non-Google crawlers (Facebook, LinkedIn, ChatGPT) werken nu alleen op homepage waar alles in `index.html` staat. Voor alle routes social-share-ready: migreer naar [TanStack Start](https://tanstack.com/start) (officiële SSR-laag) of [vike](https://vike.dev). Belangrijk vooral voor de stadspagina's als je die ooit op Facebook/LinkedIn wil delen.
- [ ] **Service-pagina's** — `/diensten/spoedopening`, `/diensten/slotvervanging`, etc. Diepere content per dienst (eenzelfde patroon als `slotenmaker/$slug` maar op service-as).
- [ ] **Blog** — long-tail queries ("kosten slotvervanging", "beste smart lock 2026"). 1 post per maand op `/blog/$slug`.
- [ ] **Echte OG image** — placeholder in `public/og-image.webp` is nu het logo. Genereer een 1200×630 social card (kan via Vercel OG image API).
- [ ] **Per-gemeente OG images** — elk een eigen variant met de stad in de titel.

### Operationeel (off-site)

- [ ] **Google Business Profile** claimen — voor lokale SEO is dit belangrijker dan de website zelf. Categorie "Slotenmaker" + "Beveiligingsdienst", alle 9 deelgemeenten als service area, foto's, openingsuren.
- [ ] **Reviews verzamelen** — SMS na elke job met directe Google review-link. Mik op 50 reviews binnen 6 maanden.
- [ ] **NAW-consistentie op Belgische directories** — gouden gids, slotenmaker-direct.be, VSU ledenpagina, infobel.com, bedrijvengids.be.
- [ ] **Backlinks van lokale partners** — vastgoedmakelaars, syndici, verzekeringsmakelaars in Gent.

## Brand-assets

De logos in `public/brands/` zijn de bestanden die al in gebruik waren op de huidige WordPress site (overgenomen bij de migratie). Voor productie-kwaliteit + grotere groottes: vraag de partner-portals van elk merk om officiële SVG/EPS bestanden. Drop ze met dezelfde filenames en werk eventueel `width`/`height` props bij in `src/components/Brands.tsx`.

## License

Privé-eigendom van Locked Slotenmakers BV. Niet voor publieke distributie.
