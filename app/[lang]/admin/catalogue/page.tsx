import { redirect } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { getCurrentUser, isAdmin } from '@/lib/auth/session';
import { listCatalogue, minorToMajor } from '@/lib/db/catalogue';
import { money, formatMoney, scale, type CurrencyCode } from '@/lib/money';
import { daysUntil, canGoStale } from '@/lib/departures';
import cardManifest from '@/public/share/manifest.json';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default async function CataloguePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const user = await getCurrentUser();
  if (!isAdmin(user)) redirect(`/${locale}/account/sign-in`);

  const rows = await listCatalogue();

  const df = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    numberingSystem: 'latn',
    timeZone: 'UTC',
  });

  // Only a one-off can fall out of date now. A trip on a cadence computes its
  // next departure forward from the anchor, so it is always ahead and there is
  // nothing for a person to remember. Warning about those too would train
  // whoever reads this screen to ignore the warning.
  const stale = rows.filter(
    (r) => canGoStale(r.intervalDays) && (daysUntil(r.liveDeparture) ?? 0) < 0,
  );
  const soon = rows.filter((r) => {
    const d = daysUntil(r.liveDeparture);
    return canGoStale(r.intervalDays) && d !== null && d >= 0 && d < 21;
  });

  // A card is stale when it was cut from a different revision than the row now
  // holds. Compared as an exact revision rather than by timestamp, because a
  // file's mtime and a database clock are two clocks and disagree on a deploy.
  const cards = cardManifest.cards as Record<string, string | undefined>;
  const staleCards = rows.filter(
    (r) => r.status === 'published' && cards[r.slug] !== r.updatedAt,
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet sheet--wide">
        <header className="sheet__head">
          <h1 className="sheet__title">{t('cat.title')}</h1>
          <p className="sheet__lede">{t('cat.lede')}</p>
        </header>

        {stale.length > 0 && (
          <p className="cat__alert cat__alert--bad" role="alert">
            {t('cat.staleWarning', { n: stale.length })}
          </p>
        )}
        {stale.length === 0 && soon.length > 0 && (
          <p className="cat__alert">{t('cat.soonWarning', { n: soon.length })}</p>
        )}
        {staleCards.length > 0 && (
          <p className="cat__alert">
            {t('cat.cardsStale', { n: staleCards.length })}{' '}
            <code>npm run cards</code>
          </p>
        )}

        <table className="cat">
          <thead>
            <tr>
              <th scope="col">{t('cat.trip')}</th>
              <th scope="col">{t('cat.status')}</th>
              <th scope="col" className="cat__num">
                {t('cat.priceCol')}
              </th>
              <th scope="col" className="cat__num">
                {t('cat.totalCol')}
              </th>
              <th scope="col" className="cat__num">
                {t('cat.nights')}
              </th>
              <th scope="col">{t('cat.departure')}</th>
              <th scope="col">{t('cat.cadence')}</th>
              <th scope="col">{t('cat.cardCol')}</th>
              <th scope="col">
                <span className="visually-hidden">{t('cat.edit')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const d = daysUntil(r.liveDeparture);
              const past = canGoStale(r.intervalDays) && d !== null && d < 0;
              const cardStale = r.status === 'published' && cards[r.slug] !== r.updatedAt;
              return (
                <tr key={r.slug} className={past ? 'cat__row--past' : undefined}>
                  <td>
                    <span className="cat__slug">{r.slug}</span>
                    <span className="cat__iata">{r.departureIata}</span>
                  </td>
                  <td>
                    <span className={`cat__status cat__status--${r.status}`}>
                      {t(`cat.${r.status}`)}
                    </span>
                  </td>
                  <td className="cat__num">
                    {minorToMajor(r.priceMinor, r.priceCurrency)} {r.priceCurrency}
                  </td>
                  {/* Both figures, because the column the database stores and the
                      number a traveller quotes back at you are not the same one. */}
                  <td className="cat__num cat__total">
                    {formatMoney(
                      scale(money(r.priceMinor, r.priceCurrency as CurrencyCode), r.partyAdults),
                      locale,
                    )}
                    <span className="cat__party">{'\u00d7'}{r.partyAdults}</span>
                  </td>
                  <td className="cat__num">{r.nights}</td>
                  <td>
                    {r.liveDeparture ? (
                      <>
                        <time dateTime={r.liveDeparture}>
                          {df.format(new Date(`${r.liveDeparture}T00:00:00Z`))}
                        </time>
                        {past && <span className="cat__past">{t('cat.past')}</span>}
                      </>
                    ) : (
                      <span className="cat__past">{t('cat.noDate')}</span>
                    )}
                  </td>
                  <td className="cat__cadence">
                    {canGoStale(r.intervalDays)
                      ? t('cat.cadenceOnce')
                      : t('cat.cadenceEvery', { days: r.intervalDays })}
                  </td>
                  <td>
                    {cardStale ? (
                      <span className="cat__past">{t('cat.cardStale')}</span>
                    ) : (
                      <span className="cat__ok">{t('cat.cardFresh')}</span>
                    )}
                  </td>
                  <td>
                    <a className="btn btn--quiet" href={`/${locale}/admin/catalogue/${r.slug}`}>
                      {t('cat.edit')}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="note">{t('cat.scopeNote')}</p>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
