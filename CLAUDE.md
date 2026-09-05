# CLAUDE.md — TEDx Amsterdam Design System

## Project overview

Dark-first React component library with CSS design tokens for TEDx Amsterdam. Uses TypeScript, CSS Modules, Vitest, and Storybook. The system is designed around a black canvas with white type and red accents — every design decision flows from this foundation.

## Architecture

```
components/core/   — React components (*.tsx) + CSS Modules (*.module.css) + Stories (*.stories.tsx)
components/utils/  — Shared utilities (e.g. cn() for class joining)
tokens/            — CSS design tokens (colors, fonts, spacing, typography, effects)
tests/             — Vitest test files + fixtures
scripts/           — Build scripts (esbuild)
dist/              — Production output (do not edit)
```

Each component follows the pattern: `Component.tsx`, `Component.module.css`, `Component.stories.tsx`.

## Commands

- `npm test` — run all tests (vitest)
- `npm run typecheck` — TypeScript check (`tsc --noEmit`)
- `npm run lint` — lint with oxlint
- `npm run build:dist` — production build (esbuild + type declarations)
- `npm run storybook` — start Storybook dev server
- `npm run build-storybook` — build static Storybook
- `npm run build` — build the website bundle

## Commit conventions

- **All commits in English.** No exceptions.
- **Atomic commits.** Each commit does exactly one thing. Never mix unrelated changes.
- Use conventional commit prefixes: `feat:`, `fix:`, `chore:`, `test:`, `refactor:`, `docs:`.
- Keep messages concise — focus on *why*, not *what*.

## Design token system

Tokens are plain CSS custom properties in `tokens/`. Components must always reference tokens — never hardcode colors, spacing, font sizes, or radii.

- **colors.css** — Brand palette + semantic aliases. Always use semantic aliases (`--bg-base`, `--text-primary`, `--accent`) in components, not raw values (`--tedx-red`).
- **spacing.css** — 4px base unit scale (`--space-1` through `--space-40`). Layout tokens like `--frame-max`, `--gutter`, `--section-gap`.
- **typography.css** — Font size scale with desktop and mobile variants. Composite tokens (`--text-h1`, `--text-body`) for the `font` shorthand.
- **fonts.css** — Font stacks. Helvetica is the brand font; Arimo (Google Fonts) is the metric-compatible fallback.
- **effects.css** — Radii, shadows, signature heat gradients (`--glow-edge`, `--glow-corner`, `--glow-radial`), and motion tokens.

When adding a new token, place it in the correct file and follow the existing naming pattern. If a value is used by more than one component, it should be a token.

## Component conventions

- **Named exports only.** No default exports (except Storybook `meta`).
- **Props type** defined in the component file as `export type ComponentNameProps = { ... }`.
- **`cn()` utility** for class joining — do not add `clsx` or `classnames`.
- **Polymorphic patterns**: components that render as `<a>` or `<button>` use discriminated unions on props (see Button for the pattern).
- **Disabled state**: use `aria-disabled` instead of the native `disabled` attribute. Gate clicks in the handler. This keeps elements focusable for screen readers.
- **`button type`**: always default to `type="button"`, never `"submit"`.
- Every new component must be re-exported from `components/core/index.ts`.

## Styling rules

- CSS Modules (`.module.css`) for all component styles. No inline styles, no global CSS in components.
- Dark-first: the default surface is black, default text is white. Design for dark backgrounds first.
- Use semantic color aliases (`--text-primary`, `--bg-base`, `--accent`) not raw palette tokens.
- Spacing via tokens (`--space-4`, `--gutter`), not magic numbers.
- Typography via composite tokens (`font: var(--text-h1)`) or individual tokens.
- Transitions use `--dur`, `--dur-fast`, `--dur-slow` with `--ease-standard` or `--ease-out`.
- Headings are frequently ALL-CAPS with `letter-spacing: var(--ls-display)`.
- No `!important`. If specificity is a problem, restructure the selectors.
- Mobile sizes exist as `--fs-*-m` tokens — use them in media queries.

## Storybook conventions

- Story file sits next to the component: `Component.stories.tsx`.
- Use `satisfies Meta<typeof Component>` pattern.
- Include `tags: ['autodocs']` for auto-generated docs.
- Title format: `'Primitives/ComponentName'` or `'Layout/ComponentName'`.
- Cover all variants as separate named exports. Use realistic TEDx content in args (e.g. "Get tickets", "Watch talks"), not "Lorem ipsum".

## Testing requirements

- Tests live in `tests/` as `ComponentName.test.tsx`.
- Use `@testing-library/react` — query by role, label, or text, not by class or test ID.
- Every component gets an axe a11y sweep via the shared `tests/a11y.test.tsx` fixture system.
- Add new components to `tests/fixtures.tsx` so they're included in the a11y sweep.
- Run `npm test` before considering any change complete.

## Accessibility

- Target: WCAG 2.1 AA.
- Use semantic HTML elements (`<nav>`, `<button>`, `<dialog>`) before reaching for ARIA.
- All interactive elements must be keyboard-navigable.
- Focus states use `--focus-ring` (TEDx red) for visibility on dark backgrounds.
- Decorative elements get `aria-hidden="true"`.
- Color contrast: note that CSS custom properties don't resolve in jsdom, so `color-contrast` axe rule is disabled in tests. Verify contrast manually or in Storybook.

## TEDx brand rules

- **TEDx red is `#EB0028`.** Do not alter brand colors.
- **Logo backgrounds**: the Logo component must only render on black (`#000`) or white (`#FFF`) backgrounds per TEDx guidelines. This is enforced by lint rules.
- **Required content**: legal/disclaimer text constants live in `components/core/tedx-required-content.ts`. These are mandated by the TEDx organizer guide and must appear on the website.
- **Typography**: Helvetica is the brand font. Don't introduce other typefaces.
- **The "x" in TEDx**: always lowercase x, always attached. "TEDx" not "TEDX" or "Ted X".

## Adding a new component

1. Create `components/core/ComponentName.tsx` with named export and props type.
2. Create `components/core/ComponentName.module.css` using design tokens.
3. Create `components/core/ComponentName.stories.tsx` with all variants.
4. Add export to `components/core/index.ts`.
5. Add test in `tests/ComponentName.test.tsx`.
6. Add to `tests/fixtures.tsx` for a11y sweep coverage.
7. Run `npm test && npm run typecheck && npm run lint`.

## Publishing to npm

After merging changes, check if an `npm publish` is needed. A new publish is required when any file included in the package has changed. The `files` field in `package.json` determines what ships:

- `dist/` — built JS + CSS + type declarations
- `tokens/` — CSS design token files
- `styles.css` — global stylesheet
- `readme.md`, `CHANGELOG.md`

**No publish needed** for changes to: tests, config files (`tsconfig`, `vitest.config`), Storybook, scripts, `CLAUDE.md`, devDependencies, or CI.

When publishing: bump the version in `package.json` following semver (`patch` for fixes, `minor` for new components/features, `major` for breaking API changes), update `CHANGELOG.md`, then run `npm publish`. The `prepublishOnly` script will automatically lint, typecheck, test, and build before publishing.

## What to avoid

- Don't add npm dependencies without justification. The system intentionally has few deps.
- Don't refactor code unrelated to the current task.
- Don't add comments that restate what the code does.
- Don't create wrapper components or abstractions for single-use cases.
- Don't use `px` for spacing — use spacing tokens.
- Don't hardcode colors — use semantic token aliases.
- Don't add light-mode styles unless explicitly asked. The system is dark-first.
