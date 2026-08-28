import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { getPublishedPackages } from '@/lib/db/packages';
import { ctaKindFor, needsProvenanceChip } from '@/lib/provenance';
import { money, type Money } from '@/lib/money';
import { Suspense } from 'react';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { FlightAccountLinks } from '@/components/FlightAccountLinks';
import { FlightSignIn } from '@/components/FlightSignIn';
import { Flight, type TripView, type FlightCopy } from '@/components/flight/Flight';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/* Prerendered at build so it stays indexable (an AI crawler does not run
   JavaScript, and the whole catalogue argument depends on being readable), then
   revalidated. A price that is five minutes stale is fine; a homepage that
   renders empty to a crawler is not. */
export const revalidate = 300;

/* The homepage is one unbroken flight across the three markets the audience
   lives in, and it lands at a table with the catalogue laid on it. Built
   2026-08-23 with the scrollcraft skill in worldflight mode.

   Nothing here descends from the four archived concept pages. */

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const packages = await getPublishedPackages();

  const trips: TripView[] = packages.map((p) => {
    // Exclusions are per person, same as the fare, so they scale with the dial.
    const priced = p.ledger.filter((l) => !l.included && l.estimate && l.estimate.amountMinor > 0);
    const excludedPerPerson: Money | null = priced.length
      ? money(
          priced.reduce((sum, l) => sum + (l.estimate?.amountMinor ?? 0), 0),
          p.pricePerPerson.currency,
        )
      : null;

    return {
      slug: p.slug,
      dest: p.destination[locale],
      country: p.country[locale],
      nights: p.nights,
      from: p.departureCity[locale],
      pricePerPerson: p.pricePerPerson,
      sharing: p.partyAssumption.sharing,
      excludedPerPerson,
      excludedNames: priced.map((l) => t(`ledger.${l.key}`).toLowerCase()).join(' + '),
      // The verb comes from the provenance enum, never from a string a later
      // session can edit. Nothing illustrative may ever say "Book".
      ctaVerb: ctaKindFor(p.provenance),
      provenanceLabel: needsProvenanceChip(p.provenance) ? t('flight.prov') : '',
    };
  });

  const copy: FlightCopy = {
    heroKicker: t('flight.heroKicker'),
    heroTitle: t('flight.heroTitle'),
    heroBody: t('flight.heroBody'),
    aTitle: t('flight.aTitle'),
    aBody: t('flight.aBody'),
    bTitle: t('flight.bTitle'),
    bBody: t('flight.bBody'),
    cTitle: t('flight.cTitle'),
    cBody: t('flight.cBody'),
    // t() would try to format these as ICU messages and throw on the missing
    // argument. The placeholder is filled on the client, where the live number
    // actually is, so the raw string is what has to cross.
    laidFor: t.raw('flight.laidFor') as string,
    travelling: t('flight.travelling'),
    fewer: t('flight.fewer'),
    more: t('flight.more'),
    partyLive: t('flight.partyLive'),
    sharingNote: t('flight.sharingNote'),
    nights: t.raw('flight.nights') as string,
    forParty: t.raw('flight.forParty') as string,
    plusExcluded: t.raw('flight.plusExcluded') as string,
    nothingExcluded: t('flight.nothingExcluded'),
    askAll: t('flight.askAll'),
    skip: t('flight.skip'),
    routeLabel: t('flight.routeLabel'),
    waypoints: [1, 2, 3, 4, 5, 6].map((i) => t(`flight.w${i}`)),
    seePrice: t('flight.seePrice'),
    priceMoved: t('flight.priceMoved'),
  };

  return (
    <Flight
      copy={copy}
      trips={trips}
      locale={locale}
      askHref={`/${locale}/enquire`}
      localeSwitcher={<Suspense fallback={null}><LocaleSwitcher current={locale} /></Suspense>}
      accountSlot={<FlightAccountLinks locale={locale} />}
      signInSlot={<FlightSignIn locale={locale} />}
    />
  );
}
