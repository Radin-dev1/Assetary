-- Assetary core schema: profiles, categories, assets, downloads, RLS.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'mod', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'user_name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.categories (
  slug text primary key,
  name text not null,
  emoji text not null
);

insert into public.categories (slug, name, emoji) values
  ('rigs', 'Rigs', '🦴'),
  ('hdris', 'HDRIs', '🌅'),
  ('poses', 'Poses', '🧍'),
  ('textures', 'Textures', '🧱'),
  ('materials', 'Materials', '🎨'),
  ('props', 'Props', '📦'),
  ('templates', 'Templates', '🖼️'),
  ('scenes', 'Scenes', '🏙️')
on conflict (slug) do nothing;

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category_slug text not null references public.categories(slug),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  file_path text not null,
  thumbnail_path text not null,
  price numeric not null default 0,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  download_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.assets enable row level security;

create policy "approved assets are viewable by everyone"
  on public.assets for select
  using (status = 'approved' or creator_id = auth.uid());

create policy "users can insert their own assets"
  on public.assets for insert
  with check (creator_id = auth.uid());

create policy "users can update their own pending assets"
  on public.assets for update
  using (creator_id = auth.uid() and status = 'pending');

create policy "mods can update any asset"
  on public.assets for update
  using (exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('mod', 'admin')
  ));

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.assets(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.downloads enable row level security;

create policy "users can log their own downloads"
  on public.downloads for insert
  with check (user_id = auth.uid() or user_id is null);

create policy "users can view their own download history"
  on public.downloads for select
  using (user_id = auth.uid());
