// DATA-01. The demo/real boundary lives in the schema, not in copy.
//
// A future session cannot undo this by editing a string: the renderer reads the
// enum to choose the call-to-action verb. Only genuinely bookable inventory may
// ever say "Book". Master doc 14.1.

export const PROVENANCE = ['contracted', 'supplier_live', 'partner_listed', 'public_sample', 'illustrative'] as const;
export type Provenance = (typeof PROVENANCE)[number];

const BOOKABLE: readonly Provenance[] = ['contracted', 'supplier_live'];

export const isBookable = (p: Provenance): boolean => BOOKABLE.includes(p);

export type CtaKind = 'book' | 'enquire' | 'partner';

export function ctaKindFor(p: Provenance): CtaKind {
  if (isBookable(p)) return 'book';
  if (p === 'partner_listed') return 'partner';
  return 'enquire';
}

/** Anything not contracted or live carries its origin next to the number itself.
 *  A footer disclaimer is worthless when the growth model is screenshots. */
export const needsProvenanceChip = (p: Provenance): boolean => !isBookable(p);

/** Specimen mode is the project's current state. The CI gate asserts it. */
export const SPECIMEN_MODE = true;
