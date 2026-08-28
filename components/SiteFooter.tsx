import { getTranslations } from 'next-intl/server';
import { MotionToggle } from '@/components/MotionToggle';
import type { Locale } from '@/i18n/routing';

/**
 * The footer, deliberately small.
 *
 * "Mega-footer" is item 10 on the generic-competitor list in the master doc,
 * sitting between the newsletter bar and the logo strip. A four-column sitemap
 * of every page is the thing this category does instead of navigation, so this
 * one carries four things and stops: what the site is, where the trust and
 * legal pages are, the motion control, and who built it.
 *
 * The specimen sentence is the point of the whole component. Provenance chips
 * already sit next to every price, which is what protects a screenshot taken
 * out of context (master doc: footer disclaimers are worthless when the growth
 * model is people screenshotting single cards). But the chip says the FARE is
 * illustrative. It does not say the agency is. That sentence had nowhere to
 * live until this existed.
 */
export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <footer className="site-foot">
      <p className="site-foot__specimen">{t('foot.rights')}</p>

      <nav className="site-foot__nav" aria-label={t('foot.navLabel')}>
        <a href={`/${locale}/trust`}>{t('nav.trust')}</a>
        <a href={`/${locale}/legal/privacy`}>{t('legal.privacyShort')}</a>
        <a href={`/${locale}/faq`}>{t('nav.faq')}</a>
        <a href={`/${locale}/about`}>{t('nav.aboutUs')}</a>
      </nav>

      <MotionToggle />

      <p className="site-foot__imagery">{t('foot.imagery')}</p>

      {/* One line, which is the whole practitioner-audience budget in the
          traveller's path. Master doc 14.4: the second audience is served on
          its own routes, never by decorating the commercial ones. */}
      <p className="site-foot__maker">
        {t('foot.builtBy')}{' '}
        <a href="https://instagram.com/sara_dhaouadi_official" rel="me noopener">
          sara_dhaouadi_official
        </a>
      </p>
    </footer>
  );
}
