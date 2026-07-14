// Builds the npm distribution: dist/index.js (ESM) + dist/index.css.
// React/ReactDOM stay external — they are peerDependencies.
// Run: node scripts/build-dist.js
import { buildSync } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');

buildSync({
  entryPoints: [join(ROOT, 'components/core/index.ts')],
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
  outfile: join(ROOT, 'dist/index.js'),
  logLevel: 'warning',
});

console.log('✓ dist/index.js + dist/index.css built');
