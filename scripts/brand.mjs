#!/usr/bin/env node
/**
 * brand.mjs: keeps this site on the LC brand tokens.
 *
 * The brand's one source of truth is ~/Developer/brand/tokens/tokens.json, in a
 * private repo Vercel cannot see. So this repo keeps an exact copy of it in
 * src/brand/tokens.json, and builds two files from that copy:
 *
 *   src/brand/theme.mjs   colours, fonts, spacing and radius for tailwind.config.mjs,
 *                         plus the Google Fonts address for the layout
 *   src/brand/tokens.css  the same values as CSS custom properties (--lc-*), with the
 *                         names the brand's own tokens.css uses
 *
 * Commands:
 *   npm run brand:sync    copy tokens.json from the brand repo and rebuild both files.
 *                         Stops first if a built file was edited by hand.
 *   npm run check:brand   fail if a built file does not match the copy, or (when the
 *                         brand repo is on this machine) if the copy is behind it.
 *                         npm run build runs it first.
 *
 * Never edit the three files in src/brand by hand: change the brand's tokens.json,
 * then sync. Set LC_BRAND_TOKENS to read tokens.json from somewhere else.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'src', 'brand');
const COPY = join(OUT_DIR, 'tokens.json');
const SOURCE =
  process.env.LC_BRAND_TOKENS ?? join(homedir(), 'Developer', 'brand', 'tokens', 'tokens.json');

const rel = (p) => relative(ROOT, p);
const HEADER = 'Generated from src/brand/tokens.json by scripts/brand.mjs. Do not edit by hand.';

/** Generic fallbacks, the same ones the brand's build_tokens.py uses. Not brand values. */
const FALLBACK = {
  display: ['system-ui', 'sans-serif'],
  text: ['system-ui', 'sans-serif'],
  mono: ['ui-monospace', 'monospace'],
};
const ROLES = Object.keys(FALLBACK);

/** One Google Fonts stylesheet for every family and weight the tokens name. */
function fontsHref(tokens) {
  const weights = new Map();
  for (const role of ROLES) {
    const { family, weights: w } = tokens.font[role];
    weights.set(family, new Set([...(weights.get(family) ?? []), ...w]));
  }
  const families = [...weights].map(([family, w]) => {
    const list = [...w].sort((a, b) => a - b).join(';');
    return `family=${family.replace(/ /g, '+')}:wght@${list}`;
  });
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}

function buildTheme(tokens) {
  const colors = Object.fromEntries(
    Object.entries(tokens.color).map(([name, c]) => [name, c.$value]),
  );
  const fontFamily = Object.fromEntries(
    ROLES.map((role) => [role, [`"${tokens.font[role].family}"`, ...FALLBACK[role]]]),
  );
  // Keys mirror --lc-space-N, so `p-lc-5` and var(--lc-space-5) are the same 24 px.
  const spacing = Object.fromEntries(
    tokens.space.web.scale.map((px, i) => [`lc-${i + 1}`, `${px}${tokens.space.web.unit}`]),
  );
  const borderRadius = {
    small: `${tokens.radius.small}${tokens.radius.unit}`,
    medium: `${tokens.radius.medium}${tokens.radius.unit}`,
  };
  const out = (name, value) => `export const ${name} = ${JSON.stringify(value, null, 2)};\n`;
  return [
    `// ${HEADER}\n`,
    out('colors', colors),
    out('fontFamily', fontFamily),
    out('spacing', spacing),
    out('borderRadius', borderRadius),
    out('fontsHref', fontsHref(tokens)),
  ].join('\n');
}

function buildCss(tokens) {
  const lines = [`/* ${HEADER} */`, ':root {'];
  for (const [name, c] of Object.entries(tokens.color)) lines.push(`  --lc-${name}: ${c.$value};`);
  for (const role of ROLES) {
    const stack = [`"${tokens.font[role].family}"`, ...FALLBACK[role]].join(', ');
    lines.push(`  --lc-font-${role}: ${stack};`);
  }
  tokens.space.web.scale.forEach((px, i) =>
    lines.push(`  --lc-space-${i + 1}: ${px}${tokens.space.web.unit};`),
  );
  lines.push(`  --lc-radius-small: ${tokens.radius.small}${tokens.radius.unit};`);
  lines.push(`  --lc-radius-medium: ${tokens.radius.medium}${tokens.radius.unit};`);
  lines.push(`  --lc-stripe: ${+(tokens.motif.stripe * 100).toFixed(6)}%;  /* of the frame width */`);
  lines.push(`  --lc-period: ${+(tokens.motif.period * 100).toFixed(6)}%;`);
  lines.push('}');
  return lines.join('\n') + '\n';
}

const OUTPUTS = {
  [join(OUT_DIR, 'theme.mjs')]: buildTheme,
  [join(OUT_DIR, 'tokens.css')]: buildCss,
};

/** Built files that differ from what the given tokens.json text would build. */
function handEdited(tokensText) {
  const tokens = JSON.parse(tokensText);
  return Object.entries(OUTPUTS)
    .filter(([file, build]) => existsSync(file) && readFileSync(file, 'utf8') !== build(tokens))
    .map(([file]) => file);
}

function fail(lines) {
  console.error(['✗ brand tokens', ...lines.map((l) => `  ${l}`)].join('\n'));
  process.exit(1);
}

function sync() {
  if (!existsSync(SOURCE)) fail([`No brand tokens at ${SOURCE}.`, 'Clone mrluisc/brand there, or set LC_BRAND_TOKENS.']);
  if (existsSync(COPY)) {
    const edited = handEdited(readFileSync(COPY, 'utf8'));
    if (edited.length) {
      fail([
        'These built files were edited by hand, so syncing would throw the edits away:',
        ...edited.map((f) => `  ${rel(f)}`),
        'Look at the edits (git diff). Move anything worth keeping into the brand\'s',
        'tokens.json, then `git checkout` or delete the file and sync again.',
      ]);
    }
  }
  const text = readFileSync(SOURCE, 'utf8');
  const before = existsSync(COPY) ? readFileSync(COPY, 'utf8') : null;
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(COPY, text);
  const tokens = JSON.parse(text);
  for (const [file, build] of Object.entries(OUTPUTS)) writeFileSync(file, build(tokens));
  console.log(
    `✓ brand tokens ${before === text ? 'already current' : 'synced'} from ${SOURCE}\n` +
      `  wrote ${[COPY, ...Object.keys(OUTPUTS)].map(rel).join(', ')}`,
  );
}

function check() {
  if (!existsSync(COPY)) fail([`${rel(COPY)} is missing. Run npm run brand:sync.`]);
  const text = readFileSync(COPY, 'utf8');
  const problems = [];
  for (const file of Object.keys(OUTPUTS)) {
    if (!existsSync(file)) problems.push(`${rel(file)} is missing. Run npm run brand:sync.`);
  }
  for (const file of handEdited(text)) {
    problems.push(`${rel(file)} does not match ${rel(COPY)}: edited by hand?`);
  }
  let source = 'brand repo not on this machine (normal on Vercel); checked the copy only';
  if (existsSync(SOURCE)) {
    source = `copy matches ${SOURCE}`;
    if (readFileSync(SOURCE, 'utf8') !== text) {
      problems.push(`The brand's tokens.json has changed since the last sync. Run npm run brand:sync.`);
    }
  }
  if (problems.length) fail(problems);
  console.log(`✓ brand tokens: built files match the copy; ${source}`);
}

const command = process.argv[2] ?? 'check';
if (command === 'sync') sync();
else if (command === 'check') check();
else fail([`Unknown command "${command}". Use: sync | check`]);
