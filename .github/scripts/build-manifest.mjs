#!/usr/bin/env node
// Build, validate, and sync the machine-readable guidelines manifest.
//
// Usage:
//   node scripts/build-manifest.mjs validate   Check guidelines <-> manifest are in sync (CI-style, read-only).
//   node scripts/build-manifest.mjs sync        Update derived fields, assign IDs, regenerate index + JSONL.
//   node scripts/build-manifest.mjs jsonl        Only (re)write data/guidelines.jsonl from the manifest.
//
// Zero runtime dependencies: Node.js standard library only.
//
// Source of truth:
//   - Derived fields (id, category, severity, title, summary, path, url, related) come from the markdown.
//   - Enrichment fields (appliesTo, tags, detection, fix, usefulSources) are hand-authored in the manifest
//     and preserved across sync runs.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '../..');
const guidelinesDir = join(repoRoot, 'guidelines');
const manifestPath = join(repoRoot, 'data', 'guidelines.json');
const jsonlPath = join(repoRoot, 'data', 'guidelines.jsonl');
const readmePath = join(repoRoot, 'guidelines', 'README.md');

const SCHEMA_VERSION = '1.0.0';

const CATEGORY_ORDER = ['general', 'jobs', 'parameters', 'pipelines', 'stages', 'steps', 'variables'];
const CATEGORY_TITLES = {
  general: 'General',
  jobs: 'Jobs',
  parameters: 'Parameters',
  pipelines: 'Pipelines',
  stages: 'Stages',
  steps: 'Steps',
  variables: 'Variables',
};

// Title/filename prefix -> severity. Order matters: check "DO NOT" before "DO".
const PREFIX_TO_SEVERITY = [
  ['DO NOT', 'do-not'],
  ['DO', 'do'],
  ['CONSIDER', 'consider'],
  ['AVOID', 'avoid'],
];
const SEVERITY_EMOJI = { do: '\u2705', consider: '\u2705', avoid: '\u274C', 'do-not': '\u274C' };

const INDEX_BEGIN = '<!-- BEGIN GENERATED INDEX -->';
const INDEX_END = '<!-- END GENERATED INDEX -->';

function fail(msg) {
  console.error(`ERROR: ${msg}`);
}

function walkMarkdown(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walkMarkdown(full));
    } else if (name.endsWith('.md') && name.toLowerCase() !== 'readme.md') {
      out.push(full);
    }
  }
  return out;
}

function toRepoPath(absFile) {
  return '/' + relative(repoRoot, absFile).split(sep).join('/');
}

function severityFromText(text) {
  for (const [prefix, sev] of PREFIX_TO_SEVERITY) {
    if (text.startsWith(prefix + ':') || text.startsWith(prefix + ' ')) return sev;
  }
  return null;
}

// Parse a single guideline markdown file into derived fields.
function parseGuideline(absFile) {
  const repoPath = toRepoPath(absFile);
  const category = repoPath.split('/')[2];
  const raw = readFileSync(absFile, 'utf8').replace(/^\uFEFF/, '');
  const lines = raw.split(/\r?\n/);

  const errors = [];

  const h1 = lines.find((l) => /^#\s+\S/.test(l) && !/^##/.test(l));
  if (!h1) errors.push(`${repoPath}: missing H1 title`);

  // Title without emoji: strip leading "# ", then any leading non-letter chars before the prefix.
  let title = '';
  if (h1) {
    title = h1.replace(/^#\s+/, '').trim();
    // Remove a leading emoji (anything before the first uppercase letter A-Z).
    title = title.replace(/^[^A-Za-z]+/, '').trim();
  }
  const severity = title ? severityFromText(title) : null;
  if (!severity) errors.push(`${repoPath}: cannot derive severity from title "${title}"`);

  // Summary: first non-empty line after the H1.
  let summary = '';
  if (h1) {
    const idx = lines.indexOf(h1);
    for (let i = idx + 1; i < lines.length; i++) {
      const t = lines[i].trim();
      if (t.length) { summary = t; break; }
      if (lines[i].startsWith('## ')) break;
    }
  }
  if (!summary) errors.push(`${repoPath}: missing one-line summary`);

  // Canonical URL from the reference block.
  const urlMatch = raw.match(/\]\((https:\/\/github\.com\/[^)]+\.md)\)/);
  const url = urlMatch ? urlMatch[1] : '';
  if (!url) errors.push(`${repoPath}: missing canonical reference URL`);

  // Related guidelines: relative links under the "## Related guidelines" section.
  const related = [];
  const relSectionMatch = raw.match(/##\s+Related guidelines\s*\n([\s\S]*?)(\n##\s|$)/);
  if (relSectionMatch) {
    const block = relSectionMatch[1];
    const linkRe = /\]\((\/guidelines\/[^)]+\.md)\)/g;
    let m;
    while ((m = linkRe.exec(block)) !== null) related.push(m[1]);
  }

  return { repoPath, category, title, severity, summary, url, related, errors, raw };
}

function categoryCode(category) {
  return category.toUpperCase();
}

function loadManifest() {
  if (!existsSync(manifestPath)) return null;
  return JSON.parse(readFileSync(manifestPath, 'utf8'));
}

// Assign a new ID for a category, never reusing numbers seen in usedNumbers.
function nextId(category, usedNumbers) {
  const code = categoryCode(category);
  const set = usedNumbers.get(code) || new Set();
  let n = 1;
  while (set.has(n)) n++;
  set.add(n);
  usedNumbers.set(code, set);
  return `AZP-${code}-${String(n).padStart(3, '0')}`;
}

function buildEntries(mode) {
  const files = walkMarkdown(guidelinesDir).sort();
  const parsed = files.map(parseGuideline);

  const existing = loadManifest();
  const byPath = new Map();
  const usedNumbers = new Map();
  if (existing) {
    for (const g of existing.guidelines) {
      byPath.set(g.path, g);
      const m = g.id.match(/^AZP-([A-Z]+)-(\d{3})$/);
      if (m) {
        const set = usedNumbers.get(m[1]) || new Set();
        set.add(Number(m[2]));
        usedNumbers.set(m[1], set);
      }
    }
  }

  const errors = [];
  const entries = parsed.map((p) => {
    errors.push(...p.errors);
    const prior = byPath.get(p.repoPath);
    const id = prior?.id || nextId(p.category, usedNumbers);
    return {
      id,
      category: p.category,
      severity: p.severity,
      title: p.title,
      summary: p.summary,
      path: p.repoPath,
      url: p.url,
      appliesTo: prior?.appliesTo || [],
      tags: prior?.tags || [],
      related: p.related,
      detection: prior?.detection || [],
      fix: prior?.fix,
      usefulSources: prior?.usefulSources,
      _raw: p.raw,
    };
  });

  // Sort by category order, then by id.
  entries.sort((a, b) => {
    const ca = CATEGORY_ORDER.indexOf(a.category);
    const cb = CATEGORY_ORDER.indexOf(b.category);
    if (ca !== cb) return ca - cb;
    return a.id.localeCompare(b.id);
  });

  return { entries, errors, existing };
}

function stripInternal(entry) {
  const { _raw, ...rest } = entry;
  // Drop undefined optional fields so the JSON stays clean.
  if (rest.fix === undefined) delete rest.fix;
  if (rest.usefulSources === undefined) delete rest.usefulSources;
  return rest;
}

function writeManifest(entries) {
  mkdirSync(dirname(manifestPath), { recursive: true });
  const manifest = {
    $schema: '../schema/guideline-manifest.schema.json',
    schemaVersion: SCHEMA_VERSION,
    generatedBy: 'scripts/build-manifest.mjs sync',
    guidelines: entries.map(stripInternal),
  };
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

function writeJsonl(entries) {
  mkdirSync(dirname(jsonlPath), { recursive: true });
  const lines = entries.map((e) => {
    const rec = stripInternal(e);
    rec.markdown = e._raw;
    return JSON.stringify(rec);
  });
  writeFileSync(jsonlPath, lines.join('\n') + '\n', 'utf8');
}

function regenerateIndex(entries) {
  if (!existsSync(readmePath)) {
    fail(`${toRepoPath(readmePath)} not found; skipping index regeneration.`);
    return false;
  }
  const readme = readFileSync(readmePath, 'utf8');
  if (!readme.includes(INDEX_BEGIN) || !readme.includes(INDEX_END)) {
    fail(`Index markers not found in guidelines/README.md. Add:\n  ${INDEX_BEGIN}\n  ${INDEX_END}`);
    return false;
  }

  const parts = [];
  for (const category of CATEGORY_ORDER) {
    const inCat = entries.filter((e) => e.category === category);
    if (!inCat.length) continue;
    parts.push(`## ${CATEGORY_TITLES[category]}`, '');
    parts.push('| ID | Recommendation | Summary |', '| --- | --- | --- |');
    for (const e of inCat) {
      const emoji = SEVERITY_EMOJI[e.severity];
      parts.push(`| ${e.id} | [${emoji} ${e.title}](${e.path}) | ${e.summary} |`);
    }
    parts.push('');
  }

  const before = readme.slice(0, readme.indexOf(INDEX_BEGIN) + INDEX_BEGIN.length);
  const after = readme.slice(readme.indexOf(INDEX_END));
  const next = `${before}\n\n${parts.join('\n')}\n${after}`;
  writeFileSync(readmePath, next, 'utf8');
  return true;
}

function validate() {
  const { entries, errors, existing } = buildEntries('validate');
  const problems = [...errors];

  if (!existing) {
    problems.push('data/guidelines.json does not exist yet. Run: node scripts/build-manifest.mjs sync');
  } else {
    const existingByPath = new Map(existing.guidelines.map((g) => [g.path, g]));
    const parsedByPath = new Map(entries.map((g) => [g.path, g]));

    // Every markdown file must have a manifest entry, and vice versa.
    for (const p of parsedByPath.keys()) {
      if (!existingByPath.has(p)) problems.push(`Markdown without manifest entry: ${p}`);
    }
    for (const p of existingByPath.keys()) {
      if (!parsedByPath.has(p)) problems.push(`Manifest entry without markdown file: ${p}`);
    }

    // ID format + uniqueness.
    const seenIds = new Set();
    for (const g of existing.guidelines) {
      if (!/^AZP-(GENERAL|JOBS|PARAMETERS|PIPELINES|STAGES|STEPS|VARIABLES)-\d{3}$/.test(g.id)) {
        problems.push(`Invalid ID format: ${g.id} (${g.path})`);
      }
      if (seenIds.has(g.id)) problems.push(`Duplicate ID: ${g.id}`);
      seenIds.add(g.id);
    }

    // Derived fields must match the markdown.
    for (const [p, parsed] of parsedByPath) {
      const cur = existingByPath.get(p);
      if (!cur) continue;
      for (const field of ['severity', 'title', 'summary', 'url', 'category']) {
        if (cur[field] !== parsed[field]) {
          problems.push(`Field '${field}' out of sync for ${p}:\n    manifest: ${cur[field]}\n    markdown: ${parsed[field]}`);
        }
      }
      // Enrichment must be present.
      if (!cur.appliesTo || cur.appliesTo.length === 0) problems.push(`Missing appliesTo for ${cur.id} (${p})`);
      if (!cur.tags || cur.tags.length === 0) problems.push(`Missing tags for ${cur.id} (${p})`);
    }

    // Related links must resolve to existing files.
    for (const g of existing.guidelines) {
      for (const rel of g.related || []) {
        const abs = join(repoRoot, rel.replace(/^\//, ''));
        if (!existsSync(abs)) problems.push(`Broken related link in ${g.id}: ${rel}`);
      }
    }
  }

  if (problems.length) {
    console.error(`Validation failed with ${problems.length} problem(s):\n`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log(`Validation passed: ${entries.length} guidelines in sync.`);
}

function sync() {
  const { entries, errors } = buildEntries('sync');
  if (errors.length) {
    console.error('Cannot sync: markdown parsing problems:\n');
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  writeManifest(entries);
  writeJsonl(entries);
  const idx = regenerateIndex(entries);
  console.log(`Synced ${entries.length} guidelines to data/guidelines.json`);
  console.log('Wrote data/guidelines.jsonl');
  console.log(idx ? 'Regenerated guidelines/README.md index' : 'Index not regenerated (see message above)');
}

function jsonlOnly() {
  const existing = loadManifest();
  if (!existing) {
    fail('data/guidelines.json does not exist. Run sync first.');
    process.exit(1);
  }
  const entries = existing.guidelines.map((g) => {
    const abs = join(repoRoot, g.path.replace(/^\//, ''));
    return { ...g, _raw: existsSync(abs) ? readFileSync(abs, 'utf8') : '' };
  });
  writeJsonl(entries);
  console.log('Wrote data/guidelines.jsonl');
}

const mode = process.argv[2];
switch (mode) {
  case 'validate':
    validate();
    break;
  case 'sync':
    sync();
    break;
  case 'jsonl':
    jsonlOnly();
    break;
  default:
    console.error('Usage: node scripts/build-manifest.mjs <validate|sync|jsonl>');
    process.exit(2);
}
