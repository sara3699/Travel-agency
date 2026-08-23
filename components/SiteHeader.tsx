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
        <span className="wordmark__name">Mars</span>
        <span className="wordmark__tag">{t('flight.partyLive')}</span>
      </a>

      <nav className="site-head__nav" aria-label={t('nav.menu')}>
        {isStaff(user) && (
          <a href={`/${locale}/staff`}>{t('nav.queue')}</a>
        )}
        {isAdmin(user) && (
          <a href={`/${locale}/admin`}>{t('nav.adminArea')}</a>
        )}
        {user ? (
          <>
            <a href={`/${locale}/account`}>{t('auth.account')}</a>
            <form action={signOutAction}>
              <input type="hidden" name="locale" value={locale} />
              <button type="submit" className="linklike">
                {t('auth.signOut')}
              </button>
            </form>
          </>
        ) : (
          <a href={`/${locale}/account/sign-in`}>{t('auth.signIn')}</a>
        )}
        <LocaleSwitcher current={locale} />
      </nav>
    </header>
  );
}
