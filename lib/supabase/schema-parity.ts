// Compile-time guard. This file has no runtime behaviour and exports nothing
// useful -- its whole job is to fail `tsc` if the database and the TypeScript
// model ever disagree.
//
// The enums in lib/money.ts and lib/provenance.ts are duplicated as Postgres
// types, because a check constraint cannot import TypeScript. Duplication is
// only safe when something notices it drifting. This notices.

import type { Enums } from '../database.types';
import type { Provenance } from '../provenance';
import type { CurrencyCode } from '../money';

/** True only when the two unions contain exactly the same members. */
type Exact<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

// If either of these lines errors, a migration changed an enum and the
// matching TypeScript union was not updated in the same commit -- or vice
// versa. Fix the mismatch; do not silence the error.
export const provenanceMatchesDatabase: Exact<Provenance, Enums<'provenance'>> = true;
export const currencyMatchesDatabase: Exact<CurrencyCode, Enums<'currency_code'>> = true;
