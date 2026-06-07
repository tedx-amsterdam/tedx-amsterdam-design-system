# Component Expansion Design — TEDxAmsterdam Design System

**Date:** 2026-06-08
**Status:** Approved
**Scope:** Add 11 new components, expanding the library from 10 to 21 total

---

## Background

The TEDxAmsterdam design system serves three audiences: AI code generation (Claude skill), developer teams consuming components in real projects, and the TEDx communication team using it as a brand book. The existing 10 components (Button, Tag, ArrowLink, SectionHeader, Stat, MediaCard, Input, SocialLink, Logo, Accordion) cover basic primitives but leave large gaps in form handling, interaction patterns, and navigation — making it difficult to build complete, real pages with the system alone.

The highest-priority improvement is expanding component coverage.

---

## Goals

- Add 11 new components covering form completion, interaction primitives, navigation, and content organisation
- Follow the existing file pattern exactly: `.jsx` + `.d.ts` + `.prompt.md` per component
- Use only existing design tokens — no new CSS custom properties unless strictly necessary
- Maintain WCAG 2.1 AA accessibility compliance throughout
- Keep each component self-contained and independently consumable

---

## Architecture

### File structure

Each new component lives in `/components/core/` alongside the existing 10:

```
components/core/
  Select.jsx          Select.d.ts          Select.prompt.md
  Textarea.jsx        Textarea.d.ts        Textarea.prompt.md
  Checkbox.jsx        Checkbox.d.ts        Checkbox.prompt.md
  Radio.jsx           Radio.d.ts           Radio.prompt.md
  FormField.jsx       FormField.d.ts       FormField.prompt.md
  Modal.jsx           Modal.d.ts           Modal.prompt.md
  Toast.jsx           Toast.d.ts           Toast.prompt.md
  NavigationBar.jsx   NavigationBar.d.ts   NavigationBar.prompt.md
  Breadcrumb.jsx      Breadcrumb.d.ts      Breadcrumb.prompt.md
  Tabs.jsx            Tabs.d.ts            Tabs.prompt.md
  Badge.jsx           Badge.d.ts           Badge.prompt.md
```

### Styling conventions (consistent with existing components)

- All values via `var(--token)` — no raw hex, no raw px, no Tailwind classes
- Inline styles on JSX elements (no separate `.css` files for components)
- State expressed via React hooks (`useState`, `useRef`, `useEffect`)
- No external dependencies beyond React

### Accessibility baseline

- Interactive components: full keyboard support, visible focus ring using `--accent` token
- ARIA roles, states, and properties per WAI-ARIA 1.2 authoring patterns
- Labels always associated to inputs via `htmlFor` / `id` pairing
- Groups use `<fieldset>` + `<legend>`

### The `_ds_manifest.json` file must be updated after implementation to include all new components in the `components` array.

---

## Component Specs

### Group 1 — Form components

#### `Select`

A branded dropdown that matches the existing Input visual style.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | string | — | Visible label above the select |
| `options` | `{ value: string, label: string }[]` | — | Option list |
| `value` | string | — | Controlled selected value |
| `onChange` | `(value: string) => void` | — | Change handler |
| `placeholder` | string | `'Select…'` | Shown when no value selected |
| `disabled` | boolean | `false` | Disables interaction |
| `error` | string | — | Validation message; triggers error state |
| `id` | string | — | Forwarded to `<select>` for label association |

**Behaviour:** Renders a native `<select>` with a custom chevron overlay (SVG arrow, same as brand arrow from ArrowLink). Error state adds red border using `--tedx-red`. Disabled state uses reduced opacity.

**ARIA:** Label associated via `htmlFor` + `id`. Invalid state via `aria-invalid="true"` + `aria-describedby` pointing to error message element.

---

#### `Textarea`

Multi-line text input, visually consistent with Input.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | string | — | Visible label |
| `value` | string | — | Controlled value |
| `onChange` | `(value: string) => void` | — | Change handler |
| `placeholder` | string | — | Placeholder text |
| `rows` | number | `4` | Initial visible rows |
| `disabled` | boolean | `false` | — |
| `error` | string | — | Validation message |
| `id` | string | — | Forwarded to `<textarea>` |

**ARIA:** Same pattern as Select — `aria-invalid` + `aria-describedby` for errors.

---

#### `Checkbox`

Single checkbox with label. For checkbox groups, compose multiple Checkbox instances inside a `<fieldset>`.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | string | — | Visible label beside checkbox |
| `checked` | boolean | — | Controlled state |
| `onChange` | `(checked: boolean) => void` | — | — |
| `disabled` | boolean | `false` | — |
| `id` | string | — | Associates label |

**Visual:** Custom box using CSS on a visually-hidden native `<input type="checkbox">`. Checked state shows a red tick mark (SVG). Focus ring via `:focus-visible` global rule already in `styles.css`.

---

#### `Radio`

Radio button group — always rendered as a group via `<fieldset>` + `<legend>`.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `legend` | string | — | Group label (renders as `<legend>`) |
| `options` | `{ value: string, label: string }[]` | — | Radio options |
| `value` | string | — | Controlled selected value |
| `onChange` | `(value: string) => void` | — | — |
| `name` | string | — | Required — shared `name` attribute |
| `disabled` | boolean | `false` | Disables all options |

**ARIA:** `<fieldset>` + `<legend>` is the correct group pattern — no additional ARIA needed.

---

#### `FormField`

Slot-based wrapper that composes label, hint text, any input child, and validation message. Removes repetitive label/error markup from every form.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | string | — | Visible label |
| `htmlFor` | string | — | Points to child input's `id` |
| `hint` | string | — | Optional helper text below label |
| `error` | string | — | Validation message (shown below child) |
| `required` | boolean | `false` | Appends `*` to label |
| `children` | ReactNode | — | The input, select, textarea, etc. |

**Layout:** Label → hint → children → error message, each on its own line with `--space-1` gap.

---

### Group 2 — Interaction primitives

#### `Modal`

Overlay dialog for confirmations, detail views, or forms.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `isOpen` | boolean | — | Controls visibility |
| `onClose` | `() => void` | — | Called on overlay click or Escape key |
| `title` | string | — | Dialog title (renders as `<h2>`) |
| `children` | ReactNode | — | Dialog body content |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Width: 480px / 640px / 800px |
| `hideCloseButton` | boolean | `false` | Suppress the × button |

**Behaviour:**
- Renders a fixed full-screen overlay (`--bg-base` at 80% opacity, backdrop blur)
- Dialog panel is dark (`--bg-base`), red top accent border line, `--radius-card`
- Escape key triggers `onClose`
- Overlay click triggers `onClose`
- Focus is trapped inside the modal while open (`useEffect` + `querySelectorAll` for focusable elements)
- Body scroll is locked while open (`overflow: hidden` on `document.body`)

**ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title element.

---

#### `Toast`

Transient notification component that auto-dismisses.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `message` | string | — | Notification text |
| `type` | `'info' \| 'success' \| 'error' \| 'warning'` | `'info'` | Sets left-border accent colour |
| `duration` | number | `4000` | Ms before auto-dismiss (0 = persist) |
| `onDismiss` | `() => void` | — | Called when dismissed (auto or manual) |

**Visual:** Fixed bottom-right positioned card. Left border coloured by type: `--tedx-red` (error/warning), `--tedx-white` (info/success). The visual distinction between info and success is conveyed by the message text, not colour — keeping the palette on-brand. Close button (×) in top-right corner. Slides in from right via CSS transform transition.

**ARIA:** `role="status"` for info/success; `role="alert"` for error/warning (triggers live region announcement).

**Note:** Toast is a presentational component — the caller manages when to render it (typically via state). It does not include a global provider or imperative API.

---

### Group 3 — Navigation

#### `NavigationBar`

Top navigation extracted from the existing UI-kit website header, made reusable.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `links` | `{ label: string, href: string }[]` | — | Nav link items |
| `ctaLabel` | string | — | CTA button text |
| `ctaHref` | string | — | CTA button destination |
| `logoHref` | string | `'/'` | Logo link destination |
| `activePath` | string | — | Marks matching link as active (aria-current) |

**Layout:** Full-width bar, `--header-height` (80px) tall. Left: Logo component. Centre: nav links as `<nav>` + `<ul>`. Right: Button (primary) for CTA. Background `--bg-base`. Bottom hairline border `--border-hairline`.

**Mobile (< 768px):** Links and CTA collapse behind a hamburger icon button. Toggle opens a full-width dropdown panel below the bar. Hamburger uses `aria-expanded` + `aria-controls`. Close on outside click or Escape.

**ARIA:** `<nav aria-label="Main navigation">`. Active link gets `aria-current="page"`.

---

#### `Breadcrumb`

Hierarchical location trail for content-heavy pages.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `{ label: string, href?: string }[]` | — | Trail items; last item is current page (no href) |
| `ariaLabel` | string | `'Breadcrumb'` | `aria-label` on `<nav>` |

**Visual:** `<nav>` + `<ol>` list. Items separated by `/` (or `›`) rendered via CSS `::after` pseudo on all but the last item. Links in `--text-secondary` colour; current page in `--text-primary`, not linked. `--text-tag` size, uppercase, `--ls-wide` letter-spacing — consistent with Tag component.

**ARIA:** `<nav aria-label="Breadcrumb">`, `<ol>`, last item has `aria-current="page"`.

---

### Group 4 — Organisation / display

#### `Tabs`

Tabbed content switcher.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `tabs` | `{ label: string, content: ReactNode }[]` | — | Tab definitions |
| `defaultIndex` | number | `0` | Initially selected tab |

**Behaviour:** Uncontrolled (internal `useState` for active index). Tab bar renders above content panel. Active tab indicated by red bottom border (`--tedx-red`, 2px). Keyboard: Left/Right arrows move focus between tabs; Enter/Space activates.

**ARIA:** `role="tablist"` on tab bar. Each tab button: `role="tab"`, `aria-selected`, `aria-controls`. Each panel: `role="tabpanel"`, `aria-labelledby`, hidden via `display: none` when inactive.

---

#### `Badge`

Small inline label for statuses, counts, or categories. Distinct from Tag (no dot, no forced uppercase, smaller, inline).

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | string | — | Badge text |
| `color` | `'red' \| 'white' \| 'muted'` | `'red'` | Fill variant |
| `size` | `'sm' \| 'md'` | `'md'` | sm: 10px text / md: 12px text |

**Visual:** Pill shape (`--radius-full`). Red: `--tedx-red` background, white text. White: white background, black text. Muted: `--bg-subtle` (or semi-transparent white) background, muted text. No icon, no interactive state — purely display.

---

## Manifest update

After implementing all 11 components, update `_ds_manifest.json`:
- Add each new component to the `components` array with its name, path, description, and variant list
- Update `version` or `updatedAt` field

---

## Out of scope

- Global Toast provider / imperative `toast.show()` API — caller manages render state
- Controlled Tabs (`activeIndex` + `onTabChange` props) — uncontrolled is sufficient for now
- NavigationBar desktop-only mode — mobile hamburger is included
- Portal-based Modal rendering — fixed overlay in-place is sufficient
- New design tokens — use only the existing token set (no `--success` or new semantic colours)

---

## Success criteria

- All 11 components render correctly in the existing `core.card.html` preview
- Each component is keyboard-navigable and passes manual WCAG 2.1 AA checks
- No raw hex values or raw px values in any new component source
- `_ds_manifest.json` updated to include all new components
- Each component has a `.prompt.md` usage guide sufficient for AI code generation
