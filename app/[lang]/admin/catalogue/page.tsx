import { redirect } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { getCurrentUser, isAdmin } from '@/lib/auth/session';
import { listCatalogue, minorToMajor } from '@/lib/db/catalogue';
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

  // The reason this screen exists, computed once and shown at the top rather
  // than left for someone to notice: a departure that has passed is invisible
  // until a traveller finds it.
  const todayUtc = new Date();
  const today = Date.UTC(todayUtc.getUTCFullYear(), todayUtc.getUTCMonth(), todayUtc.getUTCDate());
  const daysUntil = (iso: string | null) =>
    iso === null ? null : Math.round((Date.parse(`${iso}T00:00:00Z`) - today) / 86400000);

  const stale = rows.filter((r) => {
    const d = daysUntil(r.nextDeparture);
    return d !== null && d < 0;
  });
  const soon = rows.filter((r) => {
    const d = daysUntil(r.nextDeparture);
    return d !== null && d >= 0 && d < 21;
  });

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

        <table className="cat">
          <thead>
            <tr>
              <th scope="col">{t('cat.trip')}</th>
              <th scope="col">{t('cat.status')}</th>
              <th scope="col" className="cat__num">
                {t('cat.priceCol')}
              </th>
              <th scope="col" className="cat__num">
                {t('cat.nights')}
              </th>
              <th scope="col">{t('cat.departure')}</th>
              <th scope="col">
                <span className="visually-hidden">{t('cat.edit')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const d = daysUntil(r.nextDeparture);
              const past = d !== null && d < 0;
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
                  <td className="cat__num">{r.nights}</td>
                  <td>
                    {r.nextDeparture ? (
                      <>
                        <time dateTime={r.nextDeparture}>
                          {df.format(new Date(`${r.nextDeparture}T00:00:00Z`))}
                        </time>
                        {past && <span className="cat__past">{t('cat.past')}</span>}
                      </>
                    ) : (
                      <span className="cat__past">{t('cat.noDate')}</span>
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
