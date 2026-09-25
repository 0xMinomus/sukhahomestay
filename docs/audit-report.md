# Sukha Homestay repository audit

## Scope and methodology

This report covers the evidence-backed cleanup batch for the Vite + React + TypeScript single-page application. It records the current route, content, interaction, accessibility, and deployment-source state; it is not a production-readiness certification.

The audit used read-only source inspection, internal link and import searches, route/page mapping, and evidence from the orchestrator's scout, content, frontend, shell/deploy, QA, reviewer, security, and tester workers. Source paths referenced below are the current implementation. **Pre-change evidence** describes the baseline browser and gate runs. **Post-change source evidence** describes focused worker checks; it is not a claim that final integration build, browser, or deployment checks have run.

## Route audit

**Retained routes (source fact):**

| Route | Purpose |
| --- | --- |
| `/` | Landing and editorial teasers for rooms, experiences, and dining |
| `/stay` | Three-room collection and stay overview |
| `/rooms/:slug` | Shared detail implementation for `garden-suite`, `canopy-room`, and `courtyard-studio` |
| `/amenities` | Facilities, daily rhythm, and practical stay details |
| `/dining` | Breakfast, selected-evening supper, and seasonal food |
| `/experiences` | Experience overview with enquiries routed to `/booking` |
| `/booking` | Validated enquiry composer and WhatsApp handoff |
| `*` | Branded Not Found recovery page |

All primary pages have substantive content, are connected to navigation/footer/CTA paths, and render route-specific metadata. The shared room-detail component is a deliberate data-driven pattern, not duplicate page code. The landing-page sections overlap with their destination pages only as teasers.

**Decision:** no empty or materially duplicate route was found, and no new page was created. The `Contact` navigation item intentionally targets `/booking`; changing that would require an owner decision and verified contact content.

## Clean and dead-code audit

High-confidence cleanup completed in the batch:

- removed the inert, noninteractive Footer **Privacy** affordance rather than inventing a legal policy or page;
- removed the unused `Marquee` component, its drift animation, and unused component props after repository reference checks;
- kept shared hospitality content, images, navigation data, and contact constants centralized in `src/data/content.ts`;
- removed the simulated booking “sent” state and client-generated reference rather than retaining false delivery behavior;
- removed temporary worker smoke scaffolds after their focused checks.

Route definitions and navigation links remain intentionally separate where desktop/footer presentation differs. The shared room-detail component is a deliberate data-driven pattern, not duplicate page code.

## SEO and copy audit

### Supported changes now in source

- route titles and descriptions cover the retained pages and valid room slugs; `index.html` defaults and runtime metadata use the same home positioning;
- pathname normalization removes trailing slashes for metadata, valid room lookup, and booking navigation tone;
- location copy consistently uses **Sidemen, East Bali** in the audited page set, replacing the contradictory Stay hero label;
- landing, room, dining, amenities, and experiences copy was made more specific and less absolute;
- the unsupported named testimonial was replaced with a non-attributed invitation;
- experience actions now say they are enquiries and continue to `/booking`; no nonexistent experience-detail route was invented;
- route metadata updates the document title, description, Open Graph title/description/URL, and Twitter title/description after client navigation.

### Factual uncertainty requiring owner approval

The repository is the only available source for these facts; it does not independently prove them. The following remain suitable for publication only after owner verification:

- `https://wa.me/6281234567890`, `hello@sukhabali.com`, and `+62 812 3456 7890`. The sequential number is placeholder-looking. They were retained only because no verified replacement exists in the repository;
- “family-led” and the three-room collection;
- room prices, sizes, capacities, bed types, minimum-stay wording, and private outdoor-space claims;
- daily breakfast, pool, Wi-Fi, housekeeping, transfers, local rides, child/pet handling, selected-evening supper, and experience availability;
- claims about local sourcing, host arrangements, or service details that remain in the current content.

No legal, ownership, pricing-policy, or operational policy was inferred or added. A privacy notice remains an owner/legal decision if personal-data handling expands.

## Booking behavior

The booking page no longer simulates a successful submission. It validates the guest's name, contact text, required dates, real calendar dates, past dates, and date ordering. Valid input is encoded into the existing WhatsApp URL, and the site opens that external handoff while leaving the guest to send the message.

The UI explicitly says the site does not send or store the enquiry. **There is no booking backend, API request, reservation, availability lookup, delivery receipt, or response-time promise.** Confirmation of availability remains a host conversation after the guest sends the WhatsApp message.

## Accessibility and production-source changes

- `App.tsx` normalizes trailing-slash paths for route metadata and room lookup.
- The Not Found view now has a real `h1` and recovery-oriented metadata. This is a client-side not-found state; no HTTP 404 status is claimed.
- The mobile navigation has dialog semantics, `aria-expanded`/`aria-controls`, Escape close, focus containment, focus restoration, and body-scroll locking.
- Room image dialogs have dialog semantics, Escape close, contained focus on the close control, body-scroll locking, and focus restoration to the opening image control.
- Booking validation exposes field errors, moves focus to the invalid field, and provides an announced prepared-handoff state.
- Shared reveal, stagger, and parallax behavior now avoid nonessential movement when reduced motion is requested.
- The Vercel CSP now permits the exact Google Fonts origins already used by `index.html`: `https://fonts.googleapis.com` for styles and `https://fonts.gstatic.com` for fonts. Existing rewrites, cache headers, and other security directives were preserved.
- Static home metadata in `index.html` was aligned with the runtime home title and description.

## Verification evidence to date

### Baseline evidence

- A managed Chromium audit exercised `/`, `/stay`, all three room slugs, `/amenities`, `/dining`, `/experiences`, `/booking`, and an unknown route at 1440×900, 390×844, and 320×700 where applicable. No page errors or horizontal overflow were observed on the exercised pages. This audit also exposed the baseline booking simulation, missing lightbox Escape behavior, inert Privacy affordance, and inconsistent Not Found heading; those findings describe the pre-change tree.
- The orchestrator ran the baseline `npm run build` and `npm run lint` before the cleanup batch.

### Post-change evidence

- The main agent ran the final `npm run build`: `tsc -b && vite build` passed; Vite emitted the production bundle and assets successfully.
- The main agent ran the final `npm run lint`: `oxlint` completed with two existing-style warnings in `src/components/motion.tsx` and `src/components/Navbar.tsx`; no errors were reported.
- The main agent ran a real Chromium route smoke at 1440×900 across all canonical routes, all three room slugs, the unknown path, and trailing-slash variants. Every route rendered non-empty content with route-specific metadata and no page errors.
- The tester exercised booking empty, missing identity, missing dates, rejected equal dates, and a valid two-night enquiry. The valid path showed `WHATSAPP HANDOFF · NOT SENT YET`, no fabricated reference, and an encoded WhatsApp URL containing the entered details. The browser runtime's date-fill helper produced a malformed value for one equal-date case, so the exact equal-date message was not counted as observed.
- The tester exercised the mobile menu and Garden Suite lightbox in Chromium. Dialog semantics, focus entry/restoration, Escape close, body scroll locking, and focus containment passed. Overflow checks passed at 390×844 and 1440×900.
- Reduced-motion source branches are present. The available browser runtime did not apply the requested media emulation, so reduced-motion behavior remains source-verified but not runtime-verified.
- `vercel.json` parsed successfully. The CSP was tightened to remove unused `unsafe-eval`, arbitrary HTTPS images, and the unused Supabase connection allowance; the exact Google Fonts origins required by `index.html` remain allowed.
- `git diff --check` passed with only checkout line-ending warnings.

No deployment, Vercel preview, remote HTTP-header, or production-domain check was run. The current route set remains unchanged; no new page was created because the audit found no empty or duplicate route.

## Follow-up decisions and risks

1. **Business owner:** replace and verify the placeholder-looking WhatsApp number, phone, and email before publication. Approve or correct all room, price, capacity, amenity, meal, service, policy, and location claims.
2. **Deployment owner:** verify a Vercel preview for direct deep links, Google Fonts/CSP, security/cache headers, and not-found HTTP behavior. A client Not Found page is not evidence of an HTTP 404 response.
3. **SEO owner:** decide whether client-injected metadata is sufficient. Canonical URLs, an approved social image, sitemap, structured data, and static/prerendered deep-link metadata were not added because the production domain and content policy are unverified.
4. **Privacy owner:** decide whether a real privacy destination/policy is required before introducing a backend or additional personal-data handling. The prepared WhatsApp URL contains guest-entered data and should be treated as sensitive.
5. **Release status:** implementation and local verification pass, but publication is conditional on owner verification of the operational contact and business facts. No commit, push, or deployment was performed during this audit.
