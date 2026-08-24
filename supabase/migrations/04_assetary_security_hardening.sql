-- Fixes from the Supabase security advisor after the initial 3 migrations:
-- 1) categories had no RLS enabled at all
-- 2) trigger functions had a mutable search_path (SECURITY DEFINER footgun)
-- 3) those trigger functions were publicly callable as RPCs, not just as triggers

alter table public.categories enable row level security;

create policy "categories are viewable by everyone"
  on public.categories for select using (true);

alter function public.handle_new_user() set search_path = public;
alter function public.handle_new_report() set search_path = public;
alter function public.handle_vote_change() set search_path = public;
alter function public.handle_new_download() set search_path = public;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.handle_new_report() from public, anon, authenticated;
revoke execute on function public.handle_vote_change() from public, anon, authenticated;
revoke execute on function public.handle_new_download() from public, anon, authenticated;
