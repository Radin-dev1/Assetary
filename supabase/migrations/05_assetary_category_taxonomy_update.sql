-- Replace category taxonomy: HDRIs, 2D Assets, 3D Assets, Material, Scenes, Templates.
-- Rigs, Poses, Textures, and Props are removed entirely (folded into 2D/3D Assets, or dropped).
-- Safe to run even with live data: any asset still referencing a removed slug would violate
-- the FK, so this only succeeds while those categories are unused (true as of this migration).

delete from public.categories where slug in ('rigs', 'poses', 'textures', 'props');

update public.categories set name = 'Material' where slug = 'materials';

insert into public.categories (slug, name, emoji) values
  ('2d-assets', '2D Assets', '🖌️'),
  ('3d-assets', '3D Assets', '🧊')
on conflict (slug) do nothing;
