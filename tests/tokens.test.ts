import fs from 'node:fs';
import path from 'node:path';

/* ============================================================
   Shipped stylesheets load nothing from other hosts: a font or
   image from a CDN sends every visitor's IP address there, and
   bundlers such as Next.js drop remote @imports without a
   warning. Local url()s must point to a file the package ships.
   ============================================================ */

const ROOT = path.resolve(__dirname, '..');
const stylesheets = ['styles.css', ...fs.readdirSync(path.join(ROOT, 'tokens')).map((file) => `tokens/${file}`)];
const urls = (css: string) => [...css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)].map(([, url]) => url);

describe.each(stylesheets)('%s', (file) => {
  const css = fs.readFileSync(path.join(ROOT, file), 'utf8');

  it('loads nothing from another host', () => {
    expect(urls(css).filter((url) => /^(https?:)?\/\//.test(url))).toEqual([]);
  });

  it('only refers to files that exist', () => {
    const missing = urls(css).filter((url) => !fs.existsSync(path.resolve(ROOT, path.dirname(file), url)));
    expect(missing).toEqual([]);
  });
});

it('ships the fonts the tokens load', () => {
  const { files } = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  expect(files).toContain('fonts');
});

it('defines every token the stylesheets and components use', () => {
  const read = (dir: string, ext: string) =>
    fs.readdirSync(path.join(ROOT, dir)).filter((file) => file.endsWith(ext)).map((file) => fs.readFileSync(path.join(ROOT, dir, file), 'utf8'));
  const sources = [...stylesheets.map((file) => fs.readFileSync(path.join(ROOT, file), 'utf8')), ...read('components/core', '.css'), ...read('components/core', '.tsx')];
  const defined = new Set(sources.flatMap((css) => [...css.matchAll(/(--[\w-]+)\s*:/g)].map(([, name]) => name)));
  const used = new Set(sources.flatMap((css) => [...css.matchAll(/var\(\s*(--[\w-]+)/g)].map(([, name]) => name)));
  expect([...used].filter((name) => !defined.has(name))).toEqual([]);
});
