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
| `components/core/` | 10 React primitives with TypeScript declarations. |
| `ui_kits/website/` | Click-through website recreation — 10 screens, responsive. |
| `assets/` | Logos (SVG + PNG), social icons, event photography. |

### Components

`Button` · `Tag` · `ArrowLink` · `SectionHeader` · `Stat` · `MediaCard` · `Input` · `SocialLink` · `Logo` · `Accordion`

Each ships with a `.jsx` source, a `.d.ts` type declaration, and a `.prompt.md` usage guide.

Open `components/core/core.card.html` in a browser to see all components in one live preview.

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
- Accordion follows the WAI-ARIA Disclosure pattern (`aria-expanded`, `aria-controls`, `role="region"`).
- Button exposes `aria-disabled` and supports keyboard press feedback (Enter / Space).
- Input provides a visible focus ring without suppressing the browser outline.
- Decorative SVGs and icon dots carry `aria-hidden="true"`.
- Contrast: all text meets the 4.5:1 AA threshold at its rendered size.

---

## Fonts

The brand font **Helvetica** (Regular + Bold) is not freely redistributable as a webfont.
This system loads **Arimo** from Google Fonts as a metric-compatible substitute.

For production, supply licensed **Helvetica Neue** woff2 files and update the
`@font-face` rules in `tokens/fonts.css`.

---

## Website UI kit

`ui_kits/website/` is a full click-through recreation of the TEDxAmsterdam
"Amsterdam Reimagined" website. Open `ui_kits/website/index.html` directly in a
browser — no build step required.

**Screens:** Home · Speakers · Speaker detail · Team · About · Event Program ·
Impact Program · Partners · Gallery · Blog

Responsive: navigation collapses to a hamburger drawer below 860px.

---

TEDxAmsterdam is an independent event operated under license from TED.
