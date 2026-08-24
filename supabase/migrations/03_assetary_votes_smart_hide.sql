-- Likes/dislikes + engagement-weighted report threshold, and a fix for the
-- download counter which the original schema tracked but never incremented.

create table if not exists public.asset_votes (
  asset_id uuid not null references public.assets(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz not null default now(),
  primary key (asset_id, user_id)
);

alter table public.asset_votes enable row level security;

create policy "signed-in users can vote"
  on public.asset_votes for insert
  with check (user_id = auth.uid());

create policy "users can change their own vote"
  on public.asset_votes for update
  using (user_id = auth.uid());

create policy "users can remove their own vote"
  on public.asset_votes for delete
  using (user_id = auth.uid());

create policy "votes are viewable by everyone"
  on public.asset_votes for select using (true);

alter table public.assets
  add column if not exists like_count integer not null default 0,
  add column if not exists dislike_count integer not null default 0;

create or replace function public.handle_vote_change()
returns trigger as $$
declare
  target_asset uuid := coalesce(new.asset_id, old.asset_id);
begin
  update public.assets set
    like_count = (select count(*) from public.asset_votes where asset_id = target_asset and value = 1),
    dislike_count = (select count(*) from public.asset_votes where asset_id = target_asset and value = -1)
  where id = target_asset;
  return null;
end;
$$ language plpgsql security definer;

drop trigger if exists on_vote_change on public.asset_votes;
create trigger on_vote_change
  after insert or update or delete on public.asset_votes
  for each row execute function public.handle_vote_change();

-- weighted "smart hide": hide when
--   reports >= max(3, downloads * 0.03 + likes * 0.10 - dislikes * 0.20)
-- tune the three weights below if it hides too much or too little in practice.
create or replace function public.handle_new_report()
returns trigger as $$
declare
  report_count integer;
  threshold numeric;
  a record;
begin
  select * into a from public.assets where id = new.asset_id;

  select count(*) into report_count from public.reports where asset_id = new.asset_id;

  threshold := greatest(
    3,
    a.download_count * 0.03 + a.like_count * 0.10 - a.dislike_count * 0.20
  );

  if report_count >= threshold then
    update public.assets set hidden = true where id = new.asset_id;
  end if;

  return new;
end;
$$ language plpgsql security definer;

-- downloads were logged but never actually bumped download_count — fix that.
create or replace function public.handle_new_download()
returns trigger as $$
begin
  update public.assets set download_count = download_count + 1 where id = new.asset_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_download_created on public.downloads;
create trigger on_download_created
  after insert on public.downloads
  for each row execute function public.handle_new_download();
