import { redirect } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { getCurrentUser } from '@/lib/auth/session';
import { getMyEnquiries } from '@/lib/db/enquiries';
import { SiteHeader } from '@/components/SiteHeader';
import { StatusPill } from '@/components/StatusPill';

export const dynamic = 'force-dynamic';

export default async function Account({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  // A courtesy redirect. The database returns nobody else's rows regardless.
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/account/sign-in`);

  const rows = await getMyEnquiries();
  const df = new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', day: 'numeric', numberingSystem: 'latn',
  });
  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet">
        <header className="sheet__head">
          <h1 className="sheet__title">{t('account.title')}</h1>
          <p className="sheet__lede">{t('account.lede')}</p>
        </header>

        {rows.length === 0 ? (
          <div className="empty">
            <p className="empty__line">{t('account.empty')}</p>
            <p className="note">{t('account.emptyLede')}</p>
            <a className="btn" href={`/${locale}`}>{t('account.browse')}</a>
          </div>
        ) : (
          <ul className="rows">
            {rows.map((r) => {
              const party = Number(r.party_adults ?? 0) + Number(r.party_children ?? 0);
              return (
                <li key={String(r.reference)} className="row-card">
                  <span className="row-card__ref">{String(r.reference)}</span>
                  <StatusPill status={String(r.status ?? 'new')} />
                  <span className="row-card__meta">
                    {t('account.sent')} {df.format(new Date(String(r.received_at)))}
                  </span>
                  <span className="row-card__meta">
                    {t('q.party')} {nf.format(party)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
