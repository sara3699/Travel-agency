-- enquiries_are_server_written.sql
--
-- Found by testing, 2026-08-23: an anonymous visitor could INSERT an enquiry
-- but could not read back the reference number it had just generated, because
-- inserting and reading are separate privileges and anonymous visitors
-- deliberately hold no read privilege on this table.
--
-- The tempting fix -- give anonymous visitors a SELECT policy on enquiries --
-- is the exact shape of mistake that leaks a customer list. Rejected.
--
-- The correct fix is that the browser never writes to this table at all. The
-- enquiry form posts to a Next.js server action, which holds the secret key,
-- and which is also the only place that can honestly do three other things the
-- master document requires:
--
--   * capture attribution server-side on first request, because WebKit caps
--     JavaScript-written cookies at 24 hours once it sees a UTM-tagged link,
--   * rate-limit and screen for spam, which a public REST endpoint cannot,
--   * hand the visitor their reference and their /q/<token> link in the same
--     response that created the row.
--
-- Consequence: with no client-side write path, the publishable key -- which is
-- public by design and sits in the browser bundle -- can no longer be used to
-- write anything into this table at all.

drop policy if exists enquiries_insert_anyone on public.enquiries;

revoke insert on table public.enquiries from anon, authenticated;

comment on table public.enquiries is
  'Conversion event. Written ONLY by the server-side client holding the secret '
  'key; there is deliberately no browser write path. Readable by the customer '
  'who owns the row, by staff, and -- through enquiry_by_token() only -- by '
  'whoever holds the private link.';
