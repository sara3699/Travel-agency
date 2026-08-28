import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth/session';
import type { Locale } from '@/i18n/routing';

/**
 * The account control for the flight chrome, kept separate from the nav links
 * so it can sit at the very end of the bar. The operator asked for sign-in on
 * the right on 2026-08-27; "the end of the inline axis" is what that means, so
 * it lands on the left in Arabic with no second rule.
 */
export async function FlightSignIn({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const user = await getCurrentUser();

  return (
    <a
      className="chrome__signin"
      href={user ? `/${locale}/account` : `/${locale}/account/sign-in`}
    >
      {user ? t('auth.account') : t('auth.signIn')}
    </a>
  );
}
