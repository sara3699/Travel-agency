-- tighten_function_grants.sql
--
-- Supabase exposes every function in the `public` schema as a callable REST
-- endpoint at /rest/v1/rpc/<name>. Functions that exist only to back a trigger
-- or a policy should not be part of the public API surface.
--
-- Safe to revoke because:
--   * PostgreSQL checks EXECUTE on a trigger function when the trigger is
--     CREATED, not each time it fires, so triggers keep working.
--   * A SECURITY DEFINER function runs as its owner, so a helper it calls
--     internally is checked against the owner, not the web visitor.

-- Trigger bodies. Never called directly by anyone.
revoke execute on function public.handle_new_user()        from anon, authenticated, public;
revoke execute on function public.stamp_new_enquiry()      from anon, authenticated, public;
revoke execute on function public.log_enquiry_transition() from anon, authenticated, public;
revoke execute on function public.touch_updated_at()       from anon, authenticated, public;
revoke execute on function public.enforce_publish_gate()   from anon, authenticated, public;

-- Only ever called from inside is_staff() / is_admin(), which are definers.
revoke execute on function public.auth_role() from anon, authenticated, public;

-- Policy helpers. Signed-in users need these because a policy expression is
-- evaluated as the caller; anonymous visitors never hit a policy that uses
-- them, so anon does not.
revoke execute on function public.is_staff() from anon, public;
revoke execute on function public.is_admin() from anon, public;
grant  execute on function public.is_staff() to authenticated;
grant  execute on function public.is_admin() to authenticated;

-- The publish gate runs as the admin performing the update, so that role
-- needs it. Nobody else does.
revoke execute on function public.package_incompleteness(uuid) from anon, public;
grant  execute on function public.package_incompleteness(uuid) to authenticated;

-- Anonymous visitors DO need this one: it backs the public read policy on
-- every child table of a published package.
grant execute on function public.package_is_published(uuid) to anon, authenticated;

-- enquiry_by_token stays anon-callable on purpose. It is the entire mechanism
-- behind /q/[token]: a customer arriving from WhatsApp with no account.
