// Screenshots every story of two Storybook builds (main and a pull
// request), compares them pixel by pixel and prints the part of the pull
// request comment that shows before and after for each story that changed,
// on a phone and on desktop. The Storybook preview workflow runs it
// (.github/workflows/storybook-preview.yml):
//
//   node scripts/story-screenshots.js <main url> <pull request url> <out dir> <image url base>
//
// It uses the Chrome installed on the machine (playwright-core downloads no
// browser) and compares the images inside that browser, so it needs no
// image libraries. It reports only and never fails the pull request.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

export const VIEWPORTS = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'desktop', width: 1280, height: 800 },
];

// Pixels that may differ before a story counts as changed. An absolute
// count, not a share: a 14px label turning 12px changes a few hundred
// pixels in a 390px wide page, well under 1%. Above zero, because text can
// be rasterised slightly differently between two loads.
export const CHANGED_ABOVE = 40;

// Stories captured at the same time.
const PARALLEL = 4;

export function formatComment(results, imageBase) {
  const changed = results.filter((result) => result.changed);
  const added = results.filter((result) => result.added);
  if (changed.length === 0 && added.length === 0) return '**No visible change** in any story, on a phone (390px) or desktop (1280px).';
  const lines = [];
  if (changed.length > 0) {
    lines.push(`**${changed.length} visible ${changed.length === 1 ? 'change' : 'changes'}** compared with \`main\`. \`main\` left, this pull request right.`);
    for (const result of changed) {
      lines.push(
        '',
        `#### ${result.title} on ${result.viewport} (${result.ratio < 0.001 ? 'under 0.1' : (result.ratio * 100).toFixed(1)}% of pixels)`,
        '',
        '| `main` | This pull request |',
        '| --- | --- |',
        `| <img src="${imageBase}/${result.before}" width="380"> | <img src="${imageBase}/${result.after}" width="380"> |`,
      );
    }
  }
  if (added.length > 0) {
    lines.push('', `New stories: ${[...new Set(added.map((result) => result.title))].join(', ')}.`);
  }
  return lines.join('\n');
}

async function storyIds(baseUrl) {
  const response = await fetch(`${baseUrl}/index.json`);
  const { entries } = await response.json();
  return Object.values(entries)
    .filter((entry) => entry.type === 'story')
    .map((entry) => ({ id: entry.id, title: `${entry.title} › ${entry.name}` }));
}

async function capture(browser, url, viewport) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
  await page.goto(url, { waitUntil: 'networkidle' });
  // Storybook marks the body once the story has rendered, then the
  // backgrounds addon fades the background in over some 300ms from
  // transparent, showing white until then. Wait until the story is shown
  // and the background is opaque, then for the fonts and two frames.
  await page.waitForFunction(
    () => document.body.classList.contains('sb-show-main') && getComputedStyle(document.body).backgroundColor.startsWith('rgb('),
    undefined,
    { timeout: 15000 },
  );
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  const png = await page.screenshot({ fullPage: true, animations: 'disabled' });
  await page.close();
  return png;
}

// The number and share of pixels that differ; all of them when the sizes
// differ.
async function difference(browser, a, b) {
  const page = await browser.newPage();
  const result = await page.evaluate(
    async ([first, second]) => {
      const load = (data) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = `data:image/png;base64,${data}`;
        });
      const [x, y] = await Promise.all([load(first), load(second)]);
      if (x.width !== y.width || x.height !== y.height) return { count: Infinity, ratio: 1 };
      const pixels = (image) => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height).data;
      };
      const [p, q] = [pixels(x), pixels(y)];
      let differing = 0;
      for (let i = 0; i < p.length; i += 4) {
        if (Math.abs(p[i] - q[i]) + Math.abs(p[i + 1] - q[i + 1]) + Math.abs(p[i + 2] - q[i + 2]) > 30) differing++;
      }
      return { count: differing, ratio: differing / (p.length / 4) };
    },
    [a.toString('base64'), b.toString('base64')],
  );
  await page.close();
  return result;
}

async function main([before, after, outDir, imageBase]) {
  if (!before || !after || !outDir || !imageBase) {
    console.error('usage: node scripts/story-screenshots.js <main url> <pull request url> <out dir> <image url base>');
    return 2;
  }
  mkdirSync(outDir, { recursive: true });
  const known = new Set((await storyIds(before)).map((story) => story.id));
  const browser = await chromium.launch({ channel: 'chrome' });
  const results = [];
  const compare = async (story, viewport) => {
    if (!known.has(story.id)) return { ...story, viewport: viewport.name, added: true };
    const path = `/iframe.html?id=${story.id}&viewMode=story`;
    const shoot = () => Promise.all([capture(browser, before + path, viewport), capture(browser, after + path, viewport)]);
    let [a, b] = await shoot();
    let { count, ratio } = await difference(browser, a, b);
    // A slow machine can catch a story before it has fully rendered, so
    // capture a difference once more; only one that stays counts.
    if (count > CHANGED_ABOVE) {
      [a, b] = await shoot();
      ({ count, ratio } = await difference(browser, a, b));
    }
    if (count <= CHANGED_ABOVE) return undefined;
    const name = `${story.id}-${viewport.name}`;
    writeFileSync(join(outDir, `${name}-before.png`), a);
    writeFileSync(join(outDir, `${name}-after.png`), b);
    return { ...story, viewport: viewport.name, changed: true, ratio, before: `${name}-before.png`, after: `${name}-after.png` };
  };
  try {
    const jobs = (await storyIds(after)).flatMap((story) => VIEWPORTS.map((viewport) => [story, viewport]));
    for (let i = 0; i < jobs.length; i += PARALLEL) {
      const batch = await Promise.all(jobs.slice(i, i + PARALLEL).map(([story, viewport]) => compare(story, viewport)));
      results.push(...batch.filter(Boolean));
    }
  } finally {
    await browser.close();
  }
  process.stdout.write(`${formatComment(results, imageBase)}\n`);
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = await main(process.argv.slice(2));
