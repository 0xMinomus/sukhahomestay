# Sukha Homestay repository audit

## Scope and methodology

This report covers the evidence-backed cleanup batch and the subsequent experience-detail source changes for the Vite + React + TypeScript single-page application. It records the current route, content, interaction, accessibility, and deployment-source state; it is not a production-readiness certification.

The original audit used read-only source inspection, internal link and import searches, route/page mapping, and evidence from the orchestrator's scout, content, frontend, shell/deploy, QA, reviewer, security, and tester workers. Source paths referenced below are the current implementation. This update distinguishes three evidence layers:

- **Previous baseline:** browser and gate evidence captured before the experience-detail cutover.
- **Current source evidence:** the four experience routes, their shared data and rendering architecture, overview cutover, enquiry behavior, and metadata wiring confirmed by source inspection for this report.
- **Final integration verification:** recorded below, after the integrated tree was checked. It covers build, lint, real Chromium at 1440×900 and 390×844, and the git diff check. It does **not** cover any remote deployment, because none was performed for that feature.

## Route audit

**Current route set (source fact):**

| Route | Purpose |
| --- | --- |
| `/` | Landing and editorial teasers for rooms, experiences, and dining |
| `/stay` | Three-room collection and stay overview |
| `/rooms/:slug` | Shared detail implementation for `garden-suite`, `canopy-room`, and `courtyard-studio` |
| `/amenities` | Facilities, daily rhythm, and practical stay details |
| `/dining` | Breakfast, selected-evening supper, and seasonal food |
| `/experiences` | Experience overview; all four experience discovery paths lead to their detail routes |
| `/experiences/rice-field-walk` | Rice-field walk experience detail |
| `/experiences/river-stones-waterfalls` | River stones and waterfalls experience detail |
| `/experiences/sunrise-on-the-ridge` | Sunrise on the ridge experience detail |
| `/experiences/hands-at-work` | Hands at work experience detail |
| `/booking` | Validated enquiry composer and WhatsApp handoff |
| `*` | Branded Not Found recovery page |

The four experience paths above are the current canonical in-app experience routes. "Canonical" here means the supported route identity within the application. The site is deployed and reachable at `https://sukhahomestay.vercel.app` — that is a live host, verified 2026-09-26, not a source-tree fact, and the repository still defines no canonical-link SEO tag.

All primary pages have substantive content, are connected to navigation, footer, discovery, or CTA paths, and render route-specific metadata. The shared room-detail and experience-detail components are deliberate data-driven patterns, not duplicate page code. The landing-page sections overlap with their destination pages only as teasers.

**Current decision:** the formerly absent experience detail is now implemented as one shared route component backed by the typed experience registry. The `Contact` navigation item intentionally targets `/booking`; changing that would require an owner decision and verified contact content.

## Experience-detail source changes

### Centralized data and lookup

`src/data/content.ts` now owns the experience detail source of truth:

- `ExperienceSlug` restricts valid slugs to `rice-field-walk`, `river-stones-waterfalls`, `sunrise-on-the-ridge`, and `hands-at-work`.
- `Experience` defines the shared content contract used by cards, overview content, detail content, and metadata, including image copy, overview copy, optional facts, host-confirmation wording, enquiry label, and SEO description.
- `EXPERIENCES` is a single typed, readonly registry containing all four experiences.
- `getExperienceBySlug` is the shared lookup used by both the detail page and runtime metadata. It trims whitespace, removes trailing slashes, lowercases the incoming value, and resolves it against the registry.

This keeps route validity, content, overview discovery, related experiences, and metadata aligned with one registry instead of maintaining four duplicate page implementations or independent slug lists.

### Shared route, card, and detail rendering

`src/App.tsx` registers `/experiences/:slug` once. `src/pages/ExperienceDetail.tsx` resolves the parameter through `getExperienceBySlug`; a known registry entry renders the shared detail layout, while an unknown slug replaces the current location with `/experiences`.

`src/components/ExperienceCard.tsx` is the shared discovery card. It derives `/experiences/${experience.slug}` from the registry entry and labels the action “View details for” the experience title. The detail page uses the same card component for related experiences, filtered by slug so the current experience is not repeated.

The four routes do not imply that the site has confirmed a reservation, booked provider, fixed itinerary, or guaranteed availability. Their copy continues to direct guests to ask and states that a host can confirm details by message.

### Overview cutover

`/experiences` no longer acts as the only place to discover or read experience-specific content:

- the first registry entry remains the signature journey and has an explicit “Explore the Rice-field walk” link to `/experiences/rice-field-walk`;
- the remaining three registry entries render through the shared `ExperienceCard` and link to their respective detail routes;
- overview copy still says that availability and arrangements are confirmed with a host by message.

### Enquiry CTA behavior

Each detail page uses its registry `enquiryLabel` for the CTA and links to `/booking`. The CTA is an enquiry handoff, not a reservation or availability confirmation. The booking page prepares a WhatsApp message and does not send or store it; the existing booking and privacy limitations below still apply.

### Runtime metadata behavior

`src/App.tsx` uses the same normalized pathname and `getExperienceBySlug` lookup to create a known detail title as `<experience title> · Sukha Homestay` and uses that registry entry's `seoDescription`. On client navigation, the existing metadata effect updates the document title, description, Open Graph title, Open Graph description, Open Graph URL, Twitter title, and Twitter description.

This is client-injected runtime metadata. No canonical URL, approved social image, sitemap, structured data, or static/prerendered deep-link metadata has been added to the source. Source wiring alone is not runtime, crawler, deployment, or production-domain verification.

## Clean and dead-code audit

High-confidence cleanup completed in the original batch:

- removed the inert, noninteractive Footer **Privacy** affordance rather than inventing a legal policy or page;
- removed the unused `Marquee` component, its drift animation, and unused component props after repository reference checks;
- kept shared hospitality content, images, navigation data, and contact constants centralized in `src/data/content.ts`;
- removed the simulated booking “sent” state and client-generated reference rather than retaining false delivery behavior;
- removed temporary worker smoke scaffolds after their focused checks.

The experience cutover extends the existing centralized-content approach rather than creating a second convention. Route definitions and navigation links remain intentionally separate where desktop/footer presentation differs. The shared room and experience detail components are deliberate data-driven patterns.

## SEO and copy audit

### Supported changes now in source

- route titles and descriptions cover the retained pages, valid room slugs, and the four valid experience slugs; `index.html` defaults and runtime metadata use the same home positioning;
- pathname normalization removes trailing slashes for metadata and valid room and experience lookup;
- location copy consistently uses **Sidemen, East Bali** in the audited page set, replacing the contradictory Stay hero label;
- landing, room, dining, amenities, and experience copy was made more specific and less absolute;
- the unsupported named testimonial was replaced with a non-attributed invitation;
- the experience overview now cuts over to the four detail routes, and experience actions remain enquiries that continue to `/booking`;
- route metadata updates the document title, description, Open Graph title/description/URL, and Twitter title/description after client navigation.

### Factual uncertainty requiring owner approval

The repository is the only available source for these facts; it does not independently prove them. The following remain suitable for publication only after owner verification:

- `https://wa.me/6281234567890`, `hello@sukhabali.com`, and `+62 812 3456 7890`. The sequential number is placeholder-looking. They were retained only because no verified replacement exists in the repository;
- “family-led” and the three-room collection;
- room prices, sizes, capacities, bed types, minimum-stay wording, and private outdoor-space claims;
- daily breakfast, pool, Wi-Fi, housekeeping, transfers, local rides, child/pet handling, selected-evening supper, and experience availability;
- claims about local sourcing, host arrangements, or service details that remain in the current content, including that a host can confirm experience route, timing, availability, or arrangements by message.

No legal, ownership, pricing-policy, or operational policy was inferred or added. A privacy notice remains an owner/legal decision if personal-data handling expands.

## Booking behavior

The booking page does not simulate a successful submission. It validates the guest's name, contact text, required dates, real calendar dates, past dates, and date ordering. Valid input is encoded into the existing WhatsApp URL, and the site opens that external handoff while leaving the guest to send the message.

The UI explicitly says the site does not send or store the enquiry. **There is no booking backend, API request, reservation, availability lookup, delivery receipt, or response-time promise.** Confirmation of availability remains a host conversation after the guest sends the WhatsApp message. Experience detail CTAs do not change these guarantees.

## Accessibility and production-source changes

These are original audit source changes unless explicitly tied to the experience cutover above:

- `App.tsx` normalizes trailing-slash paths for route metadata and room and experience lookup.
- The Not Found view now has a real `h1` and recovery-oriented metadata. This is a client-side not-found state; no HTTP 404 status is claimed.
- The mobile navigation has dialog semantics, `aria-expanded`/`aria-controls`, Escape close, focus containment, focus restoration, and body-scroll locking.
- Room image dialogs have dialog semantics, Escape close, contained focus on the close control, body-scroll locking, and focus restoration to the opening image control.
- Booking validation exposes field errors, moves focus to the invalid field, and provides an announced prepared-handoff state.
- Shared reveal, stagger, and parallax behavior now avoid nonessential movement when reduced motion is requested.
- The Vercel CSP now permits the exact Google Fonts origins already used by `index.html`: `https://fonts.googleapis.com` for styles and `https://fonts.gstatic.com` for fonts. Existing rewrites, cache headers, and other security directives were preserved.
- Static home metadata in `index.html` was aligned with the runtime home title and description.

The current shared experience card and detail route add source-level routes and accessible link labels, but the main agent's final browser verification must determine the current runtime evidence for navigation, focus, responsive layout, overflow, metadata, and invalid-slug redirect behavior after the integrated cutover.

## Verification evidence

### Previous baseline before the experience-detail cutover

- A managed Chromium audit exercised `/`, `/stay`, all three room slugs, `/amenities`, `/dining`, `/experiences`, `/booking`, and an unknown route at 1440×900, 390×844, and 320×700 where applicable. No page errors or horizontal overflow were observed on those then-existing pages. This audit also exposed the baseline booking simulation, missing lightbox Escape behavior, inert Privacy affordance, and inconsistent Not Found heading; those findings describe the pre-change tree.
- The orchestrator ran the baseline `npm run build` and `npm run lint` before the original cleanup batch.

### Previous integration evidence for the pre-experience-detail tree

The following evidence was recorded before the four experience routes were added and must not be treated as verification of the current cutover:

- `npm run build`: `tsc -b && vite build` passed; Vite emitted the production bundle and assets successfully.
- `npm run lint`: `oxlint` completed with two existing-style warnings in `src/components/motion.tsx` and `src/components/Navbar.tsx`; no errors were reported.
- A real Chromium route smoke at 1440×900 covered the routes and slugs that existed at that time. The experience detail routes were not yet present.
- Booking empty, missing identity, missing dates, rejected equal dates, and a valid two-night enquiry were exercised. The valid path showed `WHATSAPP HANDOFF · NOT SENT YET`, no fabricated reference, and an encoded WhatsApp URL containing the entered details. The browser runtime's date-fill helper produced a malformed value for one equal-date case, so the exact equal-date message was not counted as observed.
- The mobile menu and Garden Suite lightbox were exercised in Chromium. Dialog semantics, focus entry/restoration, Escape close, body scroll locking, and focus containment passed. Overflow checks passed at 390×844 and 1440×900.
- Reduced-motion source branches were present. The available browser runtime did not apply the requested media emulation, so reduced-motion behavior remained source-verified but not runtime-verified.
- `vercel.json` parsed successfully. The CSP was tightened to remove unused `unsafe-eval`, arbitrary HTTPS images, and the unused Supabase connection allowance; the exact Google Fonts origins required by `index.html` remain allowed.
- `git diff --check` passed with only checkout line-ending warnings.

### Current source inspection for the experience-detail cutover

Read-only inspection for this report confirmed:

- the four exact `/experiences/:slug` route identities and the single dynamic route registration;
- the typed `EXPERIENCES` registry and shared `getExperienceBySlug` lookup;
- the shared `ExperienceCard` and `ExperienceDetail` implementations;
- overview discovery links to the detail routes;
- detail enquiry CTAs to `/booking` using registry labels;
- runtime detail title and description generation from the shared registry;
- unknown detail slugs redirecting in the client router to `/experiences`.

No build, lint, test, browser, preview, remote HTTP-header, or deployment command was run for this documentation update. These source findings therefore do not replace final integration verification.

### Final integration verification

The main agent and independent verification workers completed the following checks on the integrated experience-detail tree:

- `npm run build`: `tsc -b && vite build` passed after the final UX fixes; Vite emitted the production bundle and all four experience assets successfully.
- `npm run lint`: `oxlint` completed with no errors in the application source. The repository’s two existing-style warnings remain in `src/components/motion.tsx` and `src/components/Navbar.tsx`; unrelated untracked `agent-office/` diagnostics were not treated as project source.
- The mechanical Impeccable detector completed with no findings for the changed experience surfaces and shared Hero.
- Real Chromium smoke passed at 1440×900 and 390×844 for `/experiences` and all four canonical detail routes. Each rendered one h1, route-specific title/description, no horizontal overflow, and no page errors.
- Overview navigation exposed exactly the four detail paths. The three shared cards and the rice-field signature action did not link directly to `/booking`.
- Every detail page exposed three related detail links, excluded itself, rendered its per-record overview copy, and exposed the registry-specific enquiry label plus the final enquiry CTA to `/booking`.
- Unknown one-segment experience slugs redirected to `/experiences`; nested unknown paths rendered the branded Not Found page. Trailing-slash detail variants and the percent-encoded hyphen case (`rice%2Dfield-walk`) resolved to the same route and metadata.
- Keyboard activation, accessible link names, mobile menu Escape/focus return, reduced-motion rendering, image loading, and existing-route regression checks passed in real Chromium.
- `git diff --check` passed with only checkout line-ending warnings.

No deployment or Vercel preview was run for this feature, and the checks below are all local. Runtime metadata remains client-injected. For the record, independently of this feature: the site is live at `https://sukhahomestay.vercel.app` and returns HTTP 200 with the `vercel.json` CSP, deep links included — so canonical URLs, social images, sitemap, structured data, and HTTP 404 behavior are still open, but "there is no deployment" is not one of them.

## Follow-up decisions and risks

1. **Business owner:** replace and verify the placeholder-looking WhatsApp number, phone, and email before publication. Approve or correct all room, price, capacity, amenity, meal, service, policy, location, and experience claims.
2. **Deployment owner:** decide whether to adopt `https://sukhahomestay.vercel.app` as the canonical production domain in `vercel.json` and the metadata, and confirm the security/cache headers and the Google Fonts CSP origins in production. A client redirect or Not Found page is not evidence of an HTTP 404 response; an unknown path returns 200. Deep-link reachability and the CSP have since been checked against the live host and are fine.
3. **SEO owner:** decide whether client-injected metadata is sufficient, and supply the content policy. Canonical URLs, an approved social image, sitemap, structured data, and static/prerendered deep-link metadata were not added. The domain is no longer the blocker — it is known and live. The unresolved inputs are the content policy and the unverified business facts.
4. **Privacy owner:** decide whether a real privacy destination/policy is required before introducing a backend or additional personal-data handling. The prepared WhatsApp URL contains guest-entered data and should be treated as sensitive.
5. **Release status:** the experience-detail implementation and local integration checks are complete. Publication remains conditional on owner verification of the operational contact and business facts. No deployment was performed or claimed during this feature update.
