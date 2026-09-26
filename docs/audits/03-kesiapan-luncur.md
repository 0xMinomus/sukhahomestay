# Meredith — product owner

## SHM-7 (2026-09-26) — launch-readiness list from the Pam + Oscar audits. Delivered.

Read both audits, then verified every load-bearing claim against source. No files edited
outside these two memory files. No commits, no code changes.

---

## The judgement call, stated plainly

**I agree with god. It is a hard stop, for the phone number and the rates.**

And the reason is stronger than "a placeholder is untidy":

> The booking form does not book. `Booking.tsx:114-128` builds a WhatsApp URL out of
> `WHATSAPP_URL`, and `submit()` at `:143` just calls `window.open()` on it. There is no
> server, no booking engine, no form endpoint, and `mailto:` opens a mail client without
> sending anything.

So `WHATSAPP_URL` is not a footer detail. **It is the single terminal node of the entire
commercial funnel.** Verified call sites, all pointing at the same fake number:

| Surface | Location |
| --- | --- |
| Booking form handoff (the only conversion) | `Booking.tsx:127-128, 143` |
| Booking "prefer to talk" number | `Booking.tsx:183-184` (`PHONE_DISPLAY`) |
| Landing "MESSAGE US" | `Landing.tsx:198` |
| RoomDetail "QUESTIONS? MESSAGE OUR HOST" | `RoomDetail.tsx:170` |
| Navbar WhatsApp | `Navbar.tsx:247` |
| Footer WhatsApp | `Footer.tsx:23` |

Every "PLAN YOUR STAY", "CHECK AVAILABILITY", "MESSAGE US" and "PREFER TO TALK" on the site
ends at `wa.me/6281234567890`. The site does not have a broken contact detail. It has a
broken business. "We'll fix it after launch" is not available here, because there is
nothing to launch *to* — the enquiry dies at a number nobody owns.

A guest who is told a rate of `IDR 1.850K` and cannot reach the host has been actively
worse off than finding nothing. That is the whole argument; it does not need hedging.

---

## MUST BE TRUE BEFORE LAUNCH

| # | Decision | Owner | Blocks |
| --- | --- | --- | --- |
| 1 | Put the **real WhatsApp number** in `content.ts:83` + `PHONE_DISPLAY:85`. One edit fixes all 6 surfaces. | human | **YES** |
| 2 | Put **real rates** in `content.ts:145/168/191` in real Indonesian notation (`Rp 1.850.000`, not `IDR 1.850K` — current string is wrong as a format as well as a value). | human | **YES** |
| 3 | **Kill the three price string-slices** (`Navbar.tsx:240`, `Stay.tsx:85`, `RoomDetail.tsx:165`) so the rate can never render two ways again. Ship one formatted price. | frontend | **YES** |
| 4 | **Decide the 10 unsourced images**: replace with licensed, or remove. Do not publish. Also blocks honest alt text (#9). | human | **YES** |
| 5 | **Verify `hello@sukhabali.com` actually receives mail.** Production domain is still undecided, so the second channel may be dead too — then the site has *zero* working contact. | human | **YES** |
| 6 | **One breakfast time, or none.** `Landing.tsx:19` "07:00", `Dining.tsx:7` "7:00 — 10:00", `content.ts:223` "08:30". A contradiction is worse than an omission. Supply hours *or* delete the times and say "breakfast included". | human (fact) → frontend (delete) | **YES** |
| 7 | **Remove unsourced occupancy / minimum-stay claims.** `Landing.tsx:18` "02 GUESTS / ROOM" and `content.ts:146` "Minimum stay may apply" are already asserting facts nobody supplied. The claim is the defect, not the absence — deleting unblocks without the human. | content | **YES** |
| 8 | **`onError` on every `<img>`.** 18 live Unsplash/Pexels URLs, zero handlers. One 404 or an offline visit = broken glyph on a `bg-moss` field. On a quiet-luxury site a broken image reads as an untrustworthy property. | frontend | **YES** |
| 9 | **Alt text that describes, and remove the `Hero` `imgAlt = ""` default.** `Landing.tsx:121` ships the headline ("Walk old paths") as alt; `RoomDetail.tsx` `ROOM_HERO_ALT` asserts features other pages contradict. On a site selling a place, alt text is the only description a screen-reader guest gets. The `""` default will ship unlabelled images by accident. | frontend + content | **YES** |
| 10 | **Point the 3 `WANDERS` cards at the experience each image shows** (`Landing.tsx:8-12`). All three go to `/experiences` today, so the card promises one thing and delivers another. | frontend | **YES** |
| 11 | **Add an `ErrorBoundary`.** `Experiences.tsx:8` throws on an empty array with no boundary → permanent white screen. Lowest-confidence item on this list (the shipped data can't trigger it) but ~20 lines of insurance against total loss. | frontend | **YES** (lowest of the yes) |

Items 6 and 7 are the ones that shorten the critical path: **you can delete a claim, you can
only supply a fact.** Every "blocked on the human" item past #5 can be resolved by removal
and launch today.

## CAN WAIT

| # | Decision | Owner | Blocks |
| --- | --- | --- | --- |
| 12 | `srcSet` + `sizes` on the 18 remote URLs — 390px phone currently pulls 2400px heroes. Highest-value perf win, and Indonesia is mobile-data. | frontend | no |
| 13 | Route-level code splitting (one 489KB chunk). | frontend | no |
| 14 | `og:image`. Cheap — build from a hero already in the repo. Worth doing early: WhatsApp is the primary share channel, so a blank preview is the first impression. | frontend | no |
| 15 | `Hero` CTA slot, so "CHECK AVAILABILITY" isn't 3 screens down on `RoomDetail`. Not urgent — a WhatsApp link sits directly under the price. | frontend | no |
| 16 | Instant scroll on route change (`index.css` smooth + `ScrollToTop` without `behavior:"instant"`). One line. | frontend | no |
| 17 | Email escape in the booking "prepared" state for guests without WhatsApp. The manual fallback is good, but it is the *same dead link*. Depends on #5 first. | frontend | no |
| 18 | Section-header + mono-label duplication → `bits.tsx`. | **nobody** — refactor, not a defect | no |
| 19 | `App.tsx` navbar `tone` from `pathname === "/booking"`. | **nobody** — only bites if someone adds a page. Do not pre-emptively "fix" it. | no |
| 20 | Delete dead `EXPERIENCES[].tagline` (4 duplicates of `overviewBody`). | content | no |
| 21 | Move the 6 page-local copy arrays into `content.ts`. Not urgent, but it is *the* fix that stops the next breakfast-hours drift. | content | no |
| 22 | ~25% crop: 9:16 files (768x1376) in 3/4 slots. Composition call — check on a real screen, don't refactor blind. | frontend | no |
| 23 | Enquiry name + contact travel in a URL query string (`Booking.tsx:128`). Low, note for later. | frontend | no |
| 24 | Keep the 2 lint warnings. Do not loosen rules. `npm run lint` exits 0 today. | **nobody** | no |

---

## Non-goals for this launch

- No booking engine, payment, calendar/availability, or CMS. Out of scope; the WhatsApp
  handoff is a legitimate model for a 3-room family homestay.
- No new page, no nav change, no copy rewrite for tone. The voice is already right.
- No responsive-image or code-splitting work treated as urgent.
- No attempt to answer the human-blocked questions on god's behalf.

## Minimal honest launch

Three facts and one verification, and the site is defensible:

1. Real WhatsApp number (#1).
2. Real rates in real IDR format, rendered from one place (#2, #3).
3. Image provenance decision (#4).
4. Confirm the email address receives mail (#5).

Everything else is a *removal*, not a blocker. If god cannot get rates in time, the
honest fallback is to publish **"Enquire for rates"** and remove every number from the
site — but rates are a real conversion driver for a homestay, so supply them rather than
hide them. Suppress prices only as a last resort.

**The one rule:** no fact on the site that nobody supplied. Every rate, hour, distance and
capacity is either sourced or absent.

## Definition of done (testable)

- Every `WHATSAPP_URL` / `PHONE_DISPLAY` / `EMAIL_URL` link opens a channel a human owns.
- Every price renders from one source, in `Rp 1.850.000` form, identically on Stay, Navbar and RoomDetail.
- The strings `07:00`, `7:00 — 10:00`, `08:30`, `IDR 1.850K`, `1.550K`, `1.350K` and `02 GUESTS / ROOM` return **zero** grep hits sitewide.
- Every `<img>` has descriptive alt text or is explicitly decorative; a forced 404 shows a designed fallback, not a broken glyph.
- 390px and 1440px, all 8 routes, no white screen, no scroll surprise.

## What I did not decide

I did not answer the phone number, the rates, the breakfast hours, the image licensing, the
production domain, the `og:image`, minimum stay, children policy or occupancy. Those are
god's. I ranked them and named which ones can be closed by deleting the claim instead.

## Notes

- `hive/AGENTS.md` says never touch `hive/`, but the SHM-7 work order instructs me to
  write this file. I wrote only my own agent memory — not `board.md`, `tasks.json`,
  `registry.json`, or `spawn-requests/`. Flagging the tension rather than resolving it silently.
- Two claims from the audits that I checked and found *not* to be problems, so nobody
  spends time on them: the booking "prepared" state already handles a blocked popup
  (manual link, "OPEN WHATSAPP AGAIN", "EDIT DETAILS" — `Booking.tsx:266-288`), and
  reduced-motion is already honoured by every primitive. No action.
