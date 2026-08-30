import { redirect } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { getCurrentUser, isAdmin } from '@/lib/auth/session';
import { listStaff } from '@/lib/db/admin-users';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StaffAdmin, type StaffRow } from '@/components/admin/StaffAdmin';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default async function Admin({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const user = await getCurrentUser();
  if (!isAdmin(user)) redirect(`/${locale}/account/sign-in`);

  const staff = await listStaff();
  const rows: StaffRow[] = staff.map((s) => {
    const r = s as Record<string, unknown>;
    return {
      userId: String(r.user_id),
      role: r.role as 'admin' | 'employee',
      name: (r.profiles as { display_name?: string } | null)?.display_name ?? '',
      grantedISO: String(r.granted_at),
    };
  });

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet sheet--wide">
        <header className="sheet__head">
          <h1 className="sheet__title">{t('admin.title')}</h1>
          <p className="sheet__lede">{t('admin.lede')}</p>
        </header>

        <p className="admin__jump">
          <a className="btn btn--quiet" href={`/${locale}/admin/catalogue`}>
            {t('admin.catalogueLink')}
          </a>
        </p>

        <StaffAdmin rows={rows} locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
