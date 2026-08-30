'use client';

import { useEffect, useState } from 'react';

/**
 * The performance budget, measured against the page you are reading.
 *
 * Master doc Part 7 asks for the budget "with real field data". There is no
 * field data: this site has no traffic, and PRODUCT.md lists field performance
 * data among the things that do not exist and must not be fabricated. So this
 * measures one load, on one device, on one network, and says so in the row
 * where it would otherwise be mistaken for a p75.
 *
 * The distinction is the whole point. A lab number tells you whether something
 * is plausibly within budget. Only field data tells you whether it is, for the
 * people who actually visit, on the devices they actually hold.
 */

type Row = {
  metric: string;
  budget: string;
  measured: string | null;
  verdict: 'within' | 'over' | 'unmeasured';
  note: string;
};

const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;
const ms = (n: number) => `${Math.round(n)} ms`;

export function PerfBudget() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [cached, setCached] = useState(0);
  const [dev, setDev] = useState(false);
  const [lcpReason, setLcpReason] = useState<string | null>(null);

  useEffect(() => {
    let lcp = 0;
    let cls = 0;

    const lcpObs = new PerformanceObserver((l) => {
      for (const e of l.getEntries()) lcp = e.startTime;
    });
    const clsObs = new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        const s = e as PerformanceEntry & { value: number; hadRecentInput: boolean };
        if (!s.hadRecentInput) cls += s.value;
      }
    });
    try {
      lcpObs.observe({ type: 'largest-contentful-paint', buffered: true });
      clsObs.observe({ type: 'layout-shift', buffered: true });
    } catch {
      // Safari has historically not supported these entry types. The rows below
      // report "not measurable here" rather than silently showing zero.
    }

    // Give the observers a moment past load before reading them: LCP is not
    // final until the page stops changing, and reading it immediately reports
    // whatever painted first.
    // Chrome emits no LCP entry at all for a document that was never visible,
    // and none for a soft navigation, because there is no new paint to be
    // largest. Both produce an empty result that looks like a broken metric,
    // so the reason is captured rather than left as a blank.
    const everHidden = document.visibilityState === 'hidden';

    const timer = setTimeout(() => {
      lcpObs.disconnect();
      clsObs.disconnect();

      setDev(process.env.NODE_ENV === 'development');
      if (!lcp) {
        setLcpReason(
          everHidden
            ? 'no entry: this tab was not visible during load, and the browser does not record a largest paint for a page nobody saw'
            : 'no entry: usually a client-side navigation, which paints no new document for the metric to measure. Reload this page directly.',
        );
      }

      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const res = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const origin = location.origin;

      const sum = (f: (r: PerformanceResourceTiming) => boolean) =>
        res.filter(f).reduce((n, r) => n + (r.transferSize || 0), 0);

      const fonts = sum((r) => r.initiatorType === 'css' && /\.(woff2?|ttf)/.test(r.name));
      const fontsAll = sum((r) => /\.(woff2?|ttf)(\?|$)/.test(r.name));
      const scripts = sum((r) => r.initiatorType === 'script');
      const thirdParty = sum((r) => !r.name.startsWith(origin) && !r.name.startsWith('data:'));
      const zeroSized = res.filter((r) => r.transferSize === 0 && r.decodedBodySize > 0).length;
      setCached(zeroSized);

      const verdict = (v: number, budget: number): Row['verdict'] => (v <= budget ? 'within' : 'over');

      setRows([
        {
          metric: 'LCP',
          budget: 'under 2.5 s at p75',
          measured: lcp ? ms(lcp) : null,
          verdict: lcp ? verdict(lcp, 2500) : 'unmeasured',
          note: 'One load on your device. A p75 needs many loads on many devices, which is field data and does not exist for this site.',
        },
        {
          metric: 'CLS',
          budget: 'under 0.1 at p75',
          measured: rowsSeen(cls),
          verdict: cls <= 0.1 ? 'within' : 'over',
          note: 'Accumulated since this page loaded, ignoring shifts that followed your own input.',
        },
        {
          metric: 'INP',
          budget: 'under 200 ms at p75',
          measured: null,
          verdict: 'unmeasured',
          note: 'Needs a real interaction to measure and a population to reach a p75. Neither is available on a page you are only reading.',
        },
        {
          metric: 'TTFB',
          budget: 'not budgeted directly',
          measured: nav ? ms(nav.responseStart - nav.requestStart) : null,
          verdict: 'unmeasured',
          note: 'Included because Part 7 names geography as the largest architectural risk: the database has no Middle East region, and round trips are what LCP is made of.',
        },
        {
          metric: 'Fonts, both scripts',
          budget: 'under 120 KB',
          measured: kb(fontsAll || fonts),
          verdict: verdict(fontsAll || fonts, 120 * 1024),
          note: 'The Arabic subset dominates this. One superfamily covers both scripts, which is why there are two families and not seven.',
        },
        {
          metric: 'Script transfer',
          budget: 'under 180 KB gzipped, listing page',
          measured: kb(scripts),
          // A development bundle is unminified and carries the dev runtime, so
          // it will always breach and comparing it to the budget is noise.
          // Reported without a verdict rather than flagged in red.
          verdict: process.env.NODE_ENV === 'development' ? 'unmeasured' : verdict(scripts, 180 * 1024),
          note:
            process.env.NODE_ENV === 'development'
              ? 'This is a development build: unminified, with the dev runtime and hot reload included. It is not comparable to the budget, which is about production bytes. Run a production build to measure this honestly.'
              : 'Measured on whichever page you are reading, which is not the listing page unless you are on it.',
        },
        {
          metric: 'Third-party on the critical path',
          budget: '0 KB',
          measured: kb(thirdParty),
          verdict: thirdParty === 0 ? 'within' : 'over',
          note: 'Anything not served from this origin. Fonts are self-hosted through the framework, so a number above zero here is worth investigating.',
        },
      ]);
    }, 600);

    return () => {
      clearTimeout(timer);
      lcpObs.disconnect();
      clsObs.disconnect();
    };
  }, []);

  if (!rows) return <p className="tokens__pending">Measuring this page…</p>;

  return (
    <div className="perf">
      <table>
        <thead>
          <tr>
            <th scope="col">Metric</th>
            <th scope="col">Budget</th>
            <th scope="col">This load</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.metric}>
              <th scope="row">
                {r.metric}
                <span className="perf__note">{r.note}</span>
              </th>
              <td className="perf__budget">{r.budget}</td>
              <td className={`perf__val perf__val--${r.verdict}`}>
                {r.measured ?? 'not measurable here'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {lcpReason && <p className="perf__foot">LCP: {lcpReason}.</p>}
      {dev && (
        <p className="perf__foot perf__foot--warn">
          Measured against a development build. Script and font byte counts are
          unminified and include the dev runtime, so treat every size here as an upper
          bound with no relationship to what a visitor would download.
        </p>
      )}
      {cached > 0 && (
        <p className="perf__foot">
          {cached} resource{cached === 1 ? ' was' : 's were'} served from your cache and
          reported a transfer size of zero, so the byte totals above are lower than a first
          visit would be. Reload with the cache disabled for the honest figure.
        </p>
      )}
    </div>
  );
}

/** CLS is unitless, and rounding it to zero decimal places hides everything. */
function rowsSeen(cls: number): string {
  return cls.toFixed(3);
}
