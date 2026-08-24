# Assetary

A marketplace for Roblox GFX assets — rigs, HDRIs, poses, textures, materials, props, templates, and scenes. Free and paid, uploaded by creators, checked before they ship.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase — auth (email, Discord, Google), Postgres, storage
- Vercel for hosting

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project URL + anon key
npm run dev
```

## Database setup

Run the SQL files in `supabase/migrations/` in order via the Supabase SQL Editor (or `apply_migration` if you're using the Supabase MCP connector):

1. `01_assetary_schema.sql` — profiles, categories, assets, downloads, RLS
2. `02_assetary_reports_migration.sql` — community reports + AI moderation result column
3. `03_assetary_votes_smart_hide.sql` — likes/dislikes and the engagement-weighted report threshold
4. `04_assetary_security_hardening.sql` — enables RLS on `categories`, pins `search_path` on trigger functions, and revokes public RPC access to them (fixes everything the Supabase security advisor flagged after migrations 1–3)

Then create three storage buckets in the Supabase dashboard:

- `assets` — private
- `thumbnails` — public
- `avatars` — public

To make yourself a mod after your first sign-in:

```sql
update public.profiles set role = 'mod' where id = 'your-user-id';
```

## Status

Phase 1 (free-only launch): Supabase is connected and the schema is live (`tlskfoowkzhbqzztrwuq` project) — auth, browse, upload, dashboard, and mod-queue pages all query real data. The catalog is genuinely empty until real assets are uploaded and approved; `/`, `/browse`, and category pages show an honest empty state rather than sample data. Payments (Stripe) and AI moderation wiring land in later phases.
