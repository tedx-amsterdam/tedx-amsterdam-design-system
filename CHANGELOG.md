# Changelog

All notable changes are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning: [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- `--tap-target` (44px) and `--header-height-m` (52px), for touch targets and the mobile header.

### Changed
- `NavigationBar` on mobile follows common mobile conventions: a 52px bar with a 122px logo, the CTA visible next to the menu instead of only inside it, and a menu button labelled "Menu" next to its icon. The logo, the links, the CTA and the menu button all have a tap area of at least 44px. Below 360px the bar compacts so it fits at 320px.
- `ArrowLink` and `Breadcrumb` links get an invisible tap area of 44px around their short labels, without changing the layout.

---

## [1.4.0] — 2026-10-14

Aligns the tokens and every component used in busy.studio's Figma designs with them (`docs/figma-audit.md`). Visual changes only for existing APIs; `Accent`, `imageAlt` on `MediaCard` and the new tokens are additions.

### Changed
- Type tokens follow the Figma designs (`docs/figma-audit.md`): `--fs-display` is 115px with the new `--lh-display` (0.9), `--text-h1` has line height 1.1 for page titles, and `--fs-h2` is 48px with line height 1.1 for section headings (was 56px and 1.2). `SectionHeader` and the medium `Stat` get smaller as a result.
- `Button`: uppercase labels and the heights from the designs, 66px (`sm`), 74px (`md`, default) and 80px (`lg`); the width comes from the layout.
- `ArrowLink`: uppercase, with the long arrow from the designs.
- `Tag`: white by default (was red), without extra tracking. With `dot` it is a meta line: regular weight, sentence case.
- `Badge`: a square label, black by default (was a red pill), 14px uppercase.
- `Tabs`: the active tab is red instead of underlined, the others white at 50%, 40px apart.
- `NavigationBar`: logo and links sit in the 1080px content column, links in regular sentence case with the active one red, a 225px logo, no border below; the optional CTA is uppercase.
- `SectionHeader`: uppercase title, white description 32px below it, link 24px below that.
- `Stat`: no tracking on the number, a white label, value and label in a 3:2 grid five columns wide.
- `MediaCard`: renders the image as a lazy `<img>` with the new `imageAlt` prop (was a CSS background without alt text), the category as a `Badge`, the date as a `Tag` meta line, and the text styles from the designs.

### Added
- Text tokens `--text-intro`, `--text-meta`, `--text-small` and `--text-caption`, the size `--fs-small` and the weight `--weight-light`.
- Mobile tokens `--fs-h4-m`, `--fs-stat-m` and `--fs-tag-m`.
- Grid tokens for the 1080px content column: `--grid-columns` (12) and `--grid-gap` (20px), and for mobile `--grid-columns-m` (6), `--grid-gap-m` and `--gutter-m` (15px).
- `--tedx-white-70` and `--tedx-white-50` for secondary text.
- `Badge` colour `black`, now the default; `--button-height-sm`, `-md` and `-lg`.
- `Accent`: sets words of a heading in red, as the designs do.

---

## [1.3.1] — 2026-10-13

### Fixed
- Arimo loads from `fonts/` in the package instead of Google Fonts, so a site using `styles.css` no longer sends its visitors' IP addresses to Google. Bundlers that drop remote `@import`s, such as Next.js, also get the font now: before, it silently never loaded there.

### Added
- `fonts/`: the variable Arimo files for Latin and Latin Extended with their SIL Open Font License, exported as `./fonts/*`. They add about 250 kB to the package; a browser downloads only the subset a page uses, and only where Helvetica is missing.

### Removed
- `ui_kits/website/` and `npm run build:website`: the click-through prototype of the 2025 edition's website, with that year's theme and copy. The designs stay in the Figma file; the website builds its pages from the components. Not part of the npm package, so nothing changes for consumers.

---

## [1.3.0] — 2026-10-13

### Changed
- `dist/` has one ES module per component instead of one bundle; `dist/index.js` re-exports them and `dist/index.css` is unchanged. Import paths for consumers stay the same.
- The 13 interactive components (Accordion, Button, Checkbox, FormField, Input, Modal, NavigationBar, Radio, RadioGroup, Select, Tabs, Textarea, Toast) start with `'use client'`. In React Server Component frameworks the package can be imported from server components directly, and the other components stay server components.

### Added
- `TEDX_DISCLAIMER`, `TEDX_ABOUT_TEDX`, `TEDX_ABOUT_TED` and `TEDX_HOMEPAGE_DESCRIPTION`: the content the TEDx organizer guide requires, exported from the package.
- `scripts/check-dist.js`, run by `build:dist`: fails the build on a missing module, a lost `'use client'`, a duplicated component or a class name missing from `index.css`.
- Logos and social icons ship in the package under `assets/` (exported as `./assets/*`), so sites can copy them from `node_modules` instead of keeping their own copies. The event photography is not included.

### Fixed
- `Logo` and `NavigationBar` give their logo images explicit `width` and `height`, so browsers reserve the space before the image loads.
- Package metadata points to the `tedx-amsterdam` GitHub organisation.

---

## [1.2.1] — 2026-07-17

### Added
- npm package metadata, MIT license and a tag-triggered release workflow with trusted publishing and provenance.

---

## [1.2.0] — 2026-07-17

### Changed
- All 23 components accept `className` (merged onto the root element) and forward `...rest` (to the native control for Input/Select/Textarea; to the root otherwise).

### Added
- `npm run lint` (oxlint) across components, scripts, and tests.
- GitHub Actions CI: lint, typecheck, tests, and bundle build on every push/PR.
- npm distribution: ESM build (`dist/index.js`), extracted CSS (`dist/index.css`), TypeScript declarations, `exports` map, and React 18/19 `peerDependencies`.
- Library-wide jest-axe sweep over all 23 components (`tests/a11y.test.jsx`).
- Storybook 9 (react-vite) with a11y addon and stories for all 23 components.

### Fixed
- Align `@types/react`/`@types/react-dom` with React 18; commit `package-lock.json` for reproducible CI installs.
- Button: disabled state now blocks clicks and removes `href` on the link variant; hover/press moved from JS inline styles to CSS `:hover`/`:active` driven by tokens (`--accent-hover`, `--surface-light-hover`, `--tedx-white-08`); adds `className`.
- Modal: renders via `createPortal`, restores focus to the trigger on close, compensates scrollbar width during scroll lock; adds `className`; full test coverage incl. axe.
- CDN bundle (`_ds_bundle.js`) is now a valid classic script: React/ReactDOM externals resolve via `window.React`/`window.ReactDOM` (previously ESM `import` statements inside the IIFE caused a SyntaxError).
- FormField: auto-wires child Input/Select/Textarea (`id`, `aria-describedby`, `aria-invalid`, `required`) via context; adds `useFormField` and `className`.
- Accordion: ids namespaced with `useId()` — multiple accordions per page no longer collide; test coverage added.
- Vercel deployments: build command still invoked the obsolete `extend-bundle.js` (expects `.jsx` sources removed in 1.1.0), failing every deploy; now runs `npm run build` and the dead script is deleted.

---

## [1.1.0] — 2026-06-09

### Added
- `CheckboxGroup` — fieldset/legend compound wrapper for checkbox groups
- `RadioGroup` — controlled compound component with `RadioGroup.Option` sub-component
- `Tabs.selectedIndex` + `Tabs.onTabChange` — controlled API for URL-synced tabs
- `NavigationBar.skipTarget` — configurable skip-to-content link (WCAG 2.4.1)
- Vitest + React Testing Library + jest-axe test infrastructure
- `tsconfig.json` — validates all `.d.ts` declarations via `npm run typecheck`
- `scripts/build-bundle.js` — clean full-rebuild of `_ds_bundle.js`
- `scripts/build-website.js` — esbuild pre-compilation of website JSX

### Fixed
- **Button** — hover/press states now use `useState` instead of direct DOM mutation
- **Toast** — added `aria-atomic="true"` (WCAG live region completeness)
- **FormField** — error span uses `aria-live="polite"` instead of `role="alert"`
- **NavigationBar** — `window.innerWidth` replaced with CSS media query (SSR-safe)
- **Button.d.ts** — extends `ButtonHTMLAttributes` / `AnchorHTMLAttributes` via `...rest`
- **Tabs.d.ts** — documents controlled props
- **NavigationBar.d.ts** — documents `skipTarget` prop
- **styles.css** — `prefers-reduced-motion` media query (WCAG 2.3.3)
- **Website** — removed ~1 MB Babel standalone; pre-built by esbuild
- **Website** — added `preconnect` hints for Google Fonts
- **Build** — replaced fragile `extend-bundle.js` string-appending with `build-bundle.js`

---

## [1.0.0] — 2026-05-01

### Added
- Initial release: 21 components, 5-layer design token system, WCAG 2.1 AA patterns,
  TypeScript declarations, CDN browser bundle, website UI kit.
