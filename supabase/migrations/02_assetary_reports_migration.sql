-- Community reporting + AI moderation result tracking.

alter table public.assets
  add column if not exists ai_mod_result jsonb;

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.assets(id) on delete cascade,
  reporter_id uuid references public.profiles(id) on delete set null,
  reason text,
  created_at timestamptz not null default now(),
  unique (asset_id, reporter_id)
);

alter table public.reports enable row level security;

create policy "signed-in users can report an asset"
  on public.reports for insert
  with check (reporter_id = auth.uid());

create policy "mods can view reports"
  on public.reports for select
  using (exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('mod', 'admin')
  ));

alter table public.assets
  add column if not exists hidden boolean not null default false;

-- flat baseline: 3+ reports hides an asset until reviewed.
-- superseded by the weighted version in 03_assetary_votes_smart_hide.sql.
create or replace function public.handle_new_report()
returns trigger as $$
begin
  if (select count(*) from public.reports where asset_id = new.asset_id) >= 3 then
    update public.assets set hidden = true where id = new.asset_id;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_report_created on public.reports;
create trigger on_report_created
  after insert on public.reports
  for each row execute function public.handle_new_report();
