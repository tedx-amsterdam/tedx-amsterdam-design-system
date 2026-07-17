# npm-package: tedx-amsterdam-design-system

**Datum:** 2026-07-17
**Status:** Goedgekeurd ontwerp

## Doel

Het design system publiceren als npm-package zodat developers het kunnen installeren met `npm install tedx-amsterdam-design-system`, in plaats van de repo te clonen of de CDN-bundle te gebruiken.

## Besluiten

| Vraag | Besluit |
|---|---|
| Packagenaam | `tedx-amsterdam-design-system` (unscoped; naam is vrij op npm) |
| Account | Gepubliceerd onder npm-user `julian.aijal` (eigenaar/maintainer) |
| Licentie | MIT, met readme-noot dat TEDx-merkassets onder TED's brandrichtlijnen vallen |
| Release-flow | Eerste publish handmatig; daarna GitHub Actions-workflow op git-tags `v*` |
| CI-auth | npm trusted publishing (OIDC) met provenance; geen token-secret |
| Moduleformaat | ESM-only (huidige situatie blijft; geen CJS-build) |

## Scope

### 1. Package-metadata (`package.json`)

Toevoegen:

- `"license": "MIT"`
- `"description"` — korte omschrijving van het design system
- `"repository"` — `github:julianaijal/tedx-amsterdam-design-system`
- `"homepage"` en `"bugs"`
- `"keywords"` — o.a. react, design-system, components, tedx, css-tokens
- `"author": "Julian Aijal"`

Ongewijzigd (staat al goed): `name`, `version` (1.2.0), `exports`, `files`, `sideEffects`, `peerDependencies`, `prepublishOnly` (lint → typecheck → test → build:dist).

Nieuw bestand: `LICENSE` (MIT) in de root — wordt automatisch meegenomen door npm.

### 2. Verificatie vóór publish

- `npm pack --dry-run`: controleren dat de tarball alleen bevat: `dist/`, `styles.css`, `tokens/`, `readme.md`, `CHANGELOG.md`, `LICENSE`, `package.json`. Geen stories, tests, storybook of demo-HTML.
- Smoke-test: tarball (`npm pack`) installeren in een tijdelijk Vite-project; controleren dat `import { Button } from 'tedx-amsterdam-design-system'` werkt, plus de CSS-imports (`/index.css`, `/styles.css`) en de types.

### 3. Eerste publish (handmatig)

Uitgevoerd door de gebruiker (vereist npm-login in browser):

1. `npm login`
2. `npm publish` — `prepublishOnly` draait automatisch alle checks en de dist-build

### 4. CI release-workflow (`.github/workflows/release.yml`)

- Trigger: push van tag `v*` (bijv. `v1.3.0`)
- Stappen: checkout → Node setup (registry npmjs.org) → `npm ci` → `npm publish` (met provenance)
- Auth: trusted publishing (OIDC). Na de eerste handmatige publish koppelt de gebruiker op npmjs.com de GitHub-repo + workflow als trusted publisher voor dit package. Daarna is geen `NPM_TOKEN`-secret nodig.
- De bestaande `ci.yml` blijft ongewijzigd.

### 5. Readme-update

- Installatiesectie: `npm install tedx-amsterdam-design-system` + import-voorbeeld (component + CSS)
- Releaseprocedure kort documenteren: versie bumpen, tag pushen, CI publiceert
- Licentienoot: code MIT; TEDx-logo en merknaam vallen onder TED's brandrichtlijnen

## Buiten scope

- Figma-tokenexport (JSON)
- Storybook-deployment
- CJS-build / dual-format package
- Scoped packagenaam

## Succescriteria

- `npm install tedx-amsterdam-design-system` werkt in een vers React-project; Button rendert met correcte styling en types
- Package zichtbaar op npmjs.com onder profiel `julian.aijal`
- Een `v*`-tag pushen publiceert automatisch een nieuwe versie met provenance-badge
