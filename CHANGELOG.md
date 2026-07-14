# Changelog

All notable changes are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning: [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- `npm run lint` (oxlint) across components, scripts, and tests.

### Fixed
- Align `@types/react`/`@types/react-dom` with React 18; commit `package-lock.json` for reproducible CI installs.

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
