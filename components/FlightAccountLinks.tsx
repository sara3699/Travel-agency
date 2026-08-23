import { getTranslations } from 'next-intl/server';
import { getCurrentUser, isStaff, isAdmin } from '@/lib/auth/session';
import type { Locale } from '@/i18n/routing';

/**
 * The flight's own chrome links. Kept apart from SiteHeader because the flight
 * has no header: this drops into the fixed bar over the world.
 *
 * Role-dependent links are a courtesy so the interface does not offer an action
 * the database will refuse. They are not the access control.
 */
export async function FlightAccountLinks({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const user = await getCurrentUser();

  return (
    <nav className="chrome__links" aria-label={t('nav.menu')}>
      {isStaff(user) && <a href={`/${locale}/staff`}>{t('nav.queue')}</a>}
      {isAdmin(user) && <a href={`/${locale}/admin`}>{t('nav.adminArea')}</a>}
      <a href={user ? `/${locale}/account` : `/${locale}/account/sign-in`}>
        {user ? t('auth.account') : t('auth.signIn')}
      </a>
    </nav>
  );
}
