# Backend handoff

Written 2026-08-23. For the agent building the front end of this app.

The database is live, tested, and seeded. Nothing in `app/` or `components/` was
changed except one shared file, named below. This document tells you what you can
call, what shape comes back, and which four things will bite you if nobody warns
you about them.

## What is running

Supabase project `pjyyphsleahyyuvzxyjs`, Postgres 17. Ten tables, row level
security on all ten, 28 policies, seven migrations in `supabase/migrations/`.

Three people can exist: a customer, an employee, an admin. The role lives in a
table called `user_roles` and gets copied into the login token, so policies read
it without a lookup. Signing up always produces a customer. There is no path from
a browser to a staff role, and that is enforced by the database, not by hiding a
button.

The three specimen packages from `lib/packages.ts` are in the database, published,
with Arabic, English and French rows for each.

## Reading the catalogue

This is the part that matters most for you. `lib/db/packages.ts` returns the exact
`TravelPackage` type that `lib/packages.ts` already exports, so the swap is an
import change and nothing else:

```ts
// before
import { packages } from '@/lib/packages';

// after
import { getPublishedPackages } from '@/lib/db/packages';
const packages = await getPublishedPackages();
```

`PackageCard`, the money formatting and the difference engine keep working
untouched. The component file needs no edit.

Available functions:

- `getPublishedPackages()` returns every published package, soonest departure first
- `getPackageBySlug(slug)` returns one, or null
- `getCancellationLadder(slug)` returns the refund table, sorted furthest-out first

Drafts never reach a visitor. That is the database refusing, not a filter in the
query, so removing the filter would change nothing.

Keep `lib/packages.ts` for now. Its type definitions are imported by the data
layer, and deleting the file breaks the build. When every component reads from the
database you can delete the `packages` array at the bottom and keep the types.

## Signing in

`lib/auth/actions.ts` has `signUp`, `signIn`, `signOut`. All three take a
`FormData` and return `{ ok, errorKey? }`. They never return a finished sentence,
only a message key, because the copy belongs in your `messages/` files and has to
work in Arabic.

`signUp` reads three optional fields beyond email and password: `displayName`,
`locale`, and a honeypot field named `company` that must be present in the form and
hidden from people.

To find out who is asking, from any server component or action:

```ts
import { getCurrentUser, isStaff, isAdmin } from '@/lib/auth/session';

const user = await getCurrentUser();   // null when signed out, which is normal
if (isStaff(user)) { /* ... */ }
```

`getCurrentUser()` returns `{ id, email, role, displayName, locale }`. Treat
`role` as display information. Do not build a security decision on it. The
database already refuses the wrong person, and a check in React is a courtesy so
the interface does not offer an action that will fail.

## Sending an enquiry

`createEnquiry(formData)` in `lib/db/enquiries.ts`. It returns
`{ ok, reference, statusPath, errorKey? }`.

The form must post to this server action. There is no browser write path to the
enquiries table at all: the public key cannot insert, by design, so a client-side
Supabase call will fail with a 401 and that is not a bug to fix.

Field names it reads: `contactName`, `contactPhone`, `contactEmail`, `message`,
`packageSlug`, `locale`, `partyAdults`, `partyChildren`, `preferredDeparture`,
`utmSource`, `utmMedium`, `utmCampaign`, and the hidden `company` honeypot.

At least one of phone or email is required. The database enforces that too.

`statusPath` comes back as `/{locale}/q/{token}`. Build that page. It is the
account-free way a customer checks their enquiry after arriving from WhatsApp, and
`getEnquiryByToken(token)` feeds it. That function returns the reference, status,
name, party size, preferred date, locale and package slug. It deliberately will
not give you the phone number, the email, the assignment, or the internal notes.

## Staff and admin

`lib/db/staff.ts` covers the employee surface: `getEnquiryQueue`, `claimEnquiry`,
`markResponded`, `setEnquiryStatus`, `addNote`, `getNotes`, `getResponseTimes`.

`lib/db/admin-users.ts` covers the admin surface: `listStaff`, `createEmployee`,
`revokeStaffRole`, `revokeSessions`.

Two behaviours worth knowing before you design the screens. An employee can take
an enquiry for themselves but cannot hand one to a colleague, so do not draw an
assignment dropdown listing other staff unless the viewer is an admin. And
`getResponseTimes` shows an employee only their own figures, while an admin sees
everyone's. Never put those numbers on a public page. The site publishes a
response window it can keep at its worst hour; the median stays internal.

## Message keys you need to add

The backend returns these keys and no copy. Every one needs an entry in
`messages/ar.json`, `messages/en.json` and `messages/fr.json`, or next-intl will
throw at runtime.

From sign-in and sign-up: `auth.missingFields`, `auth.passwordTooShort`,
`auth.emailTaken`, `auth.invalidCredentials`, `auth.tooManyAttempts`,
`auth.unknown`.

From the enquiry form: `enquiry.nameRequired`, `enquiry.nameTooLong`,
`enquiry.contactRequired`, `enquiry.emailInvalid`, `enquiry.messageTooLong`,
`enquiry.partyInvalid`, `enquiry.localeInvalid`, `enquiry.tooManyAttempts`,
`enquiry.failed`.

From the staff screens: `staff.assignRefused`, `staff.updateFailed`,
`staff.noteEmpty`, `staff.noteFailed`.

From the admin screens: `admin.missingFields`, `admin.staffPasswordTooShort`,
`admin.roleInvalid`, `admin.createFailed`, `admin.roleGrantFailed`,
`admin.revokeFailed`.

Write the Arabic natively. Do not machine-translate the English.

## Demo accounts for testing

Three accounts exist on the live project, one per role. They share a single short
password, which is deliberately not written into any file in this repo. Ask Sarra
for it, or read it from the Supabase dashboard by setting your own.

- `demo.customer@example.com` sees only their own enquiry, cannot read staff notes
- `demo.employee@example.com` sees all three enquiries, cannot edit packages, can
  take an enquiry for themselves but not hand one to a colleague
- `demo.admin@example.com` can do everything, including editing packages and
  creating staff

Three enquiries are seeded, in Arabic, English and French, all from invented people.
One of them belongs to the demo customer account, so a "my enquiries" screen has
something in it. The other two are anonymous, which is what most real enquiries will
be.

These are demo accounts on specimen data. They must be deleted before any real
traveller information exists, and the password is far below what the app itself
requires for a staff account.

## Two dashboard settings, both already done

Recorded here so nobody switches them back. Both were verified against the live API
on 2026-08-23: signup returns a session immediately, and the access token carries
`app_metadata.user_role`.

Authentication, then Auth Hooks, then "Add a new hook". Choose "Customize Access
Token (JWT) Claims", pick Postgres function rather than HTTP endpoint, and select
`custom_access_token_hook` in the `public` schema. This is already configured. If it
is removed, roles still work but resolve through a slower table read.

Authentication, then Sign In and Providers, then Email: "Confirm email" is off. If
it gets switched back on, `signUp` still succeeds but the account waits on a
confirmation email that has no template, so sign-in appears to fail for no visible
reason. If sign-up looks broken during development, check this first.

## The one file I changed that is also yours

`middleware.ts`. It still does everything it did for next-intl, in the same order,
with the same matcher. It now also refreshes the Supabase session cookie on the
way out. Without that, anyone signed in gets logged out about an hour later with
no explanation.

The previous version is saved in `Archive/` if you need to compare. If you edit
this file, keep the pattern: next-intl produces the response, then `refreshSession`
writes cookies onto that same response. Reversing the order breaks redirects.

## Four things that will bite you

Money is stored as an integer of minor units with the currency beside it. Kuwaiti
dinar, Bahraini dinar, Omani rial and Tunisian dinar have three decimal places, not
two. The Samarkand package is `742000` KWD, which is 742.000 dinars, not 7,420.
Always render through `formatMoney` from `lib/money.ts`. Never divide by 100 and
never call `toFixed(2)`.

The `provenance` column decides the call to action. Every seeded package is
`illustrative`, so none of them may say "Book". Use `ctaKindFor` from
`lib/provenance.ts` and let it choose the verb.

Never import `lib/supabase/admin.ts` into a client component. It carries the secret
key. It throws if it detects a browser, but do not rely on that.

Use `getUser()` rather than `getSession()` for anything that decides access.
`getSession` reads the cookie without checking it against the auth server.

## What is not built

No screens. No sign-in form, no account area, no enquiry form, no `/q/[token]`
page, no staff queue, no admin surface. All of that is yours. The database, the
clients, the queries and the server actions are done and tested.

Run `npm run typecheck` before you commit. The backend files pass clean today.
There are pre-existing errors from archived concept pages and stale `.next` types
that predate this work.
