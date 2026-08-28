import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { Readex_Pro, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { locales, localeDirection, type Locale } from '@/i18n/routing';
import { MOTION_BOOT_SCRIPT } from '@/lib/motion';
import '../globals.css';

/* Two families, which is the cap. Readex Pro is one design covering Arabic and
   Latin, so the Latin inherits the Arabic's metrics rather than the other way
   round: the master doc's position is that Arabic leads and English follows,
   and a superfamily is how that stops being a slogan.

   The seven faces the three archived design directions loaded are gone with
   them. */
const readex = Readex_Pro({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-readex',
  display: 'swap',
});

/* Figures only: prices, the party count, the route labels. Tabular numerals
   are the whole reason it is here. */
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();
  return {
    title: `Mars (${t('flight.partyLive')})`,
    description: t('flight.heroBody'),
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(locales as readonly string[]).includes(lang)) notFound();
  const locale = lang as Locale;

  setRequestLocale(locale);
  const messages = await getMessages();

  // FOUND-02. dir and lang are emitted here, in server-rendered HTML.
  // Setting dir in a client effect causes the paint-LTR-then-snap-to-RTL shift.
  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      className={`${readex.variable} ${plexMono.variable}`}
    >
      <body>
        {/* Replays the footer's motion choice before anything paints. Same
            reasoning as dir above: deciding this in an effect means the page
            animates once and then stops, which is the exact thing the person
            who set the preference asked not to happen. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }} />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        {/* Vercel Web Analytics. Renders no markup and sets no cookie, so it sits
            outside the provider and owes the consent story nothing. Counts page
            views only; it cannot see anything that happens in Supabase. */}
        <Analytics />
      </body>
    </html>
  );
}
