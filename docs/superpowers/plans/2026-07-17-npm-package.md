# npm Package Publishing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the design system to npm as `tedx-amsterdam-design-system` with an automated tag-based release workflow.

**Architecture:** The package build (`dist/` ESM + types, `exports`, `files`, `prepublishOnly`) already exists. This plan adds package metadata + LICENSE, verifies the tarball, adds a GitHub Actions release workflow using npm trusted publishing (OIDC), updates the readme, and walks through the first manual publish.

**Tech Stack:** npm, GitHub Actions, esbuild/tsc (existing build), Node 22.

**Spec:** `docs/superpowers/specs/2026-07-17-npm-package-design.md`

## Global Constraints

- Package name: `tedx-amsterdam-design-system` (unscoped), version stays `1.2.0`
- License: MIT; readme must note TEDx brand assets fall under TED's brand guidelines
- ESM-only; do NOT add a CJS build
- Do NOT change `name`, `version`, `exports`, `files`, `sideEffects`, `peerDependencies`, or existing scripts in `package.json`
- Do NOT modify `.github/workflows/ci.yml`
- CI auth: npm trusted publishing (OIDC), no `NPM_TOKEN` secret
- This is config/infra work: the "test" in each task is a verification command, not a unit test

---

### Task 1: Package metadata and LICENSE file

**Files:**
- Modify: `package.json:2-4` (insert metadata fields after `"version"`)
- Create: `LICENSE`

**Interfaces:**
- Produces: `package.json` with `license`, `description`, `repository`, `homepage`, `bugs`, `keywords`, `author`; a root `LICENSE` file (npm auto-includes it in the tarball). Task 2 verifies the tarball, Task 4 references the MIT license in the readme.

- [ ] **Step 1: Add metadata fields to package.json**

In `package.json`, change the top of the file from:

```json
{
  "name": "tedx-amsterdam-design-system",
  "version": "1.2.0",
  "type": "module",
```

to:

```json
{
  "name": "tedx-amsterdam-design-system",
  "version": "1.2.0",
  "description": "TEDxAmsterdam design system: dark-first React components and CSS design tokens",
  "license": "MIT",
  "author": "Julian Aijal",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/julianaijal/tedx-amsterdam-design-system.git"
  },
  "homepage": "https://github.com/julianaijal/tedx-amsterdam-design-system#readme",
  "bugs": {
    "url": "https://github.com/julianaijal/tedx-amsterdam-design-system/issues"
  },
  "keywords": [
    "react",
    "design-system",
    "components",
    "design-tokens",
    "css",
    "accessibility",
    "tedx"
  ],
  "type": "module",
```

Leave every other field untouched.

- [ ] **Step 2: Verify package.json is valid JSON with the new fields**

Run: `npm pkg get license description repository.url`
Expected output:

```json
{
  "license": "MIT",
  "description": "TEDxAmsterdam design system: dark-first React components and CSS design tokens",
  "repository.url": "git+https://github.com/julianaijal/tedx-amsterdam-design-system.git"
}
```

- [ ] **Step 3: Create the LICENSE file**

Create `LICENSE` with exactly:

```
MIT License

Copyright (c) 2026 Julian Aijal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Note: the TEDx logo and brand name are NOT covered by this license (they belong to TED); Task 4 documents that in the readme.

- [ ] **Step 4: Verify npm picks up the LICENSE in the tarball**

Run: `npm pack --dry-run 2>&1 | grep -i license`
Expected: a line listing `LICENSE` (npm always includes LICENSE files regardless of the `files` allowlist).

- [ ] **Step 5: Commit**

```bash
git add package.json LICENSE
git commit -m "chore: add npm package metadata and MIT license"
```

---

### Task 2: Verify tarball contents and smoke-test the package

**Files:**
- No repo changes — verification only. Uses `dist/` output of `npm run build:dist`.

**Interfaces:**
- Consumes: `package.json` metadata from Task 1; existing build scripts.
- Produces: confidence the tarball is publishable. No artifacts are committed; delete the generated `.tgz` and temp dir afterwards.

- [ ] **Step 1: Rebuild dist output**

Run: `npm run build:dist`
Expected: exits 0; `dist/index.js`, `dist/index.css`, `dist/types/core/index.d.ts` exist.

- [ ] **Step 2: Inspect the full tarball listing**

Run: `npm pack --dry-run`
Expected file list contains ONLY files from these locations: `dist/**`, `tokens/*.css`, `styles.css`, `readme.md`, `CHANGELOG.md`, `LICENSE`, `package.json`.
FAIL this step if you see: `*.stories.*`, `tests/`, `storybook-static/`, `_ds_bundle.*`, `ui_kits/`, `guidelines/`, `components/`, or any `.html` file.

- [ ] **Step 3: Create the tarball and a temp consumer project**

```bash
npm pack
mkdir -p /tmp/tedx-smoke && cd /tmp/tedx-smoke
npm init -y
npm pkg set type=module
npm install react@18 react-dom@18
npm install /Users/aijal000/code/tedx-amsterdam-design-system/tedx-amsterdam-design-system-1.2.0.tgz
```

Expected: all installs exit 0.

- [ ] **Step 4: Smoke-test imports and server-render a component**

Create `/tmp/tedx-smoke/smoke.mjs`:

```js
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { Button } from 'tedx-amsterdam-design-system';
import { existsSync } from 'node:fs';

const html = renderToString(createElement(Button, null, 'Klik'));
if (!html.includes('Klik')) throw new Error('Button did not render label');

for (const p of [
  'node_modules/tedx-amsterdam-design-system/dist/index.css',
  'node_modules/tedx-amsterdam-design-system/styles.css',
  'node_modules/tedx-amsterdam-design-system/tokens/colors.css',
  'node_modules/tedx-amsterdam-design-system/dist/types/core/index.d.ts',
]) {
  if (!existsSync(p)) throw new Error(`missing ${p}`);
}
console.log('SMOKE OK:', html.slice(0, 80));
```

Run: `cd /tmp/tedx-smoke && node smoke.mjs`
Expected: prints `SMOKE OK: <button...` and exits 0.

- [ ] **Step 5: Clean up**

```bash
rm -rf /tmp/tedx-smoke
rm /Users/aijal000/code/tedx-amsterdam-design-system/tedx-amsterdam-design-system-1.2.0.tgz
```

No commit — this task changes nothing in the repo.

---

### Task 3: GitHub Actions release workflow

**Files:**
- Create: `.github/workflows/release.yml`

**Interfaces:**
- Consumes: `prepublishOnly` script in `package.json` (runs lint → typecheck → test → build:dist automatically on `npm publish`).
- Produces: a workflow that publishes to npm on any `v*` tag push via trusted publishing (OIDC). Requires the one-time npmjs.com configuration done in Task 5.

- [ ] **Step 1: Create the workflow file**

Create `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags: ['v*']

permissions:
  contents: read
  id-token: write # required for npm trusted publishing (OIDC)

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          registry-url: https://registry.npmjs.org
      # Node 22 bundles npm 10; trusted publishing needs npm >= 11.5.1
      - run: npm install -g npm@latest
      - run: npm ci
      # prepublishOnly runs lint, typecheck, tests and build:dist
      - run: npm publish
```

- [ ] **Step 2: Validate the workflow YAML**

Run: `npx --yes yaml-lint .github/workflows/release.yml 2>/dev/null || node -e "const {readFileSync}=require('fs');const yaml=require('yaml');yaml.parse(readFileSync('.github/workflows/release.yml','utf8'));console.log('YAML OK')"`

If neither tool is available, fall back to: `python3 -c "import yaml,sys;yaml.safe_load(open('.github/workflows/release.yml'));print('YAML OK')"`
Expected: `YAML OK` (or yaml-lint reporting valid).

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/release.yml
git commit -m "ci: add tag-triggered npm release workflow with trusted publishing"
```

---

### Task 4: Readme — license note and release procedure

**Files:**
- Modify: `readme.md:44` (after the npm package section) and `readme.md:229-230` (footer)

**Interfaces:**
- Consumes: MIT `LICENSE` from Task 1, `release.yml` from Task 3.
- Produces: documented release procedure and license/brand note.

- [ ] **Step 1: Add a release procedure under the npm section**

In `readme.md`, after line 44 (`React 18 or 19 is a peer dependency. The CDN IIFE bundle (\`_ds_bundle.js\`) remains available for no-build usage.`), insert:

````markdown

#### Releasing a new version

Releases are tag-driven. CI publishes to npm via trusted publishing (OIDC):

```bash
npm version minor        # bumps package.json + creates git tag vX.Y.Z
git push origin main --follow-tags
```

The `Release` workflow runs `npm publish`, which triggers `prepublishOnly`
(lint → typecheck → tests → dist build) before anything is uploaded.
````

- [ ] **Step 2: Add a license section to the footer**

In `readme.md`, change the footer:

```markdown
TEDxAmsterdam is an independent event operated under license from TED.
Original design: busy.studio. Extended by Julian Aijal.
```

to:

```markdown
## License

Code is [MIT licensed](./LICENSE). The TEDx logo, the TEDxAmsterdam name, and
event photography are **not** covered by the MIT license — they remain subject
to [TED's brand guidelines](https://www.ted.com/participate/organize-a-local-tedx-event/tedx-organizer-guide/branding-promotions).

---

TEDxAmsterdam is an independent event operated under license from TED.
Original design: busy.studio. Extended by Julian Aijal.
```

- [ ] **Step 3: Verify the markdown renders sanely**

Run: `grep -n "Releasing a new version\|## License" readme.md`
Expected: both headings found, release section before the License section.

- [ ] **Step 4: Commit**

```bash
git add readme.md
git commit -m "docs: document release procedure and license/brand boundaries"
```

---

### Task 5: First manual publish + trusted publisher configuration

**Files:**
- No repo changes. Interactive — requires the user (npm account `julian.aijal`) at the keyboard for login and npmjs.com configuration.

**Interfaces:**
- Consumes: everything from Tasks 1-4.
- Produces: `tedx-amsterdam-design-system@1.2.0` live on npm; trusted publisher configured so the Task 3 workflow can publish future tags.

- [ ] **Step 1: Push the branch/commits to GitHub**

```bash
git push origin main
```

Expected: CI (`ci.yml`) passes on the pushed commit.

- [ ] **Step 2: User logs in to npm**

Ask the user to run in their terminal: `npm login`
(Browser flow; account `julian.aijal`.)
Verify with: `npm whoami` → expected output: `julian.aijal`

- [ ] **Step 3: Publish**

Run: `npm publish`
Expected: `prepublishOnly` runs lint → typecheck → 130 tests → build:dist, then uploads. Final line contains `+ tedx-amsterdam-design-system@1.2.0`.

- [ ] **Step 4: Verify the published package**

Run: `npm view tedx-amsterdam-design-system version dist.tarball license`
Expected: version `1.2.0`, a registry tarball URL, license `MIT`.
Also ask the user to check https://www.npmjs.com/package/tedx-amsterdam-design-system shows the readme and appears under their profile.

- [ ] **Step 5: User configures trusted publishing on npmjs.com**

Ask the user to do this in the browser (cannot be done via CLI):

1. Go to https://www.npmjs.com/package/tedx-amsterdam-design-system/access
2. Under **Trusted Publisher**, choose **GitHub Actions**
3. Fill in: organization/user `julianaijal`, repository `tedx-amsterdam-design-system`, workflow filename `release.yml`, environment: leave empty
4. Save

- [ ] **Step 6: (Optional, first real release) Test the tag flow**

When the user next wants to release:

```bash
npm version patch
git push origin main --follow-tags
```

Expected: the `Release` workflow publishes the new version automatically with a provenance badge on npm.
