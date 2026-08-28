#!/usr/bin/env node
/**
 * Render every package's share card with a real browser engine.
 *
 * Not next/og. Satori, which sits behind it, joins Arabic glyphs but reverses
 * word order inside a pure-Arabic string — tested 2026-08-28, "سعر تجريبي" came
 * out "تجريبي سعر". Arabic is the design lead on this project, so a backwards
 * card is not a card. Chromium lays out the same HTML the site already renders,
 * with the same font, and gets it right.
 *
 * Usage:  node scripts/build-share-cards.mjs [baseUrl]
 * Writes: public/share/<lang>/<slug>.png
 */

import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import puppeteer from 'puppeteer-core';

const BASE = process.argv[2] || process.env.CARD_BASE_URL || 'http://localhost:3000';
const LOCALES = ['en', 'ar', 'fr'];
const OUT = join(process.cwd(), 'public', 'share');

/** Use whatever Chromium is already on the machine. Downloading a browser to
 *  render twelve images would be the wrong trade. */
async function findChrome() {
  const cache = join(homedir(), '.cache', 'puppeteer', 'chrome-headless-shell');
  if (existsSync(cache)) {
    const builds = (await readdir(cache)).sort().reverse();
    for (const b of builds) {
      const p = join(cache, b, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell');
      if (existsSync(p)) return p;
    }
  }
  for (const p of [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ]) if (existsSync(p)) return p;
  throw new Error('No Chromium found. Install Chrome or run: npx puppeteer browsers install chrome-headless-shell');
}

async function slugs() {
  const res = await fetch(`${BASE}/api/share-slugs`);
  if (!res.ok) throw new Error(`Could not list packages: ${res.status}. Is the dev server running at ${BASE}?`);
  return res.json();
}

const main = async () => {
  const list = await slugs();
  const exe = await findChrome();
  console.log(`chromium: ${exe}`);
  console.log(`packages: ${list.length}`);

  const browser = await puppeteer.launch({
    executablePath: exe,
    headless: true,
    args: ['--no-sandbox', '--font-render-hinting=none', '--force-color-profile=srgb'],
  });

  let made = 0;
  try {
    for (const locale of LOCALES) {
      await mkdir(join(OUT, locale), { recursive: true });
      const page = await browser.newPage();
      // deviceScaleFactor 1: the card is authored at its final pixel size, so
      // scaling up would only inflate the file past WhatsApp's 600KB ceiling.
      await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

      for (const slug of list) {
        const url = `${BASE}/${locale}/destinations/${slug}/card`;
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        await page.waitForSelector('[data-card]', { timeout: 20000 });
        // Let webfonts settle: screenshotting mid-swap ships a card in the
        // fallback face, which on Arabic means the joins are gone.
        await page.evaluate(() => document.fonts.ready);

        // Pin the card to the viewport origin before capturing. In RTL the
        // layout pushes a 1200px card away from x=0, so an element screenshot
        // clipped empty canvas and every Arabic card came out blank. A viewport
        // clip at a known origin cannot drift with direction.
        await page.evaluate(() => {
          const c = document.querySelector('[data-card]');
          document.documentElement.style.margin = '0';
          document.body.style.margin = '0';
          c.style.position = 'fixed';
          c.style.top = '0';
          c.style.left = '0';
          c.style.zIndex = '2147483647';
          // The dev overlay renders in its own portal and sat in the corner of
          // every card on the first run.
          document.querySelectorAll('nextjs-portal').forEach((n) => n.remove());
        });

        // JPEG, not PNG. A photographic card as PNG lands at 700KB to 1MB,
        // and WhatsApp shows NO image at all above 600KB — which is worse than
        // a plain link, because it looks identical to having no card.
        const buf = await page.screenshot({
          type: 'jpeg',
          quality: 82,
          clip: { x: 0, y: 0, width: 1200, height: 630 },
        });
        const out = join(OUT, locale, `${slug}.jpg`);
        await writeFile(out, buf);
        made++;
        const kb = Math.round(buf.length / 1024);
        const warn = buf.length > 600 * 1024 ? '  ⚠ over WhatsApp 600KB ceiling' : '';
        console.log(`  ${locale}/${slug}.jpg  ${kb}KB${warn}`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
  console.log(`\n${made} cards written to public/share/`);
};

main().catch((e) => { console.error(e.message); process.exit(1); });
