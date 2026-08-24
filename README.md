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

Run the SQL files in `supabase/migrations/` in order via the Supabase SQL Editor:

1. `01_assetary_schema.sql` — profiles, categories, assets, downloads, RLS
2. `02_assetary_reports_migration.sql` — community reports + AI moderation result column
3. `03_assetary_votes_smart_hide.sql` — likes/dislikes and the engagement-weighted report threshold

Then create three storage buckets in the Supabase dashboard:

- `assets` — private
- `thumbnails` — public
- `avatars` — public

To make yourself a mod after your first sign-in:

```sql
update public.profiles set role = 'mod' where id = 'your-user-id';
```

## Status

Phase 1 (free-only launch): auth, browse, upload, and dashboard pages are wired to Supabase. The catalog on `/` and `/browse` currently renders sample data — swap `src/lib/mock-assets.ts` for a live Supabase query once real assets exist. Payments (Stripe) and AI moderation wiring land in later phases.
