import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = (routing.locales as readonly string[]).includes(requested ?? '')
    ? (requested as Locale)
    : (routing.defaultLocale as Locale);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
