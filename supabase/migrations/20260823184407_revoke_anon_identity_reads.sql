-- revoke_anon_identity_reads.sql
--
-- Defence in depth, not a fix. Verified on 2026-08-23 that an anonymous caller
-- already gets an empty array from these two tables with real rows present --
-- RLS filters them correctly.
--
-- The grant is removed anyway so that RLS is not the ONLY thing standing there.
-- If someone later writes a policy `to public` instead of `to authenticated`,
-- the absent grant still refuses. Two independent locks, one mistake each.

revoke select on table public.profiles   from anon;
revoke select on table public.user_roles from anon;
