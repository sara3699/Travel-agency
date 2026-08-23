#!/usr/bin/env node
// FOUND-05. Physical direction properties fail the build.
//
// Retrofitting RTL into a Latin-first codebase touches every component, icon,
// animation direction and form layout. This lint is what stops the codebase
// drifting there one convenient margin-left at a time. Master doc Part 4.

import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const BANNED = [
  { re: /(^|[^-\w])margin-(left|right)\s*:/g, name: 'margin-left/right', use: 'margin-inline-start/end' },
  { re: /(^|[^-\w])padding-(left|right)\s*:/g, name: 'padding-left/right', use: 'padding-inline-start/end' },
  { re: /(^|[^-\w])(left|right)\s*:\s*[^;]/g, name: 'left/right', use: 'inset-inline-start/end' },
  { re: /text-align\s*:\s*(left|right)/g, name: 'text-align: left/right', use: 'text-align: start/end' },
  { re: /border-(left|right)(-\w+)?\s*:/g, name: 'border-left/right', use: 'border-inline-start/end' },
  { re: /flex-direction\s*:\s*row-reverse/g, name: 'row-reverse', use: 'dir attribute; row-reverse desyncs DOM from visual order' },
  { re: /\bclass(Name)?="[^"]*\b(ml-|mr-|pl-|pr-|left-|right-|text-left|text-right)/g, name: 'physical Tailwind utility', use: 'ms-/me-/ps-/pe-/start-/end-/text-start/text-end' },

  { re: /scaleX\(-1\)/g, name: 'global scaleX(-1)', use: 'per-icon mirroring; clocks and checkmarks must not flip' },
];

const ALLOW = /lint-logical-properties|node_modules|\.next/;
const files = globSync('{app,components,lib,i18n}/**/*.{ts,tsx,css}', { cwd: process.cwd() });

let failures = 0;
for (const file of files) {
  if (ALLOW.test(file)) continue;
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');
  for (const { re, name, use } of BANNED) {
    lines.forEach((line, i) => {
      if (line.trimStart().startsWith('*') || line.trimStart().startsWith('//')) return;
      re.lastIndex = 0;
      if (re.test(line)) {
        console.error(`${file}:${i + 1}  ${name}\n    → use ${use}\n    ${line.trim()}`);
        failures++;
      }
    });
  }
}

if (failures) {
  console.error(`\n✗ ${failures} physical-direction violation(s). RTL is a build-time requirement.`);
  process.exit(1);
}
console.log(`✓ ${files.length} files: logical properties only.`);

// ---------------------------------------------------------------------------
// A [dir=...] block is legitimate for TYPOGRAPHY and illegitimate for LAYOUT.
//
// Arabic genuinely needs its own line-height, family and zero tracking: ink
// runs deeper than Latin and the baseline letterform is shorter, so reusing the
// Latin scale clips descenders. That is a script fact, not a direction hack.
// What must never appear is a dir block re-doing layout, which is the second
// stylesheet that drifts within weeks.
// ---------------------------------------------------------------------------
const TYPO_OK = new Set([
  'font', 'font-family', 'font-size', 'font-weight', 'font-feature-settings',
  'font-variation-settings', 'line-height', 'letter-spacing', 'word-spacing',
  'text-transform', 'opacity', 'text-wrap', 'font-style', 'content',
]);

let dirFailures = 0;
for (const file of files) {
  if (ALLOW.test(file) || !file.endsWith('.css')) continue;
  const src = readFileSync(file, 'utf8');
  const blockRe = /\[dir=["'](?:rtl|ltr)["']\][^{]*\{([^}]*)\}/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    const line = src.slice(0, m.index).split('\n').length;
    for (const decl of m[1].split(';')) {
      const prop = decl.split(':')[0]?.trim();
      if (!prop || prop.startsWith('--')) continue;
      if (!TYPO_OK.has(prop)) {
        console.error(`${file}:${line}  [dir] block sets layout property "${prop}"\n    → direction-dependent layout belongs in logical properties, not a dir override`);
        dirFailures++;
      }
    }
  }
}
if (dirFailures) {
  console.error(`\n✗ ${dirFailures} direction-block layout violation(s).`);
  process.exit(1);
}
console.log('✓ [dir] blocks carry typography only.');
