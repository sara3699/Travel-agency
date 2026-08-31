-- The staff admin page asks PostgREST to embed a profile in each role row:
--
--   .select('user_id, role, granted_at, profiles:user_id ( display_name, ... )')
--
-- PostgREST can only embed across a FOREIGN KEY it can see. user_roles and
-- profiles were siblings -- both referenced auth.users(id), neither referenced
-- the other -- so there was no edge to traverse and every request returned
-- PGRST200, "Could not find a relationship". listStaff() turns that into a
-- throw, so /admin has been a server-side exception since it was written. It
-- was never reachable, which is why nobody caught it: the page cannot be
-- opened without an admin session, and the one person who has one had no
-- reason to look until today.
--
-- Adding the edge rather than rewriting the query, because the edge is true:
-- a role row is a role held BY a profile. Both tables already cascade from
-- auth.users, so this cannot outlive the user it describes.
--
-- Verified before applying: 22 role rows, 0 of them without a matching
-- profile, so this validates against existing data rather than failing.
alter table public.user_roles
  add constraint user_roles_user_id_profiles_fkey
  foreign key (user_id) references public.profiles (id) on delete cascade;

-- user_id now carries two foreign keys, to auth.users and to profiles. The
-- embed names the column (`profiles:user_id`), so the reference is explicit
-- and PostgREST has no ambiguity to resolve.
comment on constraint user_roles_user_id_profiles_fkey on public.user_roles is
  'Lets PostgREST embed profiles from user_roles. Added 2026-08-30 after /admin was found to 500 on PGRST200.';
