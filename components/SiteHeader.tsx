import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser, isStaff, isAdmin } from '@/lib/auth/session';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { signOutAction } from '@/lib/actions/forms';
import type { Locale } from '@/i18n/routing';

/**
 * The header for the document pages. The flight has its own chrome and does
 * not use this: a fixed bar over a fixed world is a different problem.
 *
 * The role-dependent links are a courtesy, not a control. Row level security
 * refuses the wrong person at the database, so hiding a link only avoids
 * offering an action that would fail.
 */
export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const user = await getCurrentUser();

  return (
    <header className="site-head">
      <a className="wordmark" href={`/${locale}`}>
        <span className="wordmark__name">{t('brand.name')}</span>
        <span className="wordmark__tag">{t('brand.meaning')}</span>
      </a>

      <nav className="site-head__nav" aria-label={t('nav.menu')}>
        <a href={`/${locale}/destinations`}>{t('nav.destinations')}</a>
        <a href={`/${locale}/occasions`}>{t('nav.occasions')}</a>
        <a href={`/${locale}/faq`}>{t('nav.faq')}</a>
        <a href={`/${locale}/about`}>{t('nav.aboutUs')}</a>
        <a href={`/${locale}/trust`}>{t('nav.trust')}</a>
        {isStaff(user) && <a href={`/${locale}/staff`}>{t('nav.queue')}</a>}
        {/* Catalogue before Admin, because it is the screen that gets used.
            "Admin" lands on Staff - accounts and permissions, touched maybe
            twice a year - while changing a price, the actual daily job, sat a
            level down behind a button. The operator went looking for prices,
            found a staff form, and asked where the prices were. Conventional
            labels are real: a visitor has to be able to predict what is behind
            a link, and "Admin" does not predict "Staff". */}
        {isAdmin(user) && (
          <a href={`/${locale}/admin/catalogue`}>{t('nav.catalogue')}</a>
        )}
        {isAdmin(user) && <a href={`/${locale}/admin`}>{t('nav.adminArea')}</a>}
      </nav>

      {/* Utilities sit together at the end of the row rather than mixed in
          with the navigation, which is what made the bar wrap into two
          scattered lines in Arabic. `margin-inline-start: auto` puts them at
          the end of the inline axis, so it is the right in English and the
          left in Arabic from one declaration. */}
      <div className="site-head__utils">
        <Suspense fallback={null}>
          <LocaleSwitcher current={locale} />
        </Suspense>

        {user ? (
          <span className="site-head__account">
            <a href={`/${locale}/account`}>{t('auth.account')}</a>
            <form action={signOutAction}>
              <input type="hidden" name="locale" value={locale} />
              <button type="submit" className="linklike">
                {t('auth.signOut')}
              </button>
            </form>
          </span>
        ) : (
          <a className="btn btn--quiet" href={`/${locale}/account/sign-in`}>
            {t('auth.signIn')}
          </a>
        )}
      </div>

    </header>
  );
}
