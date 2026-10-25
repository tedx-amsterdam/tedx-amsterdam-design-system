// Checks the live Webflow site against this design system: the variables
// it compiles into its stylesheet (the "TEDx DS" collection, its Mobile
// mode and the colour palette) must equal the tokens they mirror, and
// webflow/site.css must load from the latest released version.
// Prints a Markdown report; exits 1 on drift, 2 when the site cannot be read.
// Run: node scripts/check-webflow.js [page URL or stylesheet file]
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');
const SITE = 'https://www.tedxamsterdam.nl/';
const DS = '--_tedx-ds---';

// Webflow variable: [token on desktop, token below 768px]. Colours have no Mobile mode.
const MIRRORS = {
  [`${DS}layout--content-max`]: ['--content-max', '--content-max'],
  [`${DS}layout--gutter`]: ['--gutter', '--gutter-m'],
  [`${DS}layout--header-height`]: ['--header-height', '--header-height-m'],
  [`${DS}layout--tap-target`]: ['--tap-target', '--tap-target'],
  [`${DS}shape--radius-button`]: ['--radius-button', '--radius-button'],
  [`${DS}type--display`]: ['--fs-display', '--fs-h1-m'],
  [`${DS}type--h1`]: ['--fs-h1', '--fs-h1-m'],
  [`${DS}type--h2`]: ['--fs-h2', '--fs-h2-m'],
  [`${DS}type--h3`]: ['--fs-h3', '--fs-h3-m'],
  [`${DS}type--h4`]: ['--fs-h4', '--fs-h4-m'],
  [`${DS}type--body`]: ['--fs-body', '--fs-body-m'],
  [`${DS}type--meta`]: ['--fs-body-sm', '--fs-body-sm'],
  [`${DS}type--small`]: ['--fs-small', '--fs-small'],
  [`${DS}type--caption`]: ['--fs-caption', '--fs-caption'],
  [`${DS}type--tag`]: ['--fs-tag', '--fs-tag-m'],
  '--red': ['--tedx-red'],
  '--orange-glow': ['--tedx-orange-glow'],
  '--white': ['--tedx-white'],
  '--white-70': ['--tedx-white-70'],
  '--white-50': ['--tedx-white-50'],
};

const declarations = (block) =>
  new Map([...block.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)].map(([, name, value]) => [name, value.trim()]));

const tokens = new Map();
for (const file of readdirSync(join(ROOT, 'tokens'))) {
  for (const [name, value] of declarations(readFileSync(join(ROOT, 'tokens', file), 'utf8'))) {
    if (!tokens.has(name)) tokens.set(name, value);
  }
}
const token = (name) => tokens.get(name)?.replace(/var\((--[\w-]+)\)/g, (_, ref) => token(ref));

const NAMED = { white: '#ffffff', black: '#000000', transparent: '#00000000' };

// Compares colours by their channels, so "white", "#ffffffb3" and rgba() can match.
const normalize = (value) => {
  const v = NAMED[value.toLowerCase()] ?? value.toLowerCase().replace(/\s+/g, '');
  const hex = /^#([0-9a-f]{3,8})$/.exec(v);
  if (hex) {
    const digits = hex[1].length <= 4 ? [...hex[1]].map((d) => d + d).join('') : hex[1];
    const [r, g, b, a = 255] = digits.match(/../g).map((pair) => parseInt(pair, 16));
    return `rgba(${r},${g},${b},${+(a / 255).toFixed(2)})`;
  }
  const rgb = /^rgba?\((\d+),(\d+),(\d+)(?:,([\d.]+))?\)$/.exec(v);
  if (rgb) return `rgba(${rgb[1]},${rgb[2]},${rgb[3]},${+(+(rgb[4] ?? 1)).toFixed(2)})`;
  return v;
};

async function read(source) {
  if (!/^https?:/.test(source)) return { css: readFileSync(source, 'utf8') };
  const html = await (await fetch(source)).text();
  const stylesheet = /href="([^"]+\.webflow\.[^"]*\.css)"/.exec(html)?.[1];
  if (!stylesheet) throw new Error(`no Webflow stylesheet on ${source}`);
  return { css: await (await fetch(stylesheet)).text(), html };
}

const source = process.argv[2] ?? SITE;
let site;
try {
  site = await read(source);
} catch (error) {
  console.log(`Could not read ${source}: ${error.message}`);
  process.exit(2);
}

const desktop = declarations(/:root\s*\{([^}]*)\}/.exec(site.css)?.[1] ?? '');
const mobile = declarations(/@media[^{]*max-width:\s*767px[^{]*\{\s*body\s*\{([^}]*)\}/.exec(site.css)?.[1] ?? '');
const problems = [];

for (const [variable, [desktopToken, mobileToken]] of Object.entries(MIRRORS)) {
  for (const [mode, values, name] of [['desktop', desktop, desktopToken], ['Mobile mode', mobile, mobileToken]]) {
    if (!name) continue;
    const actual = values.get(variable);
    const expected = token(name);
    if (actual === undefined) problems.push(`\`${variable}\` (${mode}) is missing; it should be ${expected} (\`${name}\`)`);
    else if (normalize(actual) !== normalize(expected)) problems.push(`\`${variable}\` (${mode}) is ${actual}; \`${name}\` is ${expected}`);
  }
}
for (const variable of new Set([...desktop.keys(), ...mobile.keys()])) {
  if (variable.startsWith(DS) && !MIRRORS[variable]) {
    problems.push(`\`${variable}\` is new in Webflow: add the token it mirrors to scripts/check-webflow.js`);
  }
}

const notes = [];
if (site.html) {
  const { version } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const loaded = /tedx-amsterdam-design-system@([\d.]+)\/webflow\/site\.css/.exec(site.html)?.[1];
  if (!loaded) notes.push('The site does not load `webflow/site.css` from the package yet.');
  else if (loaded !== version) problems.push(`The site loads \`webflow/site.css\` from ${loaded}; the latest release is ${version}`);
  else notes.push(`The site loads \`webflow/site.css\` from ${loaded}, the latest release.`);
}

console.log(problems.length ? `## Webflow differs from the design system\n` : `## Webflow matches the design system\n`);
console.log(`Checked ${source} against \`tokens/\`.\n`);
for (const line of [...problems, ...notes]) console.log(`- ${line}`);
process.exit(problems.length ? 1 : 0);
