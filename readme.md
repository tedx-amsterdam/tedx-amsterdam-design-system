# TEDxAmsterdam Design System

Dark-first brand system for **TEDxAmsterdam**, for every edition and its theme.
Bold, warm, and confident: a black canvas lit from the edges by TED-red heat,
oversized Helvetica Bold headlines, and a single red call-to-action colour.

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

#### Images

`Logo`, `NavigationBar` and `SocialLink` load their images from `{base}assets/…` at runtime, so your site has to serve them. The package ships the logos and icons (not the photography) in `assets/`; copy them into your public folder as part of the build and pass the matching `base`:

```bash
cp node_modules/tedx-amsterdam-design-system/assets/* public/assets/
```

```jsx
<Logo base="/" />   // loads /assets/logo-tedxamsterdam-white.png
```

The logos and icons are brand assets, not code: the MIT license does not cover them (see [License](#license)). Only TEDxAmsterdam and sites made for it may show the TEDxAmsterdam logo; `Logo` and `NavigationBar` always render it, so a project of your own needs its own versions of those two. The social icons are the trademarks of their networks.

#### Releasing a new version

Releases are tag-driven. CI publishes to npm via trusted publishing (OIDC). The version bump goes through a pull request like any other change, so nothing is pushed to `main` directly:

1. On a branch `chore/release-X.Y.Z`: `npm version X.Y.Z --no-git-tag-version`, move the `[Unreleased]` notes in `CHANGELOG.md` under the new version, and open a pull request.
2. After it is rebased onto `main`, tag the release commit, now the latest commit on `main`, and push only the tag:

```bash
git switch main && git pull
git tag vX.Y.Z
git push origin vX.Y.Z
```

The `Release` workflow checks that the tag matches `package.json`, then runs `npm publish`, which triggers `prepublishOnly` (lint → typecheck → tests → dist build) before anything is uploaded.

---

## What's included

| Path | Contents |
|------|----------|
| `styles.css` | Global entry point — links this one file to get everything. |
| `tokens/colors.css` | Brand + neutral palette and semantic aliases. |
| `tokens/fonts.css` | Font stack declaration + `@font-face` rules for Arimo (Helvetica substitute). |
| `fonts/` | Arimo woff2 files (Latin and Latin Extended) and their license, `OFL.txt`. |
| `tokens/typography.css` | Type scale, line-heights, tracking, composite text tokens. |
| `tokens/spacing.css` | 4px spacing scale + layout tokens (frame, gutters, header). |
| `tokens/effects.css` | Radii, shadows, heat-gradient system, motion tokens. |
| `docs/figma-audit.md` | How the tokens and components compare with the original Figma designs. |
| `guidelines/*.html` | Foundation specimen cards — open in a browser for reference. |
| `components/core/` | 23 React primitives with TypeScript declarations. |
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

Each ships with a `.tsx` source, a CSS Module, and a `.prompt.md` usage guide.
Type declarations are generated into `dist/types` by `npm run build:dist`.

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
Display: tight — 90–110% leading, often ALL-CAPS; **−3% tracking** on display, section headings and H3, none on page titles.
Body: 120–130% leading, 0 tracking, sentence case.

| Token | Usage |
|-------|-------|
| `--text-display` | Display headline in the home hero (115px / 90%) |
| `--text-h1` | Page titles (80px / 110%, no tracking) |
| `--text-h2` | Section headings (48px / 110%) |
| `--text-h3`, `--text-h4` | Smaller headings, card titles |
| `--text-body` | Body copy (20px / 130%) |
| `--text-intro` | Intros next to page titles (20px / 120%) |
| `--text-meta`, `--text-small`, `--text-caption` | Meta lines (16px), navigation and excerpts (14px), fine print (12px) |
| `--text-tag` | Eyebrows, labels, button labels |

### Spacing

4px base unit. Key layout tokens:

| Token | Value |
|-------|-------|
| `--frame-max` | 1400px |
| `--content-max` | 1080px: the content column, header and footer included |
| `--grid-columns`, `--grid-gap` | 12 columns, 20px gutters (mobile: `-m`, 6 and 15px) |
| `--gutter` | 40px (narrower screens; mobile `--gutter-m` 15px) |
| `--gutter-wide` | 160px (column margin at 1400px) |
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
- Button exposes `aria-disabled` and blocks clicks when disabled (a disabled link drops its `href`); hover/press states are CSS-driven and respect reduced motion.
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
This system ships **Arimo**, a metric-compatible substitute, in `fonts/`. `tokens/fonts.css` loads it
from there, so no visitor data goes to a font CDN, and browsers only download it where Helvetica is
missing. A bundler such as Next.js or Vite picks the files up through the relative `url()`s; without
one, serve `fonts/` next to `tokens/`. Arimo is under the SIL Open Font License (`fonts/OFL.txt`).

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

130 tests across 12 files covering behaviour, ARIA attributes, keyboard interaction,
a uniform `className`/rest prop-surface contract, and a library-wide jest-axe sweep.

---

## Storybook

Interactive component playground with a11y checks:

    npm run storybook        # dev server on :6006
    npm run build-storybook  # static build (CI-verified)

---

## Build scripts

| Script | What it does |
|--------|-------------|
| `npm run build` | Rebuilds `_ds_bundle.js` — the CDN-ready IIFE bundle of all 23 components. |
| `npm run build:dist` | Builds the npm package output: one ES module per component (keeping `'use client'`), `dist/index.js` re-exporting them, `dist/index.css`, and type declarations in `dist/types`. Then checks it with `scripts/check-dist.js`. |
| `npm run typecheck` | Type-checks component and story sources with TypeScript (`tsc --noEmit`). |
| `npm run lint` | Runs oxlint across components, scripts, and tests. |

---

## License

Code is [MIT licensed](./LICENSE). The TEDx logo, the TEDxAmsterdam name, the
logos and icons the npm package ships in `assets/`, and event photography are
**not** covered by the MIT license — they remain subject
to [TED's brand guidelines](https://www.ted.com/participate/organize-a-local-tedx-event/tedx-organizer-guide/branding-promotions).

---

TEDxAmsterdam is an independent event operated under license from TED.
Original design: busy.studio. Extended by Julian Aijal.
