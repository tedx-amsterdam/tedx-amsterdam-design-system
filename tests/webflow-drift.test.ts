import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

/* ============================================================
   scripts/check-webflow.js runs weekly against the live Webflow
   site (.github/workflows/webflow-drift.yml). These tests run it
   on a copy of the site's variables instead.
   ============================================================ */

const ROOT = path.resolve(__dirname, '..');
const FIXTURE = fs.readFileSync(path.join(__dirname, 'webflow-variables.css'), 'utf8');

const check = (css: string) => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'webflow-')), 'site.css');
  fs.writeFileSync(file, css);
  const { status, stdout } = spawnSync(process.execPath, ['scripts/check-webflow.js', file], { cwd: ROOT, encoding: 'utf8' });
  return { status, stdout };
};

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
