#!/usr/bin/env node
/**
 * brand.mjs: keeps this site on the LC brand tokens.
 *
 * The brand's one source of truth is ~/Developer/brand/tokens/tokens.json, in a
 * private repo Vercel cannot see. So this repo keeps an exact copy of it in
 * src/brand/tokens.json, and builds two files from that copy:
 *
 *   src/brand/theme.mjs   colours, fonts, type sizes, spacing and radius for
 *                         tailwind.config.mjs, plus the Google Fonts address for the layout
 *   src/brand/tokens.css  the same values as CSS custom properties (--lc-*), with the
 *                         names the brand's own tokens.css uses
 *
 * Commands:
 *   npm run brand:sync    copy tokens.json from the brand repo and rebuild both files.
 *                         Stops first if a built file was edited by hand.
 *   npm run check:brand   fail if a built file does not match the copy, or (when the
 *                         brand repo is on this machine) if the copy is behind it or
 *                         tokens.css no longer matches the brand's own tokens.css.
 *                         npm run build runs it first.
 *
 * Sync also copies the brand's icon files (built from the same tokens by the brand's
 * mark/build_mark.py) into public/, and the check fails if they differ from the brand's.
 *
 * Never edit the three files in src/brand by hand: change the brand's tokens.json,
 * then sync. Set LC_BRAND_TOKENS to read tokens.json from somewhere else.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, relative } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'src', 'brand');
const COPY = join(OUT_DIR, 'tokens.json');
const SOURCE =
  process.env.LC_BRAND_TOKENS ?? join(homedir(), 'Developer', 'brand', 'tokens', 'tokens.json');
const SOURCE_CSS = join(dirname(SOURCE), 'tokens.css');
const BRAND_ROOT = dirname(dirname(SOURCE));

/** Icon files copied as they are from the brand repo: site path -> brand path. */
const ICONS = {
  [join(ROOT, 'public', 'favicon.svg')]: join(BRAND_ROOT, 'mark', 'svg', 'lc-icon.svg'),
  [join(ROOT, 'public', 'favicon-32.png')]: join(BRAND_ROOT, 'mark', 'png', 'lc-icon-32.png'),
  [join(ROOT, 'public', 'apple-touch-icon.png')]: join(BRAND_ROOT, 'mark', 'png', 'lc-icon-180.png'),
};

const rel = (p) => relative(ROOT, p);
const HEADER = 'Generated from src/brand/tokens.json by scripts/brand.mjs. Do not edit by hand.';

/**
 * Each built file's first line carries a fingerprint of the rest of the file, so
 * an edit by hand shows up even after this script or the tokens have changed.
 */
const fingerprint = (body) => createHash('sha256').update(body).digest('hex').slice(0, 12);
const COMMENT = { '.mjs': (t) => `// ${t}`, '.css': (t) => `/* ${t} */` };
const withHeader = (file, body) =>
  `${COMMENT[file.slice(file.lastIndexOf('.'))](`${HEADER} Fingerprint ${fingerprint(body)}.`)}\n${body}`;
const splitHeader = (text) => {
  const i = text.indexOf('\n');
  return [text.slice(0, i), text.slice(i + 1)];
};

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

/** Rounded the way the brand's build_tokens.py rounds, so both tokens.css files match. */
const round4 = (n) => +n.toFixed(4);
const rem = (px) => `${round4(px / 16)}rem`;

/** A web size that is phoneSize at the phone width, size at the frame width, and grows evenly between. */
function fluidSize(web, style) {
  const { phoneSize: lo, size: hi } = style;
  if (lo === hi) return rem(hi);
  const slope = (hi - lo) / (web.frame - web.phone);
  const base = lo - slope * web.phone;
  return `clamp(${rem(lo)}, ${rem(base)} + ${round4(slope * 100)}vw, ${rem(hi)})`;
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
  // `text-display` sets size, line, tracking and weight; pair it with `font-display`.
  // Colour and capitals are left to the components.
  const web = tokens.type.web;
  const fontSize = Object.fromEntries(
    Object.entries(web.styles).map(([name, st]) => {
      const rest = { lineHeight: String(st.line), fontWeight: String(st.weight) };
      if ('tracking' in st) rest.letterSpacing = `${st.tracking}em`;
      return [name, [fluidSize(web, st), rest]];
    }),
  );
  // `max-w-body` keeps body text to its measure.
  const maxWidth = Object.fromEntries(
    Object.entries(web.styles)
      .filter(([, st]) => 'measure' in st)
      .map(([name, st]) => [name, `${st.measure}ch`]),
  );
  const borderRadius = {
    small: `${tokens.radius.small}${tokens.radius.unit}`,
    medium: `${tokens.radius.medium}${tokens.radius.unit}`,
  };
  const out = (name, value) => `export const ${name} = ${JSON.stringify(value, null, 2)};\n`;
  return [
    out('colors', colors),
    out('fontFamily', fontFamily),
    out('fontSize', fontSize),
    out('maxWidth', maxWidth),
    out('spacing', spacing),
    out('borderRadius', borderRadius),
    out('fontsHref', fontsHref(tokens)),
  ].join('\n');
}

function buildCss(tokens) {
  const lines = [':root {'];
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
  const web = tokens.type.web;
  for (const [name, st] of Object.entries(web.styles)) {
    lines.push(`  --lc-type-${name}-size: ${fluidSize(web, st)};`);
    lines.push(`  --lc-type-${name}-line: ${st.line};`);
    if ('tracking' in st) lines.push(`  --lc-type-${name}-tracking: ${st.tracking}em;`);
    if ('measure' in st) lines.push(`  --lc-type-${name}-measure: ${st.measure}ch;`);
  }
  lines.push('}');
  return lines.join('\n') + '\n';
}

const OUTPUTS = {
  [join(OUT_DIR, 'theme.mjs')]: buildTheme,
  [join(OUT_DIR, 'tokens.css')]: buildCss,
};

/** Built files whose contents no longer match the fingerprint in their first line. */
function handEdited() {
  return Object.keys(OUTPUTS).filter((file) => {
    if (!existsSync(file)) return false;
    const [header, body] = splitHeader(readFileSync(file, 'utf8'));
    return !header.includes(`Fingerprint ${fingerprint(body)}.`);
  });
}

/** Built files that differ from what this script builds from the given tokens.json text. */
function stale(tokensText) {
  const tokens = JSON.parse(tokensText);
  return Object.entries(OUTPUTS)
    .filter(([file, build]) => existsSync(file) && readFileSync(file, 'utf8') !== withHeader(file, build(tokens)))
    .map(([file]) => file);
}

function fail(lines) {
  console.error(['✗ brand tokens', ...lines.map((l) => `  ${l}`)].join('\n'));
  process.exit(1);
}

function sync() {
  if (!existsSync(SOURCE)) fail([`No brand tokens at ${SOURCE}.`, 'Clone mrluisc/brand there, or set LC_BRAND_TOKENS.']);
  if (existsSync(COPY)) {
    const edited = handEdited();
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
  for (const [file, build] of Object.entries(OUTPUTS)) writeFileSync(file, withHeader(file, build(tokens)));
  for (const [site, brand] of Object.entries(ICONS)) {
    if (existsSync(brand)) copyFileSync(brand, site);
    else console.warn(`  ! no ${brand}; ${rel(site)} left as it is`);
  }
  console.log(
    `✓ brand tokens ${before === text ? 'already current' : 'synced'} from ${SOURCE}\n` +
      `  wrote ${[COPY, ...Object.keys(OUTPUTS), ...Object.keys(ICONS)].map(rel).join(', ')}`,
  );
}

function check() {
  if (!existsSync(COPY)) fail([`${rel(COPY)} is missing. Run npm run brand:sync.`]);
  const text = readFileSync(COPY, 'utf8');
  const problems = [];
  for (const file of [...Object.keys(OUTPUTS), ...Object.keys(ICONS)]) {
    if (!existsSync(file)) problems.push(`${rel(file)} is missing. Run npm run brand:sync.`);
  }
  for (const [site, brand] of Object.entries(ICONS)) {
    if (existsSync(site) && existsSync(brand) && !readFileSync(site).equals(readFileSync(brand))) {
      problems.push(`${rel(site)} differs from the brand's ${rel(brand)}. Run npm run brand:sync.`);
    }
  }
  const edited = handEdited();
  for (const file of edited) problems.push(`${rel(file)} was edited by hand. Run npm run brand:sync to see.`);
  for (const file of stale(text).filter((f) => !edited.includes(f))) {
    problems.push(`${rel(file)} is out of date with ${rel(COPY)}. Run npm run brand:sync.`);
  }
  let source = 'brand repo not on this machine (normal on Vercel); checked the copy only';
  if (existsSync(SOURCE)) {
    source = `copy matches ${SOURCE}`;
    if (readFileSync(SOURCE, 'utf8') !== text) {
      problems.push(`The brand's tokens.json has changed since the last sync. Run npm run brand:sync.`);
    } else if (existsSync(SOURCE_CSS)) {
      // Same tokens should give the same variables; the first line is each file's own header.
      const ours = buildCss(JSON.parse(text));
      if (ours !== splitHeader(readFileSync(SOURCE_CSS, 'utf8'))[1]) {
        problems.push(`src/brand/tokens.css no longer matches ${SOURCE_CSS}: the two builders disagree.`);
      }
    }
  }
  if (problems.length) fail(problems);
  console.log(`✓ brand tokens: built files match the copy; ${source}`);
}

const command = process.argv[2] ?? 'check';
if (command === 'sync') sync();
else if (command === 'check') check();
else fail([`Unknown command "${command}". Use: sync | check`]);
