// scripts/build-website.js
// Pre-compiles website JSX (global-style, no modules) via esbuild.
// Eliminates the ~1 MB Babel standalone script from the browser.
// Run: node scripts/build-website.js
import { transformSync } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const WEBSITE = join(__dir, '..', 'ui_kits', 'website');

// Files loaded in this exact order (mirrors the <script> tag order in index.html)
const FILES = [
  'ui.jsx',
  'Header.jsx',
  'Footer.jsx',
  'HomeSections.jsx',
  'Home.jsx',
  'Pages.jsx',
  'Pages2.jsx',
  'EventProgram.jsx',
  'SpeakerPage.jsx',
  'BlogPage.jsx',
  'App.jsx',
];

// Preamble: expose React globals so the JSX files can use them without import
const PREAMBLE = [
  'var React = window.React;',
  'var ReactDOM = window.ReactDOM;',
  'var { useState, useEffect, useRef, useCallback, useId, useMemo, createContext, useContext } = React;',
].join('\n') + '\n\n';

const source = PREAMBLE + FILES
  .map((f) => {
    let content = readFileSync(join(WEBSITE, f), 'utf8');
    // Strip any top-level React hook destructuring that would conflict with the preamble
    content = content.replace(/^(?:const|let|var)\s*\{[^}]*\}\s*=\s*React\s*;?\s*\n/gm, '');
    return `// ${f}\n` + content;
  })
  .join('\n\n');

const { code } = transformSync(source, {
  loader: 'jsx',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  define: { 'process.env.NODE_ENV': '"production"' },
});

const bundle = `(function () {\n'use strict';\n${code}\n})();\n`;

writeFileSync(join(WEBSITE, 'bundle.js'), bundle);
console.log(`\u2713 Website bundled: ${FILES.length} files \u2192 ui_kits/website/bundle.js`);
