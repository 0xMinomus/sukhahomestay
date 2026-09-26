# Pam — content/image owner

## SHM-3 (2026-09-26) — read-only copy + image audit of the site. Delivered.

Findings sent to god in the terminal. Nothing in the repo was edited. No commits.

Headline, in order of risk:
1. Breakfast time is stated three different ways: `Dining.tsx:7` "7:00 — 10:00", `Landing.tsx:19` "07:00",
   `content.ts:223` RHYTHM "08:30". Needs god's real hours.
2. `content.ts:83/85` contact details look like placeholders (`6281234567890`, `+62 812 3456 7890`).
   Every WhatsApp CTA points at them.
3. `content.ts:145/168/191` prices `IDR 1.850K` are not a real amount, and three components render
   them differently by string-slicing (`Stay.tsx`, `Navbar.tsx`, `RoomDetail.tsx`).
4. Alt text: no `<img>` is missing an `alt`, but most are titles, not descriptions. Worst:
   `Landing.tsx:121` `alt={w.headline}` renders "Walk old paths" / "Meet the morning" / "Follow the
   river" as alts. `RoomDetail.tsx:13-15` ROOM_HERO_ALT asserts features the source pages contradict.
5. Copy lives in six page-local arrays, not content.ts: `Landing.tsx:8-21`, `Stay.tsx:8-13`,
   `Dining.tsx:6-10`, `RoomDetail.tsx:10-16`, `Footer.tsx:5`. `EXPERIENCES[].tagline` is dead code
   (4 copies of a sentence already in `overviewBody`).
6. Ten bundled files under `src/assets/img/` have unknown provenance per `docs/image-sources.md`.
   They are the Landing/Stay/Experiences heroes and all four experience photos. Cannot be published
   as sourced photography; also blocks honest alt text, because raster images cannot be inspected
   with my tools (only .svg renders).

## Facts worth keeping
- `docs/image-sources.md` is the provenance record. Unsplash/Pexels source-page titles are the only
  evidence I can use to check alt honesty; I cannot view jpg/png/webp bytes.
- Slot vs asset aspect ratios (measured): 3/4 slots are fed 9:16 files (768x1376 = 0.558) for
  landing-village/mountain/water, all four experience photos, so ~25% is cropped by `object-cover`.
  `stay-ritual.jpg` is 1080x720 and matches its 3/2 slot. `stay-hero`/`experiences-hero` are 2:3.
- Room specs/prices/hours live only in `content.ts`; the rest of the site re-derives them by
  string-slicing, which is why the numbers drifted apart.
- Meta: `App.tsx` owns route titles, `index.html` hand-mirrors the home title/description three
  times. No `og:image` anywhere.

## Rules I follow here
- Never invent a price, hour, distance or phone number. Unsourced fact → question for god, never a
  plausible value.
- No commit, no push, no `hive/`, `roster.json`, `roster-backups/`. Reports go to god in the terminal
  because this provider has no hive inbox.

## Open questions for god (blocking the first content pass)
Breakfast hours; real WhatsApp/email; real rates + IDR format; minimum-stay policy; children and
celebration policy; per-room occupancy; whether the pool has valley views; approval to replace the
ten unverified bundled images; og:image and the production domain.
