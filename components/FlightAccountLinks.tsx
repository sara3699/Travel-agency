import { getTranslations } from 'next-intl/server';
import { getCurrentUser, isStaff, isAdmin } from '@/lib/auth/session';
import type { Locale } from '@/i18n/routing';

/**
 * The flight's own chrome links. Kept apart from SiteHeader because the flight
 * has no header: this drops into the fixed bar over the world.
 *
 * Being a second copy of the navigation is what makes it dangerous. Occasions
 * was added to SiteHeader when the feature was built and never added here, and
 * Trust never arrived either, so for anyone who landed on the homepage - which
 * is everyone arriving from a shared link - two whole sections of the site did
 * not exist. Not in this bar, not in a footer, nowhere. Found on 2026-08-30 by
 * the operator simply looking at the live site and asking where Occasions had
 * gone.
 *
 * So this list must stay identical to SiteHeader's. The master document's rule
 * for the scroll-driven landing is to change the SHAPE of the primary control
 * while keeping a conventional path alongside it; a conventional path that is
 * missing half the site is not one.
 *
 * Role-dependent links are a courtesy so the interface does not offer an action
 * the database will refuse. They are not the access control.
 */
export async function FlightAccountLinks({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const user = await getCurrentUser();

  return (
    <nav className="chrome__links" aria-label={t('nav.menu')}>
      <a href={`/${locale}/destinations`}>{t('nav.destinations')}</a>
      <a href={`/${locale}/occasions`}>{t('nav.occasions')}</a>
      <a href={`/${locale}/faq`}>{t('nav.faq')}</a>
      <a href={`/${locale}/about`}>{t('nav.aboutUs')}</a>
      <a href={`/${locale}/trust`}>{t('nav.trust')}</a>
      {isStaff(user) && <a href={`/${locale}/staff`}>{t('nav.queue')}</a>}
      {isAdmin(user) && <a href={`/${locale}/admin`}>{t('nav.adminArea')}</a>}
    </nav>
  );
}
