// scripts/extend-bundle.js
// Appends new core components to _ds_bundle.js.
// Run: node scripts/extend-bundle.js
import { transformSync } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');

const NEW_COMPONENTS = [
  'Badge', 'Breadcrumb', 'Checkbox', 'FormField', 'Modal',
  'NavigationBar', 'Radio', 'Select', 'Tabs', 'Textarea', 'Toast',
];

function transformJsx(source) {
  const cleaned = source
    .replace(/^import\s+React\s+from\s+['"]react['"];?\s*\n?/gm, '')
    .replace(/^export\s+(?=function|const|class)/gm, '');
  return transformSync(cleaned, {
    loader: 'jsx',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  }).code.trim();
}

const blocks = NEW_COMPONENTS.map(name => {
  const path = `components/core/${name}.jsx`;
  let source;
  try {
    source = readFileSync(join(ROOT, path), 'utf8');
  } catch {
    throw new Error(`Cannot read ${path} — has it been created?`);
  }
  const code = transformJsx(source);
  return (
    `// ${path}\n` +
    `try { (() => {\n${code}\n__ds_scope.${name} = ${name};\n` +
    `})(); } catch (e) { __ds_ns.__errors.push({ path: "${path}", error: String((e && e.message) || e) }); }`
  );
});

const exportLines = NEW_COMPONENTS
  .map(name => `__ds_ns.${name} = __ds_scope.${name};`)
  .join('\n\n');

let bundle = readFileSync(join(ROOT, '_ds_bundle.js'), 'utf8');

// Guard against double-execution
if (bundle.includes('__ds_ns.Badge = __ds_scope.Badge;')) {
  console.log('Bundle already extended — nothing to do.');
  process.exit(0);
}

// Insert before the first __ds_ns.Accordion export line
const ANCHOR = '\n__ds_ns.Accordion = __ds_scope.Accordion;';
const pos = bundle.indexOf(ANCHOR);
if (pos === -1) throw new Error('Anchor not found in _ds_bundle.js — has the bundle already been extended?');

bundle =
  bundle.slice(0, pos) +
  '\n\n' + blocks.join('\n\n') +
  '\n\n' + exportLines +
  bundle.slice(pos);

writeFileSync(join(ROOT, '_ds_bundle.js'), bundle);
console.log(`✓ Added to bundle: ${NEW_COMPONENTS.join(', ')}`);
