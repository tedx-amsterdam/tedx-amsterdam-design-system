---
name: tedxamsterdam-design
description: Use this skill to generate well-branded interfaces and assets for TEDxAmsterdam, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and components for prototyping.
user-invocable: true
---

# TEDxAmsterdam Design System

Read the `readme.md` file within this skill first — it is the full design guide
(content fundamentals, visual foundations, iconography, and a file manifest).
Then explore the other available files.

## What's here
- `styles.css` — global entry point (link this one file). `@import`s every token + font file.
- `tokens/` — colors, fonts, typography, spacing, effects (CSS custom properties).
- `guidelines/*.html` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/core/` — React primitives: `Button`, `Tag`, `ArrowLink`, `SectionHeader`,
  `Stat`, `MediaCard`, `Input`, `SocialLink`, `Logo` (each with a `.d.ts` + `.prompt.md`).
- `assets/` — logos (SVG + white PNG), social icons, event photography.

## How to work
- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the assets you
  need out of `assets/`, link `styles.css`, and produce static HTML for the user to
  view. Follow the `.prompt.md` usage notes.
- **Production code**: copy assets and read the token + guideline files to design
  natively in the brand. The components are framework-agnostic in spirit — they
  reference CSS custom properties only.

## Non-negotiables (the brand in one breath)
- Dark-first: **black** canvas, **white** ink, **TED red `#EB0028`** as the single
  accent. Orange (`#F36C21` / `#FF9B19`) appears **only inside gradients**.
- **Helvetica** Bold + Regular (Arimo is the loaded web substitute — swap for
  licensed Helvetica in production). Display is big, often ALL-CAPS, tight: 100–110%
  leading, −3% tracking.
- Signature motif: black lit from the **edges/corners by red→orange heat glows** and
  large radial blooms. Square-cornered media, 10px-radius red buttons, hairline rules.
- Voice: bold, friendly, inclusive, future-forward. We → you. No emoji.
  Each edition has its own theme and tagline: take them from the user or the CMS,
  never from an earlier edition.

If the user invokes this skill without other guidance, ask what they want to build,
ask a few focused questions, then act as an expert TEDxAmsterdam designer — output
HTML artifacts or production code depending on the need.
