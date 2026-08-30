import { redirect } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { getCurrentUser, isStaff, isAdmin } from '@/lib/auth/session';
import { getEnquiryQueue, getNotes, getResponseTimes } from '@/lib/db/staff';
import { getPublishedPackages } from '@/lib/db/packages';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { QueueItem, type QueueRow, type Note } from '@/components/staff/QueueItem';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default async function Staff({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const user = await getCurrentUser();
  if (!isStaff(user)) redirect(`/${locale}/account/sign-in`);

  const [queue, packages, times] = await Promise.all([
    getEnquiryQueue(),
    getPublishedPackages(),
    getResponseTimes(),
  ]);

  const label = new Map(packages.map((p) => [p.slug, `${p.destination[locale]}, ${p.country[locale]}`]));
  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });

  const rows: { row: QueueRow; notes: Note[] }[] = await Promise.all(
    queue.map(async (e) => {
      const raw = e as Record<string, unknown>;
      const slug = (raw.packages as { slug?: string } | null)?.slug ?? null;
      const notes = await getNotes(String(raw.id));
      return {
        row: {
          id: String(raw.id),
          reference: String(raw.reference ?? ''),
          status: String(raw.status ?? 'new'),
          contactName: String(raw.contact_name ?? ''),
          contactPhone: (raw.contact_phone as string) ?? null,
          contactEmail: (raw.contact_email as string) ?? null,
          party: Number(raw.party_adults ?? 0) + Number(raw.party_children ?? 0),
          preferredDeparture: (raw.preferred_departure as string) ?? null,
          message: (raw.message as string) ?? null,
          locale: String(raw.locale ?? 'ar'),
          tripLabel: slug ? (label.get(slug) ?? slug) : null,
          receivedISO: String(raw.received_at),
          firstResponseISO: (raw.first_response_at as string) ?? null,
          assignedToMe: raw.assigned_to === user!.id,
          assignedToSomeone: Boolean(raw.assigned_to),
        },
        notes: notes.map((n) => {
          const nr = n as Record<string, unknown>;
          return {
            id: String(nr.id),
            body: String(nr.body ?? ''),
            author: (nr.profiles as { display_name?: string } | null)?.display_name ?? '',
            createdISO: String(nr.created_at),
          };
        }),
      };
    }),
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet sheet--wide">
        <header className="sheet__head">
          <h1 className="sheet__title">{t('staff.title')}</h1>
          <p className="sheet__lede">{t('staff.lede')}</p>
        </header>

        {/* Internal only. The decision of 2026-08-22 is that the site publishes
            a window it can keep at its worst hour and measures the median
            privately, so this must never appear on a public page. */}
        <section className="times" aria-label={isAdmin(user) ? t('staff.allTimes') : t('staff.yourTimes')}>
          <h2 className="times__title">
            {isAdmin(user) ? t('staff.allTimes') : t('staff.yourTimes')}
          </h2>
          <dl className="times__grid">
            <div>
              <dt>{t('staff.median')}</dt>
              <dd>{times.medianMinutes === null ? '-' : `${nf.format(times.medianMinutes)}${t('staff.minutes')}`}</dd>
            </div>
            <div>
              <dt>{t('staff.worst')}</dt>
              <dd>{times.worstMinutes === null ? '-' : `${nf.format(times.worstMinutes)}${t('staff.minutes')}`}</dd>
            </div>
            <div>
              <dt>{t('staff.count')}</dt>
              <dd>{nf.format(times.count)}</dd>
            </div>
          </dl>
          <p className="note">{t('staff.internal')}</p>
        </section>

        {rows.length === 0 ? (
          <p className="empty__line">{t('staff.empty')}</p>
        ) : (
          <ul className="queue">
            {rows.map(({ row, notes }) => (
              <QueueItem
                key={row.id}
                row={row}
                notes={notes}
                locale={locale}
                canAssignOthers={isAdmin(user)}
              />
            ))}
          </ul>
        )}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
