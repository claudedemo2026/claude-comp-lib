// Generates src/tokens/_generated-theme.scss from src/tokens/theme.json.
// theme.json is the source of truth; never edit the generated file by hand.
//   node scripts/build-tokens.mjs          write the file
//   node scripts/build-tokens.mjs --check  exit 1 if the file is out of date
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../src/tokens/', import.meta.url);
const inputPath = fileURLToPath(new URL('theme.json', root));
const outputPath = fileURLToPath(new URL('_generated-theme.scss', root));

const theme = JSON.parse(readFileSync(inputPath, 'utf8'));

// Generic fallbacks appended to each font family, keyed by theme.json role.
const FONT_FALLBACKS = {
  financials: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  default: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
};

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const px = (n) => (n === 0 ? '0' : `${n}px`);
const rem = (n) => (n === 0 ? '0' : `${+(n / 16).toFixed(4)}rem`);

/** Flatten nested objects into { 'a-b-c': value }. */
function flatten(obj, prefix = '') {
  return Object.entries(obj).reduce((out, [key, value]) => {
    const name = prefix ? `${prefix}-${kebab(key)}` : kebab(key);
    return typeof value === 'object' && value !== null
      ? { ...out, ...flatten(value, name) }
      : { ...out, [name]: value };
  }, {});
}

function sassMap(name, entries, format = (v) => v) {
  const body = Object.entries(entries)
    .map(([k, v]) => `  '${k}': ${format(v, k)},`)
    .join('\n');
  return `$${name}: (\n${body}\n);\n`;
}

const required = ['colors', 'borderRadius', 'borderWidth', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'opacity'];
for (const key of required) {
  if (!(key in theme)) throw new Error(`theme.json is missing "${key}"`);
}

const output = [
  '// ─────────────────────────────────────────────────────────────────────────────',
  '// GENERATED from theme.json by scripts/build-tokens.mjs. Do not edit by hand.',
  '// Run `npm run tokens` after changing theme.json.',
  '// ─────────────────────────────────────────────────────────────────────────────',
  '',
  `$name: '${theme.themeName}';`,
  `$mode: '${theme.mode}';`,
  '',
  sassMap('colors', flatten(theme.colors), (v) => v.toLowerCase()),
  sassMap('radius', theme.borderRadius, px),
  sassMap('border-width', theme.borderWidth, px),
  sassMap('font-family', theme.fontFamily, (v, k) => `('${v}', ${FONT_FALLBACKS[k] ?? FONT_FALLBACKS.default})`),
  sassMap('font-size', theme.fontSize, rem),
  sassMap('font-weight', theme.fontWeight),
  sassMap('line-height', theme.lineHeight, rem),
  sassMap('opacity', theme.opacity),
].join('\n');

if (process.argv.includes('--check')) {
  const current = existsSync(outputPath) ? readFileSync(outputPath, 'utf8') : '';
  if (current !== output) {
    console.error('src/tokens/_generated-theme.scss is out of date. Run `npm run tokens`.');
    process.exit(1);
  }
} else {
  writeFileSync(outputPath, output);
  console.log('Wrote src/tokens/_generated-theme.scss');
}
