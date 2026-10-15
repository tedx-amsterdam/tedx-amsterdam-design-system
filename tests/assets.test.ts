import fs from 'node:fs';
import path from 'node:path';

/* ============================================================
   assets/ holds what components load and placeholders for the
   stories. Sites bring their own photography.
   ============================================================ */

it('keeps only logos, icons and placeholders in assets/', () => {
  const files = fs.readdirSync(path.resolve(__dirname, '../assets'));
  expect(files.filter((file) => !/^(logo-|icon-)/.test(file) && !['sample-image.svg', 'event-hero-x.png'].includes(file))).toEqual([]);
});
