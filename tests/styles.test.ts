import fs from 'node:fs';
import path from 'node:path';

/* ============================================================
   Components take their colours from the semantic aliases in
   tokens/colors.css, never from raw values or the brand palette
   (--tedx-*), and their spacing, type, radii and effects from
   tokens, so a change happens in one place. The website runs the
   same kind of check on its own styles.
   ============================================================ */

const CORE = path.resolve(__dirname, '../components/core');
const stylesheets = fs.readdirSync(CORE).filter((file) => file.endsWith('.module.css'));

const lineOf = (source: string, index: number) => source.slice(0, index).split('\n').length;

function declarations(source: string) {
  // Comments are blanked rather than removed, so line numbers stay right.
  // At-rule preludes are skipped: breakpoints are pixel values on purpose.
  const css = source
    .replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '))
    .replace(/@[a-z-]+[^{;]*/g, (prelude) => prelude.replace(/[^\n]/g, ' '));
  const lines = source.split('\n');
  return [...css.matchAll(/([a-z-]+)\s*:\s*([^;{}]+)(?=[;}])/g)].map((match) => {
    const line = lineOf(css, match.index);
    return { property: match[1], value: match[2].trim(), line, fromFigma: /\/\*\s*Figma:/.test(lines[line - 1]) };
  });
}

// Named colours: the basic set and the common extras, not all 148.
const RAW_COLOR =
  /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(|(?<![\w-])(?:black|white|red|green|blue|yellow|orange|purple|pink|gray|grey|silver|maroon|navy|teal|aqua|cyan|fuchsia|magenta|lime|olive)(?![\w-])/i;
const PALETTE = /var\(--tedx-/;
// Zero needs no token.
const LENGTH = /(?<![\w.-])-?(?:\d*\.)?(?:[1-9]\d*|0\.\d*[1-9]\d*)(?:px|rem|em|pt)\b/;
// Border and outline widths are 1 to 3px by design and have no token. A
// component's own dimensions (an icon, a logo, a column) may be raw: they
// come from the designs and are not shared. A value the designs set
// exactly, off the token scale, stays raw with a "Figma:" comment.
const MAY_USE_PIXELS =
  /^(?:border(?:-(?:top|right|bottom|left|block|inline)(?:-(?:start|end))?)?(?:-width)?|outline(?:-width)?|(?:min-|max-)?(?:width|height))$/;

function violations(source: string): string[] {
  return declarations(source).flatMap(({ property, value, line, fromFigma }) => {
    const found: string[] = [];
    if (RAW_COLOR.test(value)) found.push(`raw colour in ${property}`);
    if (PALETTE.test(value)) found.push(`palette token in ${property}`);
    if (LENGTH.test(value) && !MAY_USE_PIXELS.test(property) && !fromFigma) found.push(`raw length in ${property}`);
    if (value.includes('!important')) found.push(`!important in ${property}`);
    return found.map((problem) => `line ${line}: ${problem}: ${value}`);
  });
}

it('finds raw colours, palette tokens, raw lengths and !important, and skips the exceptions', () => {
  const css = [
    '/* color: #fff; margin: 4px */',
    '@media (max-width: 767px) {',
    '  .a { color: var(--text-primary); border-bottom: 1px solid var(--border-hairline); width: 225px; inset: min(0px, 100%) 0; }',
    '  .b { color: #ff0000; background: var(--tedx-red); margin: 12px 0; }',
    '}',
    '.c { background: rgb(0 0 0) !important; color: white; font-size: 1.5rem; }',
    '.d { gap: 5px; /* Figma: 5px */ }',
    '.e { padding: var(--space-4); border-radius: 8px; }',
  ].join('\n');
  expect(violations(css)).toEqual([
    'line 4: raw colour in color: #ff0000',
    'line 4: palette token in background: var(--tedx-red)',
    'line 4: raw length in margin: 12px 0',
    'line 6: raw colour in background: rgb(0 0 0) !important',
    'line 6: !important in background: rgb(0 0 0) !important',
    'line 6: raw colour in color: white',
    'line 6: raw length in font-size: 1.5rem',
    'line 8: raw length in border-radius: 8px',
  ]);
});

describe.each(stylesheets)('%s', (file) => {
  it('uses semantic colour tokens and spacing, type and effect tokens, without !important', () => {
    expect(violations(fs.readFileSync(path.join(CORE, file), 'utf8'))).toEqual([]);
  });
});
