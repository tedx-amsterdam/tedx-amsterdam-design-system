// Checks the npm distribution built by build-dist.js before it ships:
// every module exists, client components keep 'use client' and nothing
// else has it, no module bundles a copy of another component, and every
// class name a module uses is in dist/index.css.
// Run: node scripts/check-dist.js (after npm run build:dist)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');
const CORE = join(ROOT, 'components/core');
const DIST = join(ROOT, 'dist');

const read = (path) => {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return undefined;
  }
};
const DIRECTIVE = /^['"]use client['"]/;

const modules = [...readFileSync(join(CORE, 'index.ts'), 'utf8').matchAll(/from '\.\/([A-Za-z-]+)'/g)].map(
  ([, name]) => name,
);
const css = readFileSync(join(DIST, 'index.css'), 'utf8');
const problems = [];

for (const name of modules) {
  const source = read(join(CORE, `${name}.tsx`)) ?? read(join(CORE, `${name}.ts`));
  if (source === undefined) {
    problems.push(`index.ts exports ./${name}, but components/core has no ${name}.tsx or ${name}.ts`);
    continue;
  }
  const built = read(join(DIST, `${name}.js`));
  if (built === undefined) {
    problems.push(`dist/${name}.js is missing`);
    continue;
  }
  if (DIRECTIVE.test(source) !== DIRECTIVE.test(built)) {
    problems.push(`dist/${name}.js: 'use client' ${DIRECTIVE.test(source) ? 'missing' : 'not in the source'}`);
  }
  for (const [, file] of built.matchAll(/^\/\/ components\/core\/([A-Za-z-]+)\.tsx?$/gm)) {
    if (file !== name) problems.push(`dist/${name}.js bundles a copy of ${file}`);
  }
  for (const [, className] of built.matchAll(/: "([A-Za-z]+_[A-Za-z0-9_-]+)"/g)) {
    if (!css.includes(`.${className}`)) problems.push(`dist/${name}.js: .${className} is not in dist/index.css`);
  }
}

const exported = [...readFileSync(join(DIST, 'index.js'), 'utf8').matchAll(/from '\.\/([A-Za-z-]+)\.js'/g)];
if (exported.length !== modules.length) problems.push(`dist/index.js re-exports ${exported.length} of ${modules.length} modules`);

for (const problem of problems) console.error(problem);
if (problems.length > 0) process.exit(1);
console.log(`✓ dist/ checked: ${modules.length} modules`);
