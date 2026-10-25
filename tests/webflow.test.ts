import fs from 'node:fs';
import path from 'node:path';

/* ============================================================
   webflow/site.css runs on the Webflow site, which has its own
   variables instead of tokens/. Each Webflow variable it uses
   mirrors a token; its fallback has to equal that token, so a
   token change that the Webflow file misses fails here.
   ============================================================ */

const ROOT = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(ROOT, 'webflow/site.css'), 'utf8');

const MIRRORS: Record<string, string[]> = {
  '--_tedx-ds---layout--content-max': ['--content-max'],
  '--_tedx-ds---layout--gutter': ['--gutter', '--gutter-m'],
  '--_tedx-ds---layout--tap-target': ['--tap-target'],
  '--_tedx-ds---type--body': ['--fs-body', '--fs-body-m'],
  '--_tedx-ds---type--meta': ['--fs-body-sm'],
  '--_tedx-ds---type--small': ['--fs-small'],
  '--red': ['--tedx-red'],
  '--orange-glow': ['--tedx-orange-glow'],
  '--white': ['--tedx-white'],
  '--white-70': ['--tedx-white-70'],
  '--white-50': ['--tedx-white-50'],
};

const tokens = new Map(
  fs
    .readdirSync(path.join(ROOT, 'tokens'))
    .flatMap((file) => [...fs.readFileSync(path.join(ROOT, 'tokens', file), 'utf8').matchAll(/(--[\w-]+):\s*([^;]+);/g)])
    .map(([, name, value]) => [name, value.trim()] as const)
    .reverse(),
);

const uses = [...css.matchAll(/var\(\s*(--[\w-]+)\s*(?:,\s*((?:[^()]|\([^()]*\))*))?\)/g)].map(([, name, fallback]) => ({
  name,
  fallback: fallback?.trim(),
}));

it('ships in the npm package', () => {
  const { files } = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  expect(files).toContain('webflow');
});

it('loads nothing from another host', () => {
  expect(css).not.toMatch(/url\(|@import/);
});

it('needs no !important', () => {
  expect(css).not.toContain('!important');
});

it('gives every variable a fallback', () => {
  expect(uses.filter(({ fallback }) => !fallback).map(({ name }) => name)).toEqual([]);
});

it('only uses Webflow variables that mirror a token', () => {
  expect([...new Set(uses.map(({ name }) => name))].filter((name) => !MIRRORS[name])).toEqual([]);
});

it.each(Object.entries(MIRRORS))('falls back to the value of %s', (name, mirrored) => {
  const values = mirrored.map((token) => tokens.get(token));
  expect(values).not.toContain(undefined);
  for (const { fallback } of uses.filter((use) => use.name === name)) {
    expect(values).toContain(fallback);
  }
});

it('takes colours from variables, not raw values', () => {
  const withoutVariables = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/var\((?:[^()]|\([^()]*\))*\)/g, 'var()');
  expect(withoutVariables).not.toMatch(/#[0-9a-f]{3,8}\b|rgba?\(/i);
});
