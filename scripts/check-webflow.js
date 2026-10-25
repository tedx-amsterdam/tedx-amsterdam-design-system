// Checks the live Webflow site against this design system: the variables
// it compiles into its stylesheet (the "TEDx DS" collection, its Mobile
// mode and the colour palette) must equal the tokens they mirror, and
// webflow/site.css must load from the latest released version. Every page
// in the sitemap also gets a few checks on its HTML that catch what tends
// to come back with new content: oversized images, a lazy image at the top,
// more or fewer than one h1, the brand name misspelt, and links without a
// name.
// Prints a Markdown report; exits 1 on drift, 2 when the site cannot be read.
// Run: node scripts/check-webflow.js [page URL, stylesheet file or page HTML file]
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');
const SITE = 'https://www.tedxamsterdam.nl/';
const DS = '--_tedx-ds---';
// Images without srcset above this size are served at full size to every screen.
const MAX_IMAGE_KB = Number(process.env.WEBFLOW_MAX_IMAGE_KB ?? 250);

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

const attribute = (tag, name) => new RegExp(`\\s${name}="([^"]*)"`, 'i').exec(tag)?.[1];
const decode = (text) =>
  text.replace(/&nbsp;|&#160;/g, ' ').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
// Webflow prefixes uploads with asset ids and encodes spaces twice.
const fileName = (src) => {
  let name = src.split('/').pop().split('?')[0];
  for (let i = 0; i < 3 && /%[0-9a-f]{2}/i.test(name); i++) name = decodeURIComponent(name);
  return name.replace(/^(?:[0-9a-f]{24}_)+/, '');
};
const textOf = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

// The page checks look at the HTML only, so "the top of the page" is
// everything up to the first h2 after the h1: the hero on every template.
function checkPage(html) {
  const problems = [];
  const body = html.replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, '');
  const h1s = (body.match(/<h1\b/gi) ?? []).length;
  if (h1s !== 1) problems.push(`${h1s} h1 headings instead of one`);

  const h1 = body.search(/<h1\b/i);
  const firstH2 = h1 === -1 ? -1 : body.slice(h1).search(/<h2\b/i);
  const top = firstH2 === -1 ? body : body.slice(0, h1 + firstH2);
  for (const img of top.match(/<img\b[^>]*>/gi) ?? []) {
    const src = attribute(img, 'src') ?? '';
    if (attribute(img, 'loading') === 'lazy' && !/\.svg(\?|$)/i.test(src)) {
      problems.push(`A lazy image near the top, which delays it: ${fileName(src)}`);
    }
  }

  for (const [, attributes, content] of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const alts = [...content.matchAll(/<img\b[^>]*>/gi)].map(([img]) => attribute(img, 'alt') ?? '').join(' ');
    const name = [attribute(`<a ${attributes}>`, 'aria-label') ?? '', textOf(content), alts].join(' ').trim();
    if (!name) problems.push(`A link without a name (no text, and its image has no alt) to ${attribute(`<a ${attributes}>`, 'href') ?? ''}`);
  }

  const texts = [
    textOf(body.replace(/^[\s\S]*?<body\b[^>]*>/i, '')),
    textOf(/<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? ''),
    ...[...html.matchAll(/<meta\b[^>]*(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"[^>]*>/gi)].map(
      ([meta]) => decode(attribute(meta, 'content') ?? ''),
    ),
  ];
  const misspelt = new Set();
  for (const text of texts) {
    for (const [found, amsterdam] of text.matchAll(/(?<![@\w/.])ted\s*x(\s*amsterdam)?(?!\w|\.[a-z])/gi)) {
      if (found !== (amsterdam ? 'TEDxAmsterdam' : 'TEDx')) misspelt.add(found);
    }
  }
  for (const found of misspelt) problems.push(`"${found}" instead of "TEDxAmsterdam" or "TEDx"`);
  return problems;
}

// Images without srcset, so every screen downloads the file in src.
const singleSizeImages = (html) =>
  [...html.matchAll(/<img\b[^>]*>/gi)]
    .map(([img]) => img)
    .filter((img) => !attribute(img, 'srcset') && !/\.svg(\?|$)/i.test(attribute(img, 'src') ?? ''))
    .map((img) => attribute(img, 'src'))
    .filter(Boolean);

async function bytesOf(src, base) {
  if (!/^https?:/.test(base)) return statSync(join(dirname(base), src)).size;
  const response = await fetch(new URL(src, base), { method: 'HEAD' });
  return Number(response.headers.get('content-length') ?? 0);
}

async function read(source) {
  if (source.endsWith('.html')) return { pages: [[source, readFileSync(source, 'utf8')]] };
  if (!/^https?:/.test(source)) return { css: readFileSync(source, 'utf8') };
  const html = await (await fetch(source)).text();
  const stylesheet = /href="([^"]+\.webflow\.[^"]*\.css)"/.exec(html)?.[1];
  if (!stylesheet) throw new Error(`no Webflow stylesheet on ${source}`);
  const sitemap = await (await fetch(new URL('/sitemap.xml', source))).text();
  const pages = [];
  for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) pages.push([url, await (await fetch(url)).text()]);
  return { css: await (await fetch(stylesheet)).text(), html, pages };
}

const source = process.argv[2] ?? SITE;
let site;
try {
  site = await read(source);
} catch (error) {
  console.log(`Could not read ${source}: ${error.message}`);
  process.exit(2);
}

const problems = [];
const desktop = declarations(/:root\s*\{([^}]*)\}/.exec(site.css ?? '')?.[1] ?? '');
const mobile = declarations(/@media[^{]*max-width:\s*767px[^{]*\{\s*body\s*\{([^}]*)\}/.exec(site.css ?? '')?.[1] ?? '');

for (const [variable, [desktopToken, mobileToken]] of site.css === undefined ? [] : Object.entries(MIRRORS)) {
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

// Each problem once, with the pages it is on: a footer typo is on all of them.
const found = new Map();
const note = (problem, page) => found.set(problem, (found.get(problem) ?? new Set()).add(page));
const oversized = new Map();
for (const [url, html] of site.pages ?? []) {
  const page = /^https?:/.test(url) ? new URL(url).pathname : url;
  for (const problem of checkPage(html)) note(problem, page);
  for (const src of singleSizeImages(html)) {
    if (!oversized.has(src)) oversized.set(src, { bytes: await bytesOf(src, url).catch(() => 0), pages: new Set() });
    oversized.get(src).pages.add(page);
  }
}
for (const [src, { bytes, pages }] of oversized) {
  if (bytes > MAX_IMAGE_KB * 1024) {
    for (const page of pages) note(`${fileName(src)} is ${Math.round(bytes / 1024)} KB, with no smaller sizes (srcset)`, page);
  }
}
const pageCount = site.pages?.length ?? 0;
for (const [problem, pages] of found) {
  const where =
    pages.size === pageCount && pageCount > 1
      ? 'every page'
      : pages.size > 3
        ? `${pages.size} pages`
        : [...pages].map((page) => `\`${page}\``).join(', ');
  problems.push(`${problem}, on ${where}`);
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
console.log(`Checked ${source} against \`tokens/\`${site.pages ? `, and ${site.pages.length} pages for images, headings, links and the brand name` : ''}.\n`);
for (const line of [...problems, ...notes]) console.log(`- ${line}`);
process.exit(problems.length ? 1 : 0);
