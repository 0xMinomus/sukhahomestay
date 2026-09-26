# Contributing to the Sukha Homestay site

How to run, verify and change this site. Every command, path, route and line number
below was checked against the working tree on **2026-09-26**; line numbers will drift,
so re-check a citation before you act on it.

This file is the how-to. `docs/audit-report.md` is the audit record — it carries the
evidence and risk discussion for past decisions. `docs/image-sources.md` is the
authoritative image provenance manifest. `AGENTS.md` is the agent house rules. If any
two disagree about a fact, the source wins over all four documents.

---

## Quick start

Requires Node 24 and npm 11 (verified on v24.11.1 / 11.6.2).

```sh
cd "C:/Users/Andika/Documents/SUKHA Homestay/sukha-homestay"
npm install
npm run build                                  # tsc -b && vite build
npm run lint                                   # oxlint
npm run dev -- --host 127.0.0.1                # http://127.0.0.1:5173
```

If `cd` does not work for you because you start somewhere else, use `--prefix` on every
npm call instead — see [The working-directory trap](#the-working-directory-trap) below.
That trap has cost three agents a full session; read it before your first command.

---

## The working-directory trap

**Hired agents do not land in the repo root.** They start in
`docs/munder-difflin/hires`, which is not the project. If your shell starts in
`C:/Users/Andika/Documents/SUKHA Homestay` (one level above the repo), there is no
`package.json` in that folder or in any folder above it, and a bare npm command fails
before it ever reaches the site. The exact error, observed:

```
npm error code ENOENT
npm error syscall open
npm error path C:\Users\Andika\Documents\SUKHA Homestay\package.json
npm error errno -4058
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory,
           open 'C:\Users\Andika\Documents\SUKHA Homestay\package.json'
```

Exit code 38.

### The fix: use `--prefix`

```sh
npm --prefix "C:/Users/Andika/Documents/SUKHA Homestay/sukha-homestay" run build
npm --prefix "C:/Users/Andika/Documents/SUKHA Homestay/sukha-homestay" run lint
npm --prefix "C:/Users/Andika/Documents/SUKHA Homestay/sukha-homestay" run dev -- --host 127.0.0.1
npm --prefix "C:/Users/Andika/Documents/SUKHA Homestay/sukha-homestay" install
```

Read source files by their full path under
`C:\Users\Andika\Documents\SUKHA Homestay\sukha-homestay`, not relative to your
working directory.

### Why the trap is confusing

npm walks **up** the folder tree looking for `package.json`. From
`docs/munder-difflin/hires` it finds the repo's `package.json` two levels up, so a
bare `npm run build` *happens* to work there. From the workspace root there is nothing
above it, so it fails. The command is not reliably broken or reliably fine — it
depends on where you are, which is exactly why it burns people.

**Check where you are in one second** before running anything:

```sh
npm prefix
```

It must print `C:\Users\Andika\Documents\SUKHA Homestay\sukha-homestay`. If it prints
anything else, or errors, you are in the wrong place — add `--prefix`.

**If a command fails, report the exact error and stop. Do not run it again.** Two
agents on this floor have been circuit-breaker-killed by retry loops. One failure with
the real message is worth more than three attempts.

---

## Route reference

Nine route patterns, one dynamic room route and one dynamic experience route. All
registered in `src/App.tsx:191-201`; slugs come from `src/data/content.ts`.

| Route | Page component | Notes |
| --- | --- | --- |
| `/` | `src/pages/Landing.tsx` | Has `Hero` |
| `/stay` | `src/pages/Stay.tsx` | Has `Hero` |
| `/rooms/:slug` | `src/pages/RoomDetail.tsx` | Three slugs, listed below |
| `/amenities` | `src/pages/Amenities.tsx` | Has `Hero` |
| `/dining` | `src/pages/Dining.tsx` | Has `Hero` |
| `/experiences` | `src/pages/Experiences.tsx` | Has `Hero` |
| `/experiences/:slug` | `src/pages/ExperienceDetail.tsx` | Four slugs, listed below |
| `/booking` | `src/pages/Booking.tsx` | **No `Hero`, no `ClosingBand`.** Only page that sets `tone="dark"` on the navbar |
| `*` | `NotFound` in `src/App.tsx:152` | Client-side only; returns HTTP 200, not a 404 |

### Room slugs — `src/data/content.ts:127-197`

| Slug | Name | Line |
| --- | --- | --- |
| `garden-suite` | Garden Suite | `content.ts:129` |
| `canopy-room` | Canopy Room | `content.ts:152` |
| `courtyard-studio` | Courtyard Studio | `content.ts:175` |

### Experience slugs — `src/data/content.ts:276-365`

The slug list is also the TypeScript union `ExperienceSlug` at `content.ts:247-251`, so
adding an experience means adding it to the union too or the build fails.

| Slug | Title | Line |
| --- | --- | --- |
| `rice-field-walk` | Rice-field walk | `content.ts:278` |
| `river-stones-waterfalls` | River stones & waterfalls | `content.ts:300` |
| `sunrise-on-the-ridge` | Sunrise on the ridge | `content.ts:322` |
| `hands-at-work` | Hands at work | `content.ts:344` |

Room lookup is a `findIndex` over `ROOMS` at `RoomDetail.tsx:16`. Experience lookup goes
through `getExperienceBySlug` (`content.ts:367`), which trims, strips trailing slashes and
lowercases. An unknown room slug and an unknown experience slug behave differently —
check the page before assuming.

### Deep links on the deployed site

`vercel.json` rewrites every path to `/`, so deep links like `/rooms/garden-suite` work
on Vercel. There is **no** production domain configured in the repo, so there is no
`og:image`, no canonical URL, no sitemap and no structured data. Do not add any of
those without an owner decision — see the open decisions at the end of
`docs/audit-report.md`.

---

## Where content lives

`src/data/content.ts` owns anything reused: nav links, contact details, room specs,
prices, amenities, the daily rhythm, seasonal food, the experience registry, and the
booking steps and assurances.

What is **not** there yet, and is a page-local array inside a component:

| Content | Lives at |
| --- | --- |
| Landing teaser cards | `Landing.tsx:8` `WANDERS` |
| Landing stat strip | `Landing.tsx:16` `STATS` |
| Stay rituals and house rules | `Stay.tsx:8` `RITUALS`, `Stay.tsx:10` `HOUSE_RULES` |
| Dining service facts | `Dining.tsx:6` `FACTS` |
| Room detail benefits and hero alt text | `RoomDetail.tsx:10` `BENEFITS`, `RoomDetail.tsx:12` `ROOM_HERO_ALT` |

If you reuse one of these strings on a second page, move it to `content.ts` rather than
importing across pages. Do not put a new image URL or a new price in a component.

---

## House patterns a change must follow

### `cn()` does not merge classes

`src/lib/cn.ts` is three lines:

```ts
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
```

It filters out falsy values and joins with spaces. It is **not** `tailwind-merge` and
it does **not** resolve conflicting classes. `cn("p-2", "p-4")` gives you `"p-2 p-4"`
and CSS decides, not you. When you need a caller to override a component's padding or
text size, either accept a prop for it or write the override in a later class that wins
by CSS specificity. Do not assume `cn()` will do it for you.

### `md` is the layout switch

`md:` (768px) appears **189 times** across `src/`. It is the one breakpoint the design
is built on. The others, as of 2026-09-26:

| Prefix | Count | What it is for |
| --- | --- | --- |
| `sm:` (640) | 28 | Chrome only — navbar height, nav links, hero h1, 3-up grids |
| `md:` (768) | 189 | The layout switch. Reach for this |
| `lg:` (1024) | 11 | 4-up grids and menu padding only |
| `xl:` (1280) | 0 | Not used |
| `min-[420px]` | 1 | `Booking.tsx:302` form grid |
| `min-[480px]` | 2 | `Navbar.tsx:155-156` the BOOK / BOOK YOUR STAY label |

Design at **390px and 1440px**. If a layout needs a third switch, it is almost always
`md` doing a job you gave to a new prefix.

### Motion: the package is `motion`, not `framer-motion`

`package.json` depends on `motion` (^13.4.1). Import from `"motion/react"`. There is no
`framer-motion` in the tree and adding it would double the bundle.

**`EASE` is a readonly 4-tuple and TypeScript insists on it.** It lives at
`src/components/motion.tsx:5`:

```ts
export const EASE = [0.22, 1, 0.36, 1] as const;
```

Because of `as const` it is a `readonly` tuple, and `motion`'s `ease` prop wants a
mutable one. Every call site therefore spreads it: `ease: [...EASE]`. Writing
`ease: EASE` is a type error. Do not "fix" the const by dropping `as const` — that
moves the type error somewhere less obvious.

**Every motion primitive honours `useReducedMotion()`.** It is called in all four:
`motion.tsx:21` (`Reveal`), `:65` (`Stagger`), `:96` (`Headline`), `:136`
(`ParallaxImage`), plus `Hero.tsx:7` for the hero text rise. A new animation that does
not check it is a defect, not a shortcut. The pattern is to branch the *initial* value
and keep the animation, e.g. `initial={{ y: reduce ? 0 : "110%" }}`.

Page transitions are not a primitive — they live in `App.tsx:183-190`, an
`AnimatePresence mode="wait"` around a `motion.main` keyed by pathname.

### Section layout

Every page section follows the same skeleton:

```
<section className="bg-sand">
  mx-auto max-w-[1440px] px-6 py-20 md:px-[120px] md:py-28
  grid grid-cols-1 md:grid-cols-2 md:gap-20
```

Backgrounds cycle cream → sand → cream → sand and do not repeat within a page.

### Images

- Ten local files in `src/assets/img`, imported so Vite hashes them. Ten remote
  Unsplash/Pexels URLs in `content.ts`, each with a baked-in `w=`.
- The `Hero` image is `fetchPriority="high"` + `decoding="async"` (`Hero.tsx:56-57`)
  and is **never** lazy. Everything below the fold is `loading="lazy"`.
- `ParallaxImage`: the parent carries `aspect-[…]` and the image is `h-[112%]` to give
  the translate slack.
- Cards: `aspect-[3/4] w-full` with `group-hover:scale-[1.06]` over a `from-black/60`
  scrim.
- If you add a remote image, add it to `docs/image-sources.md` with its source page,
  photographer and source-stated location. Write `Unknown` when the source page states
  no location — do not infer one.

### Voice and type

Mono uppercase labels, serif headings, 15/16px `text-stone` body, prose capped at
`max-w-md` or `max-w-xl`. Tokens are declared in the `@theme` block at
`src/index.css:3-23`: `cream`, `sand`, `blush`, `clay`, `ink`, `stone`, `moss`, `line`,
and the `Newsreader` / `IBM Plex Mono` / `Inter` font stack.

---

## Verifying a change

Run the narrow check first, then the full gate.

```sh
npm --prefix "C:/Users/Andika/Documents/SUKHA Homestay/sukha-homestay" run lint
npm --prefix "C:/Users/Andika/Documents/SUKHA Homestay/sukha-homestay" run build
```

**There is no test suite.** No `test` script, no test framework, no test dependencies.
Lint and build are the only automated gates, so a UI change is not proven until you have
looked at it.

### Expected output

`npm run build` (`tsc -b && vite build`) passes on a clean tree in about 1.5s and emits
one CSS file and **one 489 kB JavaScript chunk** (150 kB gzipped). That single chunk is
a known issue, not a regression — see open defects.

`npm run lint` (`oxlint`) exits 0 with **two pre-existing warnings** and no errors:

```
src/components/motion.tsx:5:14  react(only-export-components)  — the EASE export
src/components/Navbar.tsx:46:5   react(set-state-in-effect)     — setOpen(false) on pathname change
```

These are the baseline. Do **not** silence them by loosening a rule in
`.oxlintrc.json`. If `EASE` moves to its own file, the first warning disappears on its
own. Treat any *third* warning as something you introduced.

### Browser check

For anything a visitor can see, look at it — build and lint will not tell you a page is
readable.

```sh
npm --prefix "C:/Users/Andika/Documents/SUKHA Homestay/sukha-homestay" run dev -- --host 127.0.0.1
```

Then open the route at **1440px and 390px**. Check the changed route and one neighbour;
a layout change at `md` shows up on the pages around it. Report what you actually saw,
not what you expected.

---

## Known open defects

Every item below was re-read in the current tree on 2026-09-26. All are **open** — none
of these are fixed. Do not document any of them as shipped behaviour.

### Content correctness — needs an owner decision, not a code change

| # | Defect | Where |
| --- | --- | --- |
| 1 | Contact details look like placeholders. `6281234567890` is a sequential number, and `+62 812 3456 7890` matches it. **Every WhatsApp call-to-action on the site points at it.** | `content.ts:83-85` |
| 2 | Rates are not real amounts: `From IDR 1.850K / night` and similar. Three components then re-derive a display price by string-slicing the same string, which is how the numbers drifted apart | `content.ts:145,168,191`; sliced at `Stay.tsx:85`, `Navbar.tsx:240`, rendered whole at `RoomDetail.tsx:165` |
| 3 | **Breakfast is stated three different ways**: `07:00`, `7:00 — 10:00`, and `08:30` | `Landing.tsx:19`, `Dining.tsx:7`, `content.ts:222-223` |
| 4 | Alt text is mostly headlines, not descriptions. The three landing teasers render `alt={w.headline}` — "Walk old paths" as an alt attribute | `Landing.tsx:121` |
| 5 | `ROOM_HERO_ALT` is a page-local second copy of hero alt text that belongs in `content.ts`, and its `?? room.name` fallback ships a weak alt on a slug miss | `RoomDetail.tsx:12-16`, fallback at `RoomDetail.tsx:60` |
| 6 | Ten bundled images have unknown provenance. They are the landing and experiences heroes and all four experience photos. Not publishable as sourced photography, and they block honest alt text because raster bytes cannot be inspected | `docs/image-sources.md:47-56` |

Unresolved: breakfast hours, real WhatsApp number, email and display phone, real rates
and the IDR format, minimum-stay policy, children and celebration policy, per-room
occupancy, whether the pool has valley views, approval to replace the ten unverified
images, and the production domain. **Do not invent a plausible value for any of these.**

### Frontend

| # | Defect | Where |
| --- | --- | --- |
| 7 | `html { scroll-behavior: smooth }` is set globally, and `ScrollToTop` calls `window.scrollTo(0, 0)` with no `behavior: "instant"`. Every route change is an *animated* scroll away from the visitor's position — up to a second of travel from a deep page. It calls `scrollTo` three times (sync, `requestAnimationFrame`, `setTimeout 0`) | `index.css:25-27` + `App.tsx:133-141` |
| 8 | **No `ErrorBoundary` anywhere, and no `Suspense`.** Any throw in any component white-screens the whole app with no recovery path | no `ErrorBoundary` / `Suspense` / `lazy` in `src/` |
| 9 | `Experiences.tsx:8` does `const [signature, ...rest] = EXPERIENCES`. An empty registry makes `signature` undefined and `signature.img` throws — with no boundary, from defect 8 | `Experiences.tsx:8` |
| 10 | Navbar tone is derived from `pathname === "/booking"`. That is a **page-identity check, not a layout fact**. Add a light-headered page and the nav goes cream-on-cream | `App.tsx:169` |
| 11 | All eight pages are eagerly imported into one 489 kB chunk. No route-level code splitting | `App.tsx:8-15` |
| 12 | No `width`/`height` on any `<img>` and no `onError` fallback anywhere. A remote 404 or an offline visit shows a broken-image glyph on a `bg-moss` field. Contained today only by the aspect boxes around the images | `Hero.tsx:53`, `motion.tsx:142` (`ParallaxImage`'s `motion.img`), `ExperienceCard.tsx:12`, `Landing.tsx:119`, `Stay.tsx:53`, `RoomDetail.tsx:118` |
| 13 | All 18 remote URLs carry a single fixed `w=`. A 390px phone downloads 2400px heroes. No `srcSet`, no `sizes` | `content.ts` image constants |
| 14 | The section-header band is copy-pasted 9 times across 6 pages and has drifted to three different gaps (`gap-3` ×6, `gap-4` ×2, `gap-6` ×1), and the same `Headline` role is `text-[43px]` in five files and `text-[44px]` in seven. It belongs in `bits.tsx` | `Amenities.tsx:53,124`, `Booking.tsx:460`, `Dining.tsx:110`, `ExperienceDetail.tsx:38,63`, `Experiences.tsx:77`, `Landing.tsx:102`, `RoomDetail.tsx:142` |
| 15 | The mono-label-over-serif-value list is hand-built in at least five places — `Dining.tsx:6` and `Stay.tsx:10` are page-local, the rest live in `content.ts` | `Dining.tsx:6`, `Stay.tsx:10`, `content.ts:212,217,227,234,378` |
| 16 | `Hero` has no CTA slot, so `RoomDetail` pushes "CHECK AVAILABILITY" about three screens down. `Hero` also defaults `imgAlt = ""`, which is a silent unlabelled-image trap | `Hero.tsx:23` |
| 17 | All three `Landing.WANDERS` teaser cards link to `/experiences` instead of the experience each image depicts | `Landing.tsx:117` |
| 18 | `Experiences.tsx:97` nests a `Headline` inside a `Reveal`, so the same element animates twice. Every other page lets `Headline` animate alone | `Experiences.tsx:97` |

Not defects, for the record: the `only-export-components` and `set-state-in-effect`
lint warnings are the accepted baseline (see [Expected output](#expected-output)), and
`index.html` mirroring the home title/description is deliberate — it is the static
default for crawlers before JavaScript runs.

---

## Boundaries

- Do not commit invented content. Unsourced fact → ask, never a plausible value.
- Do not create or swap an image. Ten existing ones are already unverified; adding more
  grows the problem.
- Do not silence a lint warning by loosening `.oxlintrc.json`.
- Do not edit `dist/`, `node_modules/` or `.code-graph/`.
- Do not commit, push, or run destructive git unless the card says so. The main agent
  owns the commit.
- `hive/`, `roster.json` and `roster-backups/` belong to the Munder Difflin app. Never
  edit, stage or commit them.

---

## Related documents

| File | What it holds |
| --- | --- |
| `AGENTS.md` | Agent house rules and the Munder Difflin floor conventions |
| `docs/audit-report.md` | Audit record: evidence, decisions, and open owner decisions |
| `docs/image-sources.md` | Every image's source page, photographer, stated location, and the unverified files |
| `README.md` | One line. This guide is the real entry point |
