// Smoke-tests _ds_bundle.js by simulating a browser CDN environment.
// Usage: node scripts/verify-bundle.js
// Exit 0  → bundle valid, 23 components attached to window.
// Exit 1  → wrong component count or evaluation error.

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Set up minimal browser globals.  Components only touch `document` inside
// React effects / event handlers, so plain Function evaluation is sufficient.
// Use jsdom if evaluation ever genuinely requires a DOM at import time.
globalThis.window = globalThis;
window.React    = require('react');
window.ReactDOM = require('react-dom');

// Some components reference `document` at module scope (e.g. for CSS class
// name resolution in SSR guards).  Provide a lightweight stub via jsdom so
// the bundle evaluates without throwing ReferenceError.
if (typeof document === 'undefined') {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  globalThis.document = dom.window.document;
}

const bundlePath = new URL('../_ds_bundle.js', import.meta.url);
const bundleCode = readFileSync(bundlePath, 'utf8');

// Evaluate the IIFE bundle — it assigns to window.TEDxAmsterdamDesignSystem.
new Function(bundleCode)();

const ns    = window.TEDxAmsterdamDesignSystem;
const names = Object.keys(ns).filter(k => k !== '__errors');

if (names.length !== 23) {
  throw new Error(
    `expected 23 components, got ${names.length}: ${names.join(', ')}`,
  );
}

console.log('✓ bundle ok:', names.length, 'components attached to window');
console.log('  Components:', names.join(', '));
