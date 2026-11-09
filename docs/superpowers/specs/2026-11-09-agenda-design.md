# Agenda

**Datum:** 2026-11-09
**Status:** Goedgekeurd ontwerp, wacht op review van de spec

## Doel

Een agenda van een event (tijd, titel, beschrijving, optioneel label) als component in het design system, en dezelfde agenda in Webflow, gevuld uit het CMS. Eerste gebruik: `/after-growth`, voor TEDxAmsterdam op donderdag 12 november 2026.

Een agenda staat niet in de Figma-ontwerpen. Volgens `docs/figma-audit.md` begint een nieuw ontwerp daarom hier, in Storybook, en volgt Webflow het design system.

## Besluiten

| Vraag | Besluit |
|---|---|
| Waar | Design system (React) als bron, Webflow volgt met dezelfde maten |
| CMS | Nieuwe collectie "Agenda items" met een referentie naar "Upcoming events" |
| Label rechts | Optioneel vrij tekstveld, getoond als `Tag` in rood, zonder pill-rand |
| Volgorde | Sortering op tijd; geen volgordeveld |
| Plek op `/after-growth` | Nieuwe sectie direct na "What To Expect", plus een link `#agenda` in het eventinfo-blok |

## 1. Design system: `Agenda`

Bestanden volgens CLAUDE.md: `components/core/Agenda.tsx`, `Agenda.module.css`, `Agenda.stories.tsx`, export in `components/core/index.ts`, `tests/Agenda.test.tsx`, een fixture in `tests/fixtures.tsx`.

### API

```ts
export type AgendaItem = {
  /** Start time as written, e.g. "14:00". */
  time: string;
  title: string;
  description?: string;
  /** Short note on the right, e.g. "No entry after start". */
  label?: string;
};

export type AgendaProps = React.HTMLAttributes<HTMLOListElement> & {
  items: AgendaItem[];
  /** Level of each item's title. @default 3 */
  headingLevel?: 2 | 3 | 4;
};
```

Geen hooks, geen handlers: geen `'use client'`.

### Markup

```html
<ol class="root">
  <li class="item">
    <time class="time" datetime="14:00">14:00</time>
    <div class="content">
      <h3 class="title">Doors open</h3>
      <p class="description">…</p>        <!-- alleen als gevuld -->
    </div>
    <span class="label">…</span>         <!-- Tag color="red", alleen als gevuld -->
  </li>
</ol>
```

`datetime` krijgt de tijd alleen als die de vorm `HH:MM` heeft; anders blijft het attribuut weg (een `<time>` met een ongeldige `datetime` is ongeldige HTML).

### Stijl

Class names volgens de afspraak voor nieuwe componenten: `.root`, `.item`, `.time`, `.content`, `.title`, `.description`, `.label`.

- **Vanaf 768px**: elk item is een grid met drie kolommen: tijd, inhoud (flexibel), label. Ruimte boven en onder een item `--space-8`; tussen items een rand van 1px in `--border-hairline`.
- **Onder 768px**: één kolom, in de volgorde tijd, titel, beschrijving, label.
- **Tijd**: `font: var(--text-h3)`, kleur `--text-accent`.
- **Titel**: `font: var(--text-h3)`, hoofdletters, `letter-spacing: var(--ls-display)`, kleur `--text-primary`.
- **Beschrijving**: `font: var(--text-body)`, kleur `--text-secondary`.
- **Label**: het bestaande `Tag` met `color="red"`.
- Onder 768px: tijd en titel in `--fs-h3-m`.

Alleen tokens, geen ruwe waarden; `tests/styles.test.ts` controleert dat. De kolombreedte van de tijd komt uit de spacing-schaal (`--space-40`) of, als die niet past, staat als eigen breedte van het component in de stylesheet.

### Stories

Titel `Primitives/Agenda`, `tags: ['autodocs']`, `satisfies Meta<typeof Agenda>`:

- **MainEvent**: doors open, talks start, break, talks resume, afterparty, met labels "No entry after start".
- **Salon**: een korte avond met drie punten en beschrijvingen.
- **WithoutLabels**.

Geen thema of jaartal van één editie in de voorbeelden.

### Tests

- Rendert een geordende lijst met één item per agendapunt, in de gegeven volgorde.
- Titel heeft het gekozen headingniveau (standaard h3).
- Beschrijving en label alleen als ze gevuld zijn.
- `<time>` heeft `datetime` bij `HH:MM` en niet bij andere tekst.
- Axe-sweep via de fixture.

### Verder

- `docs/figma-audit.md`: een regel voor Agenda, status "— not in the designs".
- `CHANGELOG.md` en een minor release, 1.8.0.
- Website-repo: de roadmap bijwerken in een PR, en dit item noemen in de PR-beschrijving hier.

## 2. Webflow-CMS: "Agenda items"

| Veld | Type | Verplicht |
|---|---|---|
| Name (= titel) | PlainText | ja |
| Slug | automatisch | ja |
| Time | PlainText, als "14:00" | ja |
| Description | PlainText | nee |
| Label | PlainText | nee |
| Event | Reference → Upcoming events | ja |

- Bij Time staat als helptekst: "24-hour time with a leading zero, e.g. 09:00". De lijst sorteert op dit veld, en alleen met voorloopnul komt de volgorde goed uit.
- De templatepagina die Webflow voor de collectie maakt (`/agenda-items/*`) krijgt `noindex`, net als de events-template, en een kopie in `tedx-webflow-custom-code`.

Eerste inhoud, gekoppeld aan "TEDxAmsterdam 2026: After Growth":

| Time | Name | Label |
|---|---|---|
| 14:00 | Doors open | |
| 15:00 | Talks start | No entry after start |
| 16:30 | Break | |
| 17:00 | Talks resume | No entry after start |
| 18:30 | Afterparty | |

Beschrijvingen blijven leeg tot ze aangeleverd worden.

## 3. Webflow: sectie en classes

- **Classes**: `agenda`, `agenda-item`, `agenda-time`, `agenda-content`, `agenda-title`, `agenda-description`, `agenda-label`. Ze hebben dezelfde maten als het React-component en gebruiken de variabelen uit de "TEDx DS"-collectie en het kleurpalet (`--red`, `--white-70`, ...). Wat het Style panel niet kan, gaat naar `webflow/site.css`, met een fallback naar het token; `tests/webflow.test.ts` controleert die fallbacks.
- **Collection List** op "Agenda items", gefilterd op Event en gesorteerd op Time, oplopend. Een lege beschrijving of een leeg label wordt verborgen via een conditional visibility.
- **Herbruikbaar**: ik maak er een Webflow-component van als het filter op Event per instantie in te stellen is. Lukt dat niet, dan zijn de classes het gedeelde deel en krijgt elke pagina een eigen Collection List.
- **Op `/after-growth`**: een sectie met `id="agenda"`, direct na "What To Expect", in dezelfde opbouw: eyebrow "Schedule" en een h2 met de datum uit het event, en daaronder de lijst met titels als h3. In het eventinfo-blok komt een link "See the schedule" naar `#agenda`.
- **Op de event-template**: dezelfde lijst, gefilterd op het huidige event, en verborgen als er geen agendapunten zijn. Dit kan na donderdag.
- **Publiceren** gebeurt pas na akkoord.

## Buiten scope

- Een pill-rand om het label (dan wordt het een `Tag`-variant).
- Agendapunten die na middernacht vallen; die zouden verkeerd sorteren op tijd.
- Gestructureerde data per agendapunt (`subEvent`).
