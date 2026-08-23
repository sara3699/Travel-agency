import { useTranslations } from 'next-intl';

const KNOWN = ['new', 'assigned', 'responded', 'quoted', 'won', 'lost', 'archived'] as const;
type Known = (typeof KNOWN)[number];

const isKnown = (s: string): s is Known => (KNOWN as readonly string[]).includes(s);

/**
 * Status is carried by a word plus a tone, never by colour alone: red and green
 * are the same pill to a large share of readers, and this one is read on a
 * phone in daylight.
 */
export function StatusPill({ status }: { status: string }) {
  const t = useTranslations();
  const key: Known = isKnown(status) ? status : 'new';
  return (
    <span className="pill" data-status={key}>
      {t(`status.${key}`)}
    </span>
  );
}
