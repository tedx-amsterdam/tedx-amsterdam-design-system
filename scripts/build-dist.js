// Builds the npm distribution: one ES module per component in dist/, an
// index.js that re-exports them, and dist/index.css with every style.
// React/ReactDOM stay external — they are peerDependencies.
//
// One file per component, so a component marked 'use client' keeps the
// directive and the rest stay server components in React Server Component
// frameworks (Next.js App Router). Bundling everything into one file would
// drop the directive and make every component either client or server.
//
// Run: node scripts/build-dist.js
import { build } from 'esbuild';
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');
const CORE = join(ROOT, 'components/core');
const DIST = join(ROOT, 'dist');

const shared = {
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
    '.module.css': 'local-css',
  },
  jsxImportSource: 'react',
  logLevel: 'warning',
};

// Modules index.ts re-exports: the components and the TEDx content constants.
const index = readFileSync(join(CORE, 'index.ts'), 'utf8');
const modules = [...index.matchAll(/from '\.\/([A-Za-z-]+)'/g)].map(([, name]) => name);
const sourceOf = (name) => [`${name}.tsx`, `${name}.ts`].map((file) => join(CORE, file)).find(existsSync);
const isClient = (name) => /^['"]use client['"]/.test(readFileSync(sourceOf(name), 'utf8'));

// A component that imports another one (Input uses FormField's context)
// imports its built file instead of bundling a second copy of it.
const siblingsExternal = {
  name: 'siblings-external',
  setup(builder) {
    builder.onResolve({ filter: /^\.\/[A-Za-z-]+$/ }, ({ path, importer }) => {
      const name = path.slice(2);
      if (dirname(importer) !== CORE || !modules.includes(name)) return undefined;
      return { path: `./${name}.js`, external: true };
    });
  },
};

rmSync(DIST, { recursive: true, force: true });

// Per component JavaScript. esbuild keeps a 'use client' directive at the
// top of an entry point; scripts/check-dist.js verifies it.
await build({ ...shared, entryPoints: modules.map(sourceOf), outdir: DIST, plugins: [siblingsExternal] });

// The stylesheet comes from bundling the index once. Class names match the
// per component builds because esbuild derives them from the file names.
const { outputFiles } = await build({ ...shared, entryPoints: [join(CORE, 'index.ts')], outdir: DIST, write: false });
writeFileSync(join(DIST, 'index.css'), outputFiles.find((file) => file.path.endsWith('.css')).text);

// Per component stylesheets duplicate index.css and nothing imports them.
for (const file of readdirSync(DIST)) {
  if (file.endsWith('.css') && file !== 'index.css') rmSync(join(DIST, file));
}

// Node and bundlers need the extension in ES module imports.
writeFileSync(join(DIST, 'index.js'), index.replace(/from '\.\/([A-Za-z-]+)'/g, "from './$1.js'"));

console.log(`✓ dist/ built: ${modules.length} modules (${modules.filter(isClient).length} client) + index.css`);
