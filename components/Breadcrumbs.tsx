import type { Locale } from '@/i18n/routing';

/**
 * Breadcrumbs, with the structured data attached.
 *
 * The reference site carries these on every guide and listing page and they
 * are one of the few markup types that still earns a rich result, so they are
 * worth the twenty lines. The separator is a CSS pseudo-element rather than a
 * character in the markup, so a screen reader reads the trail as links rather
 * than as a string of slashes, and the direction flips with the locale.
 */
export function Breadcrumbs({
  trail,
  locale,
}: {
  trail: { label: string; href?: string }[];
  locale: Locale;
}) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: c.href } : {}),
    })),
  };

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((c, i) => (
          <li key={i}>
            {c.href && i < trail.length - 1 ? (
              <a href={c.href}>{c.label}</a>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </nav>
  );
}
