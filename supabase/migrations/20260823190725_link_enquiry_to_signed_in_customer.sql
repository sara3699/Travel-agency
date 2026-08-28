-- link_enquiry_to_signed_in_customer.sql
--
-- Bug found on 2026-08-23 by seeding demo data: a signed-in customer's enquiry
-- was never linked to their account, so "my enquiries" would always be empty.
--
-- Cause: stamp_new_enquiry() set customer_id from auth.uid(), which is correct
-- when the caller is a browser session but is NULL when the caller is the
-- server-side admin client -- and since the migration of 2026-08-23 the admin
-- client is the ONLY thing that can write to this table. So the value was
-- always being nulled.
--
-- Fix: prefer the session, fall back to what was passed in.
--
-- Why the fallback is not a spoofing hole. It would have been under the
-- original design, where a browser could insert directly and could therefore
-- claim another person's id. That path no longer exists: anon and authenticated
-- both had INSERT revoked. Only server code holding the secret key can supply
-- customer_id, and the server action reads it from getCurrentUser(), which
-- verifies the session against the auth server rather than trusting a cookie.
--
-- If a browser write path is ever restored, this fallback MUST be removed in
-- the same commit.

create or replace function public.stamp_new_enquiry()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.reference    := 'TA-' || upper(encode(extensions.gen_random_bytes(4), 'hex'));
  new.access_token := encode(extensions.gen_random_bytes(24), 'hex');

  -- Session first; server-supplied identity second. Never client-supplied,
  -- because no client can reach this table.
  new.customer_id  := coalesce((select auth.uid()), new.customer_id);

  new.status       := 'new';
  new.assigned_to  := null;
  new.received_at  := now();
  new.first_response_at := null;
  new.archived_at  := null;
  return new;
end;
$$;
