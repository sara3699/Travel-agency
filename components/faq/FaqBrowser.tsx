'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { FaqCategory } from '@/lib/faq';

/**
 * Arabic normalisation before matching.
 *
 * A reader who types "الاسعار" must find "الأسعار". Alef forms, taa marbuta,
 * alef maqsura, tatweel and the diacritics all have to collapse, and
 * Arabic-Indic digits have to fold to Latin, or search silently fails for the
 * locale the site is designed around. This is the whole reason the search is
 * client-side rather than a naive substring test on the server.
 */
function normalise(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ً-ْـ]/g, '')      // harakat and tatweel
    .replace(/[آأإٱ]/g, 'ا') // alef forms -> bare alef
    .replace(/ى/g, 'ي')                // alef maqsura -> ya
    .replace(/ة/g, 'ه')                // taa marbuta -> ha
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function FaqBrowser({ categories, askHref }: { categories: FaqCategory[]; askHref: string }) {
  const t = useTranslations('faq');
  const [q, setQ] = useState('');

  const needle = normalise(q);
  const shown = useMemo(() => {
    if (!needle) return categories;
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) => normalise(i.q).includes(needle) || normalise(i.a).includes(needle),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, needle]);

  const count = shown.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      <div className="faq__search">
        <label htmlFor="faq-q">{t('search')}</label>
        <input
          id="faq-q"
          type="search"
          className="field"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('searchHint')}
          autoComplete="off"
        />
        <p className="faq__count" aria-live="polite">
          {needle ? t('results', { n: count }) : ''}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="faq__empty">
          {t('noResults')} <a className="linklike" href={askHref}>{t('ask')}</a>
        </p>
      ) : (
        shown.map((c) => (
          <section className="faq__topic" key={c.id} id={c.id}>
            <h2 className="faq__topicH">{c.title}</h2>
            <p className="faq__topicBlurb">{c.blurb}</p>
            <div className="faq__list">
              {c.items.map((i, n) => (
                <details className="qa" key={n} open={Boolean(needle)}>
                  <summary className="qa__q">{i.q}</summary>
                  <p className="qa__a">{i.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
