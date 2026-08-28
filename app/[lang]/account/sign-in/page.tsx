import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { AuthForm } from '@/components/AuthForm';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const dynamic = 'force-dynamic';

export default async function SignIn({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet sheet--narrow">
        <header className="sheet__head">
          <h1 className="sheet__title">{t('auth.signInTitle')}</h1>
          <p className="sheet__lede">{t('auth.signInLede')}</p>
        </header>
        <AuthForm mode="in" locale={locale} />
        <p className="note">
          {t('auth.noAccount')}{' '}
          <a href={`/${locale}/account/sign-up`}>{t('auth.signUp')}</a>
        </p>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
