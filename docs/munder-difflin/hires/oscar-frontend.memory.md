# Oscar — frontend engineer memory

## Who I am
Frontend implementer for the Sukha Homestay site. Wait for a card in `hive/tasks.json`
or a message from god; never invent work. My cwd is `docs/munder-difflin/hires`, which has
no `package.json` — read source by full path and run npm with
`--prefix "C:/Users/Andika/Documents/SUKHA Homestay/sukha-homestay"`.

## Hard rules I work to
- Never commit, push, or run destructive git. Never touch `hive/`, `roster.json`,
  `roster-backups/` — those belong to the Munder Difflin app.
- Never write outside my own memory file unless a card says so.
- A visitor-visible change is not done until I have seen it in a browser at 1440px and
  390px. `npm run dev -- --host 127.0.0.1`, open the route, report what I observed.
- `npm run build` after import/ behaviour changes, `npm run lint` before reporting.
  Never silence a lint warning by loosening a rule.
- Never introduce an AI-generated image. Copy and image URLs live in
  `src/data/content.ts`; do not scatter them through components.

## SHM-4 — component + route map (read-only recon, delivered 2026-09-26)
Deliverable sent to god as a `done` message. Summary:

**components/** — `motion.tsx` (Reveal, Stagger/Item, Eyebrow, Headline, ParallaxImage,
`EASE`) used by every page; `Hero.tsx` (full-bleed header, 7 of 8 pages, not Booking);
`Navbar.tsx` and `Footer.tsx` (mounted once in `App.tsx` `Shell`); `bits.tsx`
(`ClosingBand`, `GhostButton`); `ExperienceCard.tsx` (used by `Experiences` and
`ExperienceDetail` only).

**pages/** — `Landing` `/`, `Stay` `/stay`, `RoomDetail` `/rooms/:slug`, `Amenities`
`/amenities`, `Dining` `/dining`, `Experiences` `/experiences`, `ExperienceDetail`
`/experiences/:slug`, `Booking` `/booking` (only page with no `Hero` and no
`ClosingBand`).

**House patterns worth remembering**
- Tailwind v4 tokens declared in `src/index.css` `@theme`. `cn()` in `src/lib/cn.ts` is
  a plain filter/join, NOT tailwind-merge — it does not resolve conflicting classes.
- Every page: `<section className="bg-sand">` → `mx-auto max-w-[1440px] px-6 py-20
  md:px-[120px] md:py-28` → `grid grid-cols-1 md:grid-cols-2 md:gap-20`. Backgrounds
  cycle cream → sand → cream → sand, never repeat within a page.
- Motion: `motion/react` (package `motion`, not framer-motion). Always
  `ease: [...EASE]` from `components/motion.tsx` — TS wants a 4-tuple, the const is
  `readonly`. Page transitions live in `App.tsx` (`AnimatePresence mode="wait"` on
  `motion.main` keyed by pathname). Everything else uses the primitives.
  `Headline` takes `lines: string[]`, one entry per visual line. Every primitive
  honours `useReducedMotion()`; new animations must too.
- Images: 10 local files in `src/assets/img` (Vite hashes them) + 18 Unsplash/Pexels
  URLs in `content.ts` with a baked-in `w=`. `Hero` img is `fetchPriority="high"`
  + `decoding="async"` + ken-burns, never lazy. Everything below the fold is
  `loading="lazy"`. `ParallaxImage` = parent carries `aspect-[…]`, img is `h-[112%]`
  to give the ±`amount` translate slack. Cards: `aspect-[3/4] w-full` +
  `group-hover:scale-[1.06]` over a `from-black/60` scrim.
- Breakpoints: `md` (768) is the single layout switch and is used 189×. `sm` (640) is
  chrome-only — Navbar height, `hidden sm:flex` nav links, `sm:text-6xl` hero h1,
  `sm:grid-cols-3`. `lg` (1024) appears 11×, 4-up grids and menu padding only. `xl`
  once. Two ad-hoc ones: `min-[420px]` (Booking form) and `min-[480px]` (BOOK label).
  Design at 390 and 1440; reach for `md`, not a new breakpoint.
- Tone: mono uppercase labels, serif heads, 15/16px `text-stone` body, max prose
  width `max-w-md` / `max-w-xl`.

**Top three UI improvements I ranked (SHM-4)**
1. Responsive image delivery — every `img` gets a `srcSet` from a `w=`-rewriting
   helper plus `sizes` and intrinsic `width`/`height`. Today all 18 remote URLs are
   one fixed width, so a 390px phone downloads 2400px heroes.
2. Route-level code splitting — `App.tsx` eagerly imports all 8 pages into one
   489 KB chunk; `React.lazy` + `Suspense` per route.
3. `Landing.WANDERS` — all three teaser cards link to `/experiences` instead of the
   experience each image depicts.

**Defects I found by reading (no browser needed)**
- `index.css` sets `html { scroll-behavior: smooth }` and `ScrollToTop` in `App.tsx`
  calls `window.scrollTo(0, 0)` with no `behavior: "instant"` → every route change is
  an animated scroll away from the visitor's position. Feels like up to a second of
  travel on a deep page.
- No `ErrorBoundary` anywhere and no `Suspense`. Any throw white-screens the app.
- No `onError` on any `<img>`; an Unsplash/Pexels 404 or an offline visit shows a
  broken-image glyph on a `bg-moss` field.
- No `width`/`height` on any `<img>` (Hero.tsx:53, motion.tsx:145, ExperienceCard:12,
  Landing:119, Stay:53, RoomDetail:118). Contained today by the aspect boxes, but not
  if an image is ever moved out of one.
- Duplicated section-header band in 8 places across 6 pages, drifting:
  `ExperienceDetail:38` and `RoomDetail:142` use `gap-4`, the rest `gap-3`; the same
  role is `text-[43px]` in some and `text-[44px]` in others. Belongs in `bits.tsx`.
- Duplicated mono-label-over-serif-value list in 7 places (Amenities `AmenityCell`,
  Dining `FACTS`, Stay `HOUSE_RULES`, Experiences facts, ExperienceDetail facts,
  RoomDetail inclusions, Booking `BOOKING_STEPS`).
- `Hero` has no CTA slot, so `RoomDetail` pushes "CHECK AVAILABILITY" three screens
  down; `Hero` also defaults `imgAlt = ""`, a silent-unlabelled-image trap.
- `RoomDetail.ROOM_HERO_ALT` is a page-local second copy of hero alt text that belongs
  in `content.ts`; `?? room.name` silently ships a weak alt on a slug miss.
- `App.tsx` derives Navbar `tone` from `pathname === "/booking"` — a page-identity
  check, not a layout fact. Add a light-headered page and the nav goes cream-on-cream.
- `Experiences.tsx:8` destructures `const [signature, ...rest] = EXPERIENCES`; an empty
  array makes `signature` undefined and `signature.img` throws with no boundary.
- Breakfast-time facts are stated four times with different numbers (`Landing.STATS`
  "07:00", `Dining.FACTS` "7:00 — 10:00", `RHYTHM` "07:00", `SEASONAL`).
- `Experiences.tsx:97` nests a `Headline` inside a `Reveal`, double-animating the same
  element; every other page lets `Headline` animate alone.

Lint baseline for reference: `npm run lint` exits 0 with 2 pre-existing warnings —
`motion.tsx:5` `only-export-components` (the `EASE` export) and `Navbar.tsx:46`
`set-state-in-effect` (`setOpen(false)` on pathname change). Do not loosen rules to
clear these; the `EASE` warning disappears naturally if `EASE` moves to its own file.
