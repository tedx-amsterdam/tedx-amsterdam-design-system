# TEDxAmsterdam Design System

Dark-first brand system for **TEDxAmsterdam** — Amsterdam Reimagined.
Bold, warm, and confident: a black canvas lit from the edges by TED-red heat,
oversized Helvetica Bold headlines, and a single red call-to-action colour.

> *Unsung heroes, unstoppable ideas.*

---

## Quick start

Link the single entry point. It imports every token layer in the correct order:

```html
<link rel="stylesheet" href="styles.css" />
```

All design tokens are then available as CSS custom properties:

```css
.my-cta {
  background: var(--tedx-red);
  color: var(--tedx-white);
  border-radius: var(--radius-button);
  font: var(--text-tag);
}
```

---

### Using as an npm package

```bash
npm install tedx-amsterdam-design-system
```

```jsx
import { Button, Modal } from 'tedx-amsterdam-design-system';
import 'tedx-amsterdam-design-system/styles.css';   // design tokens + global a11y styles
import 'tedx-amsterdam-design-system/index.css';    // component styles
```

React 18 or 19 is a peer dependency. The CDN IIFE bundle (`_ds_bundle.js`) remains available for no-build usage.

---

## What's included

| Path | Contents |
|------|----------|
| `styles.css` | Global entry point — links this one file to get everything. |
| `tokens/colors.css` | Brand + neutral palette and semantic aliases. |
| `tokens/fonts.css` | Font stack declaration + Arimo (Helvetica substitute) webfont. |
| `tokens/typography.css` | Type scale, line-heights, tracking, composite text tokens. |
| `tokens/spacing.css` | 4px spacing scale + layout tokens (frame, gutters, header). |
| `tokens/effects.css` | Radii, shadows, heat-gradient system, motion tokens. |
| `guidelines/*.html` | Foundation specimen cards — open in a browser for reference. |
| `components/core/` | 23 React primitives with TypeScript declarations. |
| `ui_kits/website/` | Click-through website recreation — 10 screens, responsive. |
| `assets/` | Logos (SVG + PNG), social icons, event photography. |

### Components

**Primitives**
`Button` · `Tag` · `Badge` · `ArrowLink` · `Logo`

**Form**
`Input` · `Select` · `Textarea` · `Checkbox` · `CheckboxGroup` · `Radio` · `RadioGroup` · `FormField`

**Content**
`SectionHeader` · `Stat` · `MediaCard` · `Accordion` · `Tabs`

**Navigation**
`NavigationBar` · `Breadcrumb` · `SocialLink`

**Feedback**
`Modal` · `Toast`

Each ships with a `.jsx` source, a `.d.ts` type declaration, and a `.prompt.md` usage guide.

Open `components/core/core.card.html` in a browser to see all 23 components in one live preview.

---

## Design foundations

### Colour

| Role | Token | Value |
|------|-------|-------|
| Primary accent | `--tedx-red` | `#EB0028` |
| Canvas | `--tedx-black` | `#000000` |
| Ink | `--tedx-white` | `#FFFFFF` |
| Gradient accent | `--tedx-orange` | `#F36C21` |

Orange appears **only inside gradients** — never as a flat fill.
The signature motif is black lit from edges and corners by red→orange radial glows.

### Typography

Brand font: **Helvetica** Bold + Regular (see [Fonts](#fonts) below).
Display: tight — 100–110% leading, **−3% tracking**, often ALL-CAPS.
Body: 120–130% leading, 0 tracking, sentence case.

| Token | Usage |
|-------|-------|
| `--text-display` | Hero headlines |
| `--text-h1` – `--text-h4` | Section headings |
| `--text-body` | Body copy |
| `--text-tag` | Eyebrows, labels, button labels |

### Spacing

4px base unit. Key layout tokens:

| Token | Value |
|-------|-------|
| `--frame-max` | 1400px |
| `--gutter` | 40px |
| `--gutter-wide` | 160px (hero insets) |
| `--section-gap` | 120px |

### Corners & motion

- Media and cards: `--radius-none` (square — `0px`)
- Buttons: `--radius-button` (`10px`)
- Motion: 120–360ms, ease-out, no bounce

---

## Voice & tone

- **Person:** collective "we" → "you". Short, declarative, momentum-driven.
- **Casing:** headlines ALL-CAPS, eyebrows UPPERCASE, body sentence case.
- **Numbers as impact:** oversized figures ("2009", "20K") anchor key stats.
- **No emoji.** Iconography is geometric — the brand arrow, circles, the red rectangle.

---

## Accessibility

The system targets WCAG 2.1 AA:

- Global `:focus-visible` ring via `--focus-ring` (`#EB0028`) declared in `styles.css`.
- `prefers-reduced-motion` media query in `styles.css` collapses all transitions/animations (WCAG 2.3.3).
- Accordion follows the WAI-ARIA Disclosure pattern (`aria-expanded`, `aria-controls`, `role="region"`).
- Button exposes `aria-disabled` and supports keyboard press feedback (Enter / Space).
- Input, Select, Textarea: visible focus ring, `aria-invalid` + `aria-describedby` for error states.
- FormField: inline error uses a persistent `aria-live="polite"` region (always in DOM so NVDA/Firefox announce changes).
- Checkbox and Radio: visually-hidden native inputs with associated labels.
- CheckboxGroup and RadioGroup: `<fieldset>` + `<legend>` grouping for screen readers.
- Tabs: full `role="tablist"` / `role="tab"` / `role="tabpanel"` pattern with Left/Right arrow navigation. Supports both uncontrolled (`defaultIndex`) and controlled (`selectedIndex` + `onTabChange`) APIs.
- Modal: `role="dialog"`, `aria-modal`, focus trap, body scroll lock, Escape-key close.
- Toast: `role="alert"` (error/warning) or `role="status"` (info/success) with `aria-atomic="true"` so the full message is announced on update.
- NavigationBar: skip-to-content link (WCAG 2.4.1), `aria-expanded` hamburger, `aria-current="page"` on active link, Escape-key close. Desktop and mobile `<nav>` landmarks carry distinct labels.
- Breadcrumb: `<nav>` + `<ol>` with `aria-current="page"` on the current item.
- Decorative SVGs and icon dots carry `aria-hidden="true"`.
- Contrast: all text meets the 4.5:1 AA threshold at its rendered size.

---

## Fonts

The brand font **Helvetica** (Regular + Bold) is not freely redistributable as a webfont.
This system loads **Arimo** from Google Fonts as a metric-compatible substitute.

For production, supply licensed **Helvetica Neue** woff2 files and update the
`@font-face` rules in `tokens/fonts.css`.

---

## Testing

The component library ships with a Vitest + React Testing Library + jest-axe suite.

```bash
npm test              # run once
npm run test:watch    # watch mode
npm run test:coverage # coverage report
```

40 tests across 7 files covering behaviour, ARIA attributes, and keyboard interaction.

---

## Build scripts

| Script | What it does |
|--------|-------------|
| `npm run build` | Rebuilds `_ds_bundle.js` — the CDN-ready IIFE bundle of all 23 components. |
| `npm run build:website` | Compiles `ui_kits/website/*.jsx` → `ui_kits/website/bundle.js` via esbuild. |
| `npm run typecheck` | Validates all `.d.ts` declarations with TypeScript (`tsc --noEmit`). |

---

## Website UI kit

`ui_kits/website/` is a full click-through recreation of the TEDxAmsterdam
"Amsterdam Reimagined" website. Open `ui_kits/website/index.html` directly in a
browser. The JSX is pre-compiled — no Babel required at runtime.

To rebuild after editing JSX source files:

```bash
npm run build:website
```

**Screens:** Home · Speakers · Speaker detail · Team · About · Event Program ·
Impact Program · Partners · Gallery · Blog

Responsive: navigation collapses to a hamburger drawer below 860px.

---

TEDxAmsterdam is an independent event operated under license from TED.
Original design: busy.studio. Extended by Julian Aijal.
