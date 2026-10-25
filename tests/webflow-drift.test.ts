import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

/* ============================================================
   scripts/check-webflow.js runs weekly against the live Webflow
   site (.github/workflows/webflow-drift.yml). These tests run it
   on a copy of the site's variables, and on small pages that show
   each HTML check.
   ============================================================ */

const ROOT = path.resolve(__dirname, '..');
const FIXTURE = fs.readFileSync(path.join(__dirname, 'webflow-variables.css'), 'utf8');

const run = (name: string, content: string, files: Record<string, number> = {}) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'webflow-'));
  fs.writeFileSync(path.join(dir, name), content);
  for (const [file, bytes] of Object.entries(files)) fs.writeFileSync(path.join(dir, file), Buffer.alloc(bytes));
  const { status, stdout } = spawnSync(process.execPath, ['scripts/check-webflow.js', path.join(dir, name)], {
    cwd: ROOT,
    encoding: 'utf8',
    env: { ...process.env, WEBFLOW_MAX_IMAGE_KB: '1' },
  });
  return { status, stdout };
};
const check = (css: string) => run('site.css', css);

it('passes when every variable equals its token', () => {
  expect(check(FIXTURE)).toMatchObject({ status: 0, stdout: expect.stringContaining('matches') });
});

it('reports a variable that differs from its token', () => {
  const { status, stdout } = check(FIXTURE.replace('--_tedx-ds---type--h3:32px', '--_tedx-ds---type--h3:30px'));
  expect(status).toBe(1);
  expect(stdout).toContain('`--_tedx-ds---type--h3` (desktop) is 30px; `--fs-h3` is 32px');
});

it('reports a Mobile mode value that differs', () => {
  const { status, stdout } = check(FIXTURE.replace('--_tedx-ds---layout--gutter:15px', '--_tedx-ds---layout--gutter:20px'));
  expect(status).toBe(1);
  expect(stdout).toContain('`--_tedx-ds---layout--gutter` (Mobile mode) is 20px');
});

it('compares colours by value, not by spelling', () => {
  expect(check(FIXTURE.replace('--red:#eb0028', '--red:rgb(235, 0, 40)')).status).toBe(0);
  expect(check(FIXTURE.replace('--white-70:#ffffffb3', '--white-70:#ffffff99')).status).toBe(1);
});

it('reports a variable that is missing or has no token yet', () => {
  expect(check(FIXTURE.replace('--orange-glow:#ff9b19', '')).stdout).toContain('`--orange-glow` (desktop) is missing');
  expect(check(FIXTURE.replace(':root{', ':root{--_tedx-ds---type--stat:80px;')).stdout).toContain('`--_tedx-ds---type--stat` is new in Webflow');
});

const page = (body: string, title = 'Speakers | TEDxAmsterdam') =>
  `<!doctype html><html><head><title>${title}</title><meta name="description" content="Talks at TEDxAmsterdam."></head><body>${body}</body></html>`;

it('passes a page with one h1, an eager hero, named links and the brand written right', () => {
  const html = page(
    '<nav><a href="/"><img src="logo.svg" loading="eager" alt="TEDxAmsterdam"></a></nav>' +
      '<h1>Speakers</h1><img src="hero.jpg" srcset="hero-500.jpg 500w" loading="eager" alt="On stage">' +
      '<h2>Past speakers</h2><img src="small.jpg" loading="lazy" alt="">' +
      '<a href="https://partner.nl"><img src="partner.svg" alt="Partner"></a><a href="/tickets">Get tickets</a>' +
      '<p>A TEDx event. Mail info@tedxamsterdam.nl.</p>',
  );
  expect(run('page.html', html, { 'small.jpg': 512 })).toMatchObject({ status: 0 });
});

it('reports each HTML problem once', () => {
  const html = page(
    '<h1>Speakers</h1><h1>Again</h1><img src="photo.jpg" loading="lazy" alt="Speaker"><h2>Past</h2>' +
      '<a href="https://partner.nl"><img src="logo.png" alt=""></a>' +
      '<p>TedxAmsterdam, TEDx Amsterdam and TEDX.</p>',
    'Speakers | TedxAmsterdam',
  );
  const { status, stdout } = run('page.html', html, { 'photo.jpg': 2048, 'logo.png': 512 });
  expect(status).toBe(1);
  expect(stdout).toContain('2 h1 headings instead of one');
  expect(stdout).toContain('A lazy image near the top, which delays it: photo.jpg');
  expect(stdout).toContain('A link without a name (no text, and its image has no alt) to https://partner.nl');
  expect(stdout).toContain('"TedxAmsterdam" instead of');
  expect(stdout).toContain('"TEDx Amsterdam" instead of');
  expect(stdout).toContain('"TEDX" instead of');
  expect(stdout).toContain('photo.jpg is 2 KB, with no smaller sizes (srcset)');
  expect(stdout).not.toContain('logo.png is');
  expect(stdout.match(/"TedxAmsterdam" instead of/g)).toHaveLength(1);
});
