import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// No content at the bare root. No auto-detection by IP or Accept-Language:
// it strands crawlers on one locale. This is a plain structural redirect.
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
