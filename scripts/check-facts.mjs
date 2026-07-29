#!/usr/bin/env node
/**
 * check-facts.mjs — fails the build if a fact that lives in src/data/facts.ts
 * has been hardcoded into a page instead of imported.
 *
 * The 2026-07-28/29 integrity audit found that nearly every error on this site
 * was one fact stated differently on different pages. facts.ts fixed that by
 * giving each fact one home. This script keeps it fixed: it re-derives every
 * guarded literal from facts.ts at runtime, so if you change a value there the
 * guard changes with it — it can never go stale and pass vacuously.
 *
 * Run: npm run check:facts   (npm run build runs it first)
 *
 * If this fails, the fix is almost never to add an exemption. It is to import
 * the fact. Genuine homonyms (a different fact that happens to share a number)
 * go in ALLOW below, with a reason.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { facts, range, rangeProse } from '../src/data/facts.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCAN_DIR = join(ROOT, 'src', 'pages');

const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Stat cards on this site are written as `{ value: '26', label: '...' }`. A
 * bare number there carries no surrounding words for a context pattern to
 * anchor on, so match the field shape instead.
 */
const statField = (v) => `value:\\s*'${esc(v)}'`;

/**
 * Paths deliberately not scanned as bare literals, with the reason.
 * Keep this list short and justified.
 */
const UNGUARDED = {
  'person.shortName': 'appears in prose and image alt text; the full name is guarded',
  'person.nationality': 'used as a prose adjective ("Venezuelan-born", "Venezuelan immigrant")',
  'rabin.location': 'the bare word "Panama" appears throughout the career timeline',
  'current.startMonth': 'guarded jointly with startYear as the phrase "July 2026"',
  'current.startYear': 'guarded jointly with startMonth as the phrase "July 2026"',
  'aisc.startMonth': 'guarded via the rendered year ranges',
  'aisc.startYear': 'guarded via the rendered year ranges',
  'aisc.endMonth': 'guarded via the rendered year ranges',
  'aisc.endYear': 'guarded via the rendered year ranges',
  'goa.startYear': 'guarded via the rendered year ranges',
  'goa.endYear': 'guarded via the rendered year ranges',
  'vis.startYear': 'guarded via the rendered year ranges',
  'vis.endYear': 'guarded via the rendered year ranges',
  'isp.startYear': 'guarded via the rendered year ranges',
  'isp.endYear': 'guarded via the rendered year ranges',
  'rabin.startYear': 'guarded via the rendered year ranges',
  'rabin.endYear': 'guarded via the rendered year ranges',
  'people.perezTalavera.title':
    'the same phrase ("HUMAN Framework co-creator") legitimately describes Luis himself in the CV skills line',
};

/**
 * Short or ambiguous values that a bare substring search would false-positive
 * on. Each gets a context-anchored pattern built from the live value, so the
 * pattern still tracks facts.ts.
 */
const CONTEXT = {
  'current.schoolShort': (v) => `\\b${esc(v)}\\b`,
  'aisc.schoolShort': (v) => `\\b${esc(v)}\\b`,
  'goa.orgShort': (v) => `\\b${esc(v)}\\b`,
  'vis.orgShort': (v) => `\\b${esc(v)}\\b`,
  'isp.orgShort': (v) => `\\b${esc(v)}\\b`,
  'isp.roleCount': (v) => `\\b${esc(v)}\\s+(?:distinct\\s+)?roles`,
  'scale.incomingTeachers': (v) => `\\b${esc(v)}\\s+(?:new\\s+|incoming\\s+)?teachers|${statField(v)}`,
  'scale.countriesLived': (v) => `\\b${esc(v)}\\s+[Cc]ountries`,
  'survey.responses': (v) => `\\b${esc(v)}\\s+(?:teacher\\s+|educator\\s+)?responses`,
  'conferences.career': (v) => `\\b${esc(v)}\\b(?=[^]{0,60}International Conferences)`,
  'conferences.aiscTenure': (v) => `\\b${esc(v)}\\s+international conferences`,
  'curriculum.courses': (v) => `\\b${esc(v)}\\s+courses`,
  'curriculum.units': (v) => `\\b${esc(v)}\\s+(?:curriculum\\s+)?units`,
  'sevai.activities': (v) => `\\b${esc(v)}\\s+(?:community-service\\s+)?activities`,
  'discoverIndia.trips': (v) => `\\b${esc(v)}\\s+trips|${statField(v)}`,
  'discoverIndia.students': (v) => `~?\\b${esc(v)}\\b`,
  // Catches "50-page", "50 pages" and the drifted "50+ page".
  'discoverIndia.manualPages': (v) => `\\b${esc(v)}\\+?[ -]pages?\\b|${statField(v)}`,
  'assignmentSystems.programs': (v) => `\\b${esc(v)}\\s+programs`,
  'assignmentSystems.hoursSavedPerYear': (v) => `\\b${esc(v)}\\s+(?:hours|hrs)`,
  'misc.leaSchools': (v) => `\\b${esc(v)}\\s+schools`,
  'people.martin.title': (v) => `\\b${esc(v)}\\b`,
  // "MS Teacher" is a substring of the department label "All MS Teachers".
  'people.merletti.title': (v) => `\\b${esc(v)}\\b(?!s)`,
  'discoveryDay.activities': (v) => `\\b${esc(v)}\\s+activities`,
  // The two sign-up figures differ only by the "+"; keep them apart.
  'discoverIndia.signUps': (v) => `${esc(v)}\\s+(?:student\\s+|ranked-preference\\s+)?(?:sign-up\\s+)?responses|${statField(v)}`,
  'discoveryDay.signUps': (v) => `\\b${esc(v)}\\b(?!\\+)\\s+(?:student\\s+)?sign-up`,
  'steamWeek.students': (v) => `${esc(v)}\\s+students`,
  'steamWeek.workshops': (v) => `${esc(v)}\\s+prototype`,
};

/**
 * Genuine exceptions: { file, pattern source, reason }. A hit is forgiven only
 * if it is on a line matching `line`.
 */
const ALLOW = [
  // (empty — every page currently imports every fact it states)
];

/**
 * Paths matched case-sensitively, because a lowercase form of the value is
 * ordinary English rather than a claim ("middle school mathematics").
 */
const CASE_SENSITIVE = new Set(['current.division']);

/**
 * The literal guards above catch a page that re-types the CURRENT value of a
 * fact. They do not catch a page that types a DIFFERENT one — and that is the
 * failure this whole file exists to prevent: the tool count was 10+ here, 20+
 * there and 25+ somewhere else, and no two of them agreed.
 *
 * So: each entry below matches "a quantity followed by the noun it counts",
 * captures the quantity, and fails if it is not the value in facts.ts. A page
 * that says "25+ Custom Automation Tools" is caught even though facts.ts says
 * "20+" — the point is that the claim exists in prose at all.
 *
 * Nouns that count more than one thing ("students" is 700+, 150+, 237 and 400+
 * depending on the system) are deliberately absent; they are unguardable this
 * way and rely on the literal guard instead.
 */
const QUANTITY = /(\d[\d,]*(?:\.\d+)?\+?|Three|Four|Five|Six|Seven|Eight)/.source;
const CLAIMS = [
  { path: 'scale.tools', re: `${QUANTITY}\\s+(?:custom\\s+)?(?:automation\\s+)?tools?\\b` },
  { path: 'scale.facultyCoached', re: `${QUANTITY}\\s+faculty\\b` },
  { path: 'scale.leaders', re: `${QUANTITY}\\s+(?:school\\s+)?leaders\\b` },
  { path: 'scale.incomingTeachers', re: `${QUANTITY}\\s+(?:incoming|new)\\s+teachers\\b` },
  { path: 'scale.countriesVisited', re: `${QUANTITY}\\s+countries\\s+visited\\b` },
  { path: 'scale.countriesLived', re: `${QUANTITY}\\s+countries\\b(?!\\s+visited)` },
  { path: 'scale.leaMonths', re: `${QUANTITY}\\s+months\\s+of\\s+LEA\\b` },
  { path: 'survey.responses', re: `${QUANTITY}\\s+(?:teacher|educator)\\s+(?:survey\\s+)?responses\\b` },
  { path: 'survey.rating', re: `(${QUANTITY}\\/5)\\b`, whole: true },
  { path: 'conferences.career', re: `${QUANTITY}(?=[^]{0,60}International Conferences)` },
  { path: 'conferences.aiscTenure', re: `${QUANTITY}\\s+international\\s+conferences\\b` },
  { path: 'curriculum.courses', re: `${QUANTITY}\\s+courses\\b` },
  { path: 'curriculum.units', re: `${QUANTITY}\\s+(?:curriculum\\s+)?units\\b` },
  { path: 'curriculum.completion', re: `${QUANTITY}%\\s+(?:school-wide\\s+)?complet`, suffix: '%' },
  { path: 'sevai.students', re: `${QUANTITY}\\s+students\\s+(?:to|into)\\b` },
  { paths: ['sevai.activities', 'discoveryDay.activities'], re: `${QUANTITY}\\s+(?:community-service\\s+)?activities\\b` },
  { path: 'sevai.scriptLines', re: `${QUANTITY}\\s+lines?\\b` },
  { path: 'discoverIndia.trips', re: `${QUANTITY}\\s+(?:experiential\\s+)?trips\\b` },
  { path: 'discoverIndia.manualPages', re: `${QUANTITY}[ -]pages?\\b` },
  { path: 'isp.roleCount', re: `${QUANTITY}\\s+(?:distinct\\s+)?roles\\b` },
  { path: 'misc.leaSchools', re: `(eight|nine|ten|${QUANTITY})\\s+schools\\b`, whole: true },
];

const at = (path) => path.split('.').reduce((o, k) => o?.[k], facts);

/**
 * A value is safe to scan as a bare substring if it is long enough to be
 * unambiguous, or if it carries a distinctive marker ("20+", "81%", "~$7,000",
 * "4.8/5", "20–30"). A short bare integer like "26" or "7" is neither, and must
 * declare a CONTEXT pattern or an UNGUARDED reason.
 */
const MIN_BARE_LENGTH = 4;
const DISTINCTIVE = /[+%$~/–]/;
const scannableBare = (s) => s.length >= MIN_BARE_LENGTH || DISTINCTIVE.test(s);

// ── Build the guard list from the live facts object ─────────────────────────
const guards = new Map(); // pattern source -> { paths: [], flags }

function addGuard(source, path, flags = 'gi') {
  const key = `${flags}::${source}`;
  if (!guards.has(key)) guards.set(key, { source, flags, paths: [] });
  guards.get(key).paths.push(path);
}

const configErrors = [];

function walk(node, prefix = '') {
  for (const [key, value] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') {
      walk(value, path);
      continue;
    }
    if (UNGUARDED[path]) continue;

    const str = String(value);
    const flags = CASE_SENSITIVE.has(path) ? 'g' : 'gi';
    if (CONTEXT[path]) {
      addGuard(CONTEXT[path](str), path, flags);
    } else if (!scannableBare(str)) {
      configErrors.push(
        `facts.${path} ("${str}") is too short and too plain to scan as a bare ` +
          `literal — add a CONTEXT pattern or an UNGUARDED reason in scripts/check-facts.mjs.`
      );
    } else {
      // A value starting with a digit must not match inside a longer number:
      // "20+" is not a hit inside "120+ students".
      const prefix = /^\d/.test(str) ? '(?<![\\d.,])' : '';
      addGuard(prefix + esc(str), path, flags);
    }
  }
}

walk(facts);

// Year ranges are stored structured and rendered two ways. Guard both renderings.
for (const key of ['current', 'aisc', 'goa', 'vis', 'isp', 'rabin']) {
  const span = facts[key];
  if (!span?.startYear || !span?.endYear) continue;
  addGuard(esc(range(span)), `${key} year range`);
  addGuard(esc(rangeProse(span)), `${key} year range`);
}
// The current role's start is a month + year phrase, not a range.
addGuard(esc(`${facts.current.startMonth} ${facts.current.startYear}`), 'current.startMonth + startYear');

if (configErrors.length) {
  console.error('\n✗ check-facts is misconfigured:\n');
  for (const e of configErrors) console.error(`  • ${e}`);
  console.error('');
  process.exit(2);
}

// ── Scan the pages ──────────────────────────────────────────────────────────
function astroFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory()
      ? astroFiles(full)
      : full.endsWith('.astro')
        ? [full]
        : [];
  });
}

/**
 * Strip the parts of a page where a literal is not a claim: HTML comments,
 * Astro frontmatter comments, `import` lines, and `facts.foo.bar` references
 * (a reference is the correct usage, and its own path text would otherwise
 * match the guard for a short value like "aisc" or "vis").
 */
function stripNonClaims(src) {
  // Blank the text but keep newlines, so reported line numbers stay accurate.
  const blank = (m) => m.replace(/[^\n]/g, ' ');
  return src
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(/^\s*\/\/.*$/gm, blank)
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/^\s*import .*$/gm, blank)
    .replace(/\bfacts\.[A-Za-z0-9_.]+/g, blank);
}

const findings = [];

for (const file of astroFiles(SCAN_DIR)) {
  const rel = relative(ROOT, file);
  const raw = readFileSync(file, 'utf8');
  const src = stripNonClaims(raw);
  const lines = raw.split('\n');

  for (const { source, flags, paths } of guards.values()) {
    const re = new RegExp(source, flags);
    let match;
    while ((match = re.exec(src)) !== null) {
      if (match[0] === '') { re.lastIndex++; continue; }
      const lineNo = src.slice(0, match.index).split('\n').length;
      const lineText = lines[lineNo - 1] ?? '';
      const forgiven = ALLOW.some(
        (a) => a.file === rel && new RegExp(a.pattern).test(lineText)
      );
      if (forgiven) continue;
      findings.push({
        file: rel,
        line: lineNo,
        text: lineText.trim(),
        matched: match[0],
        paths,
      });
    }
  }

  // Second pass: a quantity stated in prose that disagrees with facts.ts.
  for (const claim of CLAIMS) {
    const paths = claim.paths ?? [claim.path];
    const expected = paths.map((p) => String(at(p)));
    const re = new RegExp(claim.re, 'gi');
    let match;
    while ((match = re.exec(src)) !== null) {
      const found = (match[1] ?? match[0]).trim();
      const normalise = (s) => s.replace(/[,\s]/g, '').toLowerCase();
      const ok = expected.some(
        (e) => normalise(found) === normalise(e) ||
               normalise(found) === normalise(e + (claim.suffix ?? ''))
      );
      if (ok) continue;
      const lineNo = src.slice(0, match.index).split('\n').length;
      findings.push({
        file: rel,
        line: lineNo,
        text: (lines[lineNo - 1] ?? '').trim(),
        matched: match[0].replace(/\s+/g, ' '),
        paths,
        disagreement: `states "${found}" where facts.ts says "${expected.join('" or "')}"`,
      });
    }
  }
}

if (findings.length === 0) {
  console.log(
    `✓ check-facts: ${guards.size} guarded facts, no hardcoded copies in src/pages`
  );
  process.exit(0);
}

// Dedupe by file+line+match, and report.
const seen = new Set();
console.error(`\n✗ check-facts: ${findings.length} hardcoded fact(s) found in src/pages.\n`);
console.error('  These values live in src/data/facts.ts. Import them instead of retyping them:\n');
for (const f of findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)) {
  const key = `${f.file}:${f.line}:${f.matched}`;
  if (seen.has(key)) continue;
  seen.add(key);
  const where = f.paths.map((p) => `facts.${p}`).join(' / ');
  console.error(`  ${f.file}:${f.line}`);
  console.error(
    f.disagreement
      ? `    ${f.disagreement}  →  use ${where}`
      : `    hardcoded "${f.matched}"  →  use ${where}`
  );
  console.error(`    ${f.text.slice(0, 120)}`);
  console.error('');
}
process.exit(1);
