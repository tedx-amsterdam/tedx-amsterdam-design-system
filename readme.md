# TEDxAmsterdam — Design System

A dark-first, high-contrast brand system for **TEDxAmsterdam**, built from the
official 2025 brand-book and the "Amsterdam Reimagined" website designs.
The system is bold, warm and confident: a black canvas lit from the edges by
TED-red → orange heat, oversized Helvetica-Bold headlines, and a single red
call-to-action colour.

> **Tagline:** *Unsung heroes, unstoppable ideas.*

---

## Sources

All design content is recreated from the attached Figma file
**"TEDxAmsterdam_ website.fig"** (mounted as a read-only VFS during authoring).
Key reference frames:

- `/work/brandbook` — the 2025 brand-book (fonts, colours, iconography, positioning, tone of voice, values).
- `/work/hero-desktop` — the full "Amsterdam Reimagined" homepage (hero, stats, timetable, impact program, newsletter).
- `/work/blog-desktop`, `/work/speaker-desktop`, `/work/gallery-desktop`, `/work/footer` — secondary surfaces.
- `/ui-kit/frame` — the type + colour specimen ("UI KIT WEB").

Design credit in the source: **busy.studio**. The event is an independent TEDx
event operated under license from TED. No live codebase or repo was provided —
if one exists, attach it to raise UI-kit fidelity.

---

## Index / manifest

| Path | What |
|------|------|
| `styles.css` | Global entry point — `@import` manifest only. Consumers link this. |
| `tokens/colors.css` | Brand + neutral palette and semantic aliases. |
| `tokens/fonts.css` | Font stack + Arimo (Helvetica substitute) webfont load. |
| `tokens/typography.css` | Type scale, line-heights, tracking, composite text tokens. |
| `tokens/spacing.css` | 4px spacing scale + layout (frame, gutters, header). |
| `tokens/effects.css` | Radii, shadows, the signature heat-gradient system, motion. |
| `guidelines/*.html` | Foundation specimen cards (Colors, Type, Spacing, Brand). |
| `components/core/` | React primitives — see below. |
| `ui_kits/website/` | Click-through recreation of the TEDxAmsterdam website — 10 screens, responsive (hamburger nav under 860px). |
| `assets/` | Logos, social icons, event photography. |
| `SKILL.md` | Agent-Skills entry point for downstream use. |

### Components (`components/core/`)
`Button` · `Tag` · `ArrowLink` · `SectionHeader` · `Stat` · `MediaCard` ·
`Input` · `SocialLink` · `Logo` · `Accordion`

---

## CONTENT FUNDAMENTALS

How TEDxAmsterdam writes.

- **Voice (from the brand-book):** Bold, Friendly, Inclusive, Future-forward,
  Authentic, Engaging, Playful. *"We challenge norms and speak with confidence."*
  *"Everyone is welcome; every voice matters."*
- **Person:** Speaks as a collective **"we"** to the reader as **"you"** —
  *"Be the first to get notified when tickets go on sale."*
  *"Don't miss out — sign up now for early-bird access."*
- **Casing:** Headlines are frequently **ALL-CAPS** ("AMSTERDAM REIMAGINED",
  "BE THE FIRST TO GET TICKETS", "OUR SPEAKERS"). Eyebrows/tags are uppercase
  ("START-UP ACCELERATOR", "EARLY BIRD", "TOPIC"). Body copy is sentence case.
- **Tone of phrases:** short, declarative, momentum-driven. Themes of the city,
  connection, the future, inclusion, and impact. Em-dashes for asides
  ("— reflecting on the city's past, questioning its present, and shaping its future.").
- **Numbers as headlines:** impact is shown as oversized figures — `2009`
  ("events have been organised since"), `20K` ("people over the last 3 years").
- **No emoji.** Iconography is geometric, not illustrative.
- **Naming:** "TEDxAmsterdam" one word; the event theme leads ("Amsterdam
  Reimagined"); always reds the "TEDx" in the lockup.

---

## VISUAL FOUNDATIONS

- **Colour vibe:** dark-first. Black (`#000`) is the dominant surface; **TED red
  `#EB0028`** is the one accent, used for CTAs, eyebrows, links and highlighted
  words. Orange (`#F36C21` / glow `#FF9B19`) appears **only** inside gradients —
  never as flat fills. White is the primary ink.
- **Backgrounds:** never flat for long. The signature is a **heat gradient** —
  black lit from the **edges and corners** by red→orange glows (Figma diamond
  gradients), and large **radial blooms** behind heroes and footers. Photography
  is full-bleed and red/warm-toned, darkened with a 40% scrim so white type holds.
- **Type:** **Helvetica** (Bold + Regular) for everything. Display runs tight —
  100–110% leading, **−3% tracking**; body runs 120–130% leading at 0 tracking.
  Headlines are big and often all-caps. *(Substitution: Helvetica isn't a free
  webfont — the system loads **Arimo**, a metric-compatible match. Swap in
  licensed Helvetica web fonts for production. See "Fonts to provide" below.)*
- **Spacing & layout:** generous. 1400px frame, 40px standard gutters (160px on
  heroes), 80–120px between sections. 4px base unit.
- **Corners:** media and cards are **square** (0 radius). Buttons use **10px**.
  The "rounded red rectangle" motif (12px) frames the occasional image.
- **Borders:** hairlines only — `rgba(255,255,255,0.4)` rules on dark, used under
  form fields and to divide stats. No heavy outlines.
- **Shadows:** minimal. A soft `0 4px 4px rgba(0,0,0,.25)` sits under large
  display headings; cards rely on the dark canvas, not elevation.
- **Buttons:** primary = solid red, white bold 14px label, 10px radius; secondary
  = solid white / black label; ghost = hairline outline. Press = scale 0.97;
  hover = darken (red→`#C70022`).
- **Links:** bold red text + the brand arrow (triangle-tipped line); the gap
  widens on hover.
- **Motion:** restrained and quick (120–360ms, ease-out). Fades and small scales,
  no bounce, no infinite decorative loops.
- **Transparency/blur:** sparingly — scrims over photos and faint white hairlines.

---

## ICONOGRAPHY

- **Geometric, brand-built motifs over a generic icon set.** The brand-book
  defines four graphic devices (see the *Graphic motifs* card): the **orange
  gradient circle** (accent / background support, never a full flat circle), the
  **full circle** (outline, frames heroes / sits on edges), **half circles**
  (text support, overlapped in pairs), and the **rounded red rectangle**
  (highlights text, frames pictures).
- **The arrow** is the workhorse UI glyph — a triangle-tipped line used on links
  and the carousel/next controls. Reproduced inline in `ArrowLink` / `Button`.
- **Social icons** are simple monochrome glyphs (LinkedIn, Instagram, YouTube),
  shipped as SVGs in `assets/` and recoloured white via CSS filter in `SocialLink`.
- **No emoji, no unicode-as-icon.** When an icon is needed beyond these, prefer a
  thin monochrome SVG that matches the social-glyph weight; if pulling from a CDN,
  **Lucide** is the closest match — flag the substitution.

---

## Fonts to provide ⚠

The brand font **Helvetica** (Regular + Bold) is not redistributable as a
webfont, so this system renders **Arimo** (Google Fonts, metric-compatible) as
the fallback. For production, please supply licensed **Helvetica Neue** web font
files (woff2) and we'll wire real `@font-face` rules in `tokens/fonts.css`.
