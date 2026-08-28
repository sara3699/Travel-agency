import type { Locale } from '@/i18n/routing';

/**
 * Inline SVG flags rather than emoji.
 *
 * Emoji flags are regional-indicator pairs, and Windows has no glyphs for them:
 * every Windows browser renders them as the two letters instead. A travel site
 * cannot ship a language switcher that shows "SA / GB / FR" to a third of its
 * visitors, so these are drawn.
 *
 * The Arabic flag is Saudi Arabia. That is a choice, not a fact: Arabic is
 * spoken across roughly two dozen states and no flag represents it. The master
 * document's refusal list bans flags as the language switcher for exactly this
 * reason. The operator overrode it on 2026-08-27 and chose flag-plus-name, so
 * the word is always beside the flag and carries the actual meaning.
 */
export function Flag({ locale }: { locale: Locale }) {
  const common = {
    width: 20,
    height: 14,
    viewBox: '0 0 20 14',
    'aria-hidden': true as const,
    className: 'flag',
    focusable: 'false' as const,
  };

  if (locale === 'ar') {
    return (
      <svg {...common}>
        <rect width="20" height="14" rx="2" fill="#0F7A3D" />
        {/* The shahada and sword, suggested rather than reproduced: rendering
            scripture at 14px produces an unreadable smudge of a sacred text,
            which is worse than an abstraction. */}
        <rect x="3.5" y="4.6" width="13" height="1.5" rx="0.75" fill="#fff" opacity="0.95" />
        <rect x="3.5" y="8.2" width="10" height="1" rx="0.5" fill="#fff" opacity="0.9" />
        <circle cx="15.4" cy="8.7" r="0.9" fill="#fff" opacity="0.9" />
      </svg>
    );
  }

  if (locale === 'fr') {
    return (
      <svg {...common}>
        <rect width="20" height="14" rx="2" fill="#fff" />
        <path d="M0 2a2 2 0 0 1 2-2h4.67v14H2a2 2 0 0 1-2-2V2Z" fill="#0055A4" />
        <path d="M13.33 0H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.67V0Z" fill="#EF4135" />
      </svg>
    );
  }

  // English: the Union Flag, simplified. The diagonals are drawn without the
  // counterchange, which is wrong heraldically and unreadable at 20px if done
  // correctly.
  return (
    <svg {...common}>
      <rect width="20" height="14" rx="2" fill="#012169" />
      <g clipPath="url(#uk-clip)">
        <path d="M0 0 20 14M20 0 0 14" stroke="#fff" strokeWidth="2.6" />
        <path d="M0 0 20 14M20 0 0 14" stroke="#C8102E" strokeWidth="1.3" />
        <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4" />
        <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.2" />
      </g>
      <defs>
        <clipPath id="uk-clip">
          <rect width="20" height="14" rx="2" />
        </clipPath>
      </defs>
    </svg>
  );
}
