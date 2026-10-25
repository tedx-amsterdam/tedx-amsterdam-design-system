import fs from 'node:fs';
import path from 'node:path';

/* ============================================================
   Components take their colours from the semantic aliases in
   tokens/colors.css, never from raw values or the brand palette
   (--tedx-*), so a theme change happens in one place. The
   website runs the same kind of check on its own styles.
   ============================================================ */

const CORE = path.resolve(__dirname, '../components/core');
const stylesheets = fs.readdirSync(CORE).filter((file) => file.endsWith('.module.css'));

const lineOf = (source: string, index: number) => source.slice(0, index).split('\n').length;

function declarations(source: string) {
  // Comments are blanked rather than removed, so line numbers stay right.
  const css = source.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));
  return [...css.matchAll(/([a-z-]+)\s*:\s*([^;{}]+)(?=[;}])/g)].map((match) => ({
    property: match[1],
    value: match[2].trim(),
    line: lineOf(css, match.index),
  }));
}

// Named colours: the basic set and the common extras, not all 148.
const RAW_COLOR =
  /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(|(?<![\w-])(?:black|white|red|green|blue|yellow|orange|purple|pink|gray|grey|silver|maroon|navy|teal|aqua|cyan|fuchsia|magenta|lime|olive)(?![\w-])/i;
const PALETTE = /var\(--tedx-/;

function violations(source: string): string[] {
  return declarations(source).flatMap(({ property, value, line }) => {
    const found: string[] = [];
    if (RAW_COLOR.test(value)) found.push(`raw colour in ${property}`);
    if (PALETTE.test(value)) found.push(`palette token in ${property}`);
    if (value.includes('!important')) found.push(`!important in ${property}`);
    return found.map((problem) => `line ${line}: ${problem}: ${value}`);
  });
}

it('finds raw colours, palette tokens and !important, and skips comments', () => {
  const css = [
    '/* color: #fff */',
    '.a { color: var(--text-primary); border-bottom: 1px solid var(--border-hairline); }',
    '.b { color: #ff0000; background: var(--tedx-red); }',
    '.c { background: rgb(0 0 0) !important; color: white; }',
  ].join('\n');
  expect(violations(css)).toEqual([
    'line 3: raw colour in color: #ff0000',
    'line 3: palette token in background: var(--tedx-red)',
    'line 4: raw colour in background: rgb(0 0 0) !important',
    'line 4: !important in background: rgb(0 0 0) !important',
    'line 4: raw colour in color: white',
  ]);
});

describe.each(stylesheets)('%s', (file) => {
  it('uses semantic colour tokens, without !important', () => {
    expect(violations(fs.readFileSync(path.join(CORE, file), 'utf8'))).toEqual([]);
  });
});
