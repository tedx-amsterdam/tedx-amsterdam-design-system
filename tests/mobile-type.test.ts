import fs from 'node:fs';
import path from 'node:path';

/* ============================================================
   Components that the mobile design sizes differently switch to
   the mobile type tokens below 768px. jsdom does not apply media
   queries, so this reads the stylesheets; the sizes themselves
   were checked in Storybook at 390px.
   ============================================================ */

const css = (component: string) => fs.readFileSync(path.resolve(__dirname, '../components/core', `${component}.module.css`), 'utf8');

const mobileBlock = (source: string) => {
  const start = source.indexOf('@media (max-width: 767px)');
  return start === -1 ? '' : source.slice(start);
};

const rule = (block: string, selector: string) => {
  const match = new RegExp(`${selector.replace('.', '\\.')}[^{]*\\{([^}]*)\\}`).exec(block);
  return match?.[1] ?? '';
};

describe.each([
  ['Tag', '.tag', '--fs-tag-m'],
  ['Tag', '.meta', '--fs-caption'],
  ['ArrowLink', '.link', '--fs-tag-m'],
  ['SectionHeader', '.title', '--fs-h2-m'],
  ['SectionHeader', '.description', '--fs-body-m'],
  ['Stat', '.lg', '--fs-stat-m'],
  ['Stat', '.label', '--fs-body-m'],
  ['MediaCard', '.title', '--fs-h4-m'],
])('%s %s on mobile', (component, selector, token) => {
  it(`uses ${token}`, () => {
    expect(rule(mobileBlock(css(component)), selector)).toContain(`font-size: var(${token})`);
  });
});
