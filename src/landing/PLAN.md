# ePawati (Samavet) — Animated SaaS Landing Page

A full landing page for ePawati, the fun, paperless donation-collection portal for trusts, temples and Ganapati mandals — built with the motion design you asked for: GSAP mouse parallax, a cursor-reactive SVG, and interactive feature cards.

## Look and feel

- Palette: terracotta `#a84d29` (primary/accent), deep forest green `#23472b` (secondary/depth), off-white background. Dark mode uses the same family: deep green-black background, warmer terracotta and a soft cream foreground.
- Typography: a confident display face for headings paired with a clean, highly readable body face — festive but institution-grade, not generic SaaS blue.
- Rounded-but-restrained corners, soft warm shadows, subtle paper-grain texture on the off-white surface to nod to "paperless receipts done beautifully".

## Page sections

1. **Hero** — headline, subline, two CTAs (Get started / See the portal), and a layered artwork behind the copy that reacts to the mouse.
2. **Trust bar** — short line of proof points (mandals served, receipts issued, settlement speed).
3. **Feature grid** — interactive cards for: instant digital receipts, UPI/online collection, donor records, volunteer roles and access control, live dashboards, exports for audits.
4. **Portal showcase** — a browser-framed mock of the ePawati dashboard with tabbed views (Collections, Donors, Reports) that swap with a soft animated transition.
5. **How it works** — three steps: set up your mandal, share your collection link, track everything live.
6. **Why ePawati** — paperless vs. paper comparison, framed as a simple two-column contrast.
7. **FAQ** — accordion covering fees, settlement, receipts, data ownership.
8. **Final CTA + footer** — sign-up prompt, contact, links.

## Motion design

- **GSAP mouse parallax (hero):** hero layers — background glow, ornamental shapes, receipt/coin cards, headline — move at different depths following the pointer, eased with `gsap.quickTo` so it feels weighted rather than twitchy. Falls back to a static composition on touch devices.
- **Cursor-reactive SVG:** a hand-drawn diya/kalash-style SVG motif in the hero whose paths and highlights respond to pointer distance — stroke draw-on when it enters view, petals/rays that lean toward the cursor, and a soft glow that tracks it.
- **Interactive feature cards:** per-card 3D tilt toward the cursor, a spotlight gradient that follows the pointer inside the card, an icon micro-animation on hover, and a border that lights up in terracotta. Cards stagger in on scroll.
- **Scroll motion:** section reveals, a pinned/scrubbed transition on the portal showcase, and animated number counters in the trust bar — all via GSAP ScrollTrigger.
- **Accessibility:** every effect is disabled under `prefers-reduced-motion`, and pointer effects are skipped on touch input.

## Technical notes

- Add `gsap` as a dependency; use `@gsap/react`'s `useGSAP` for React 19-safe setup/cleanup.
- All animation code is client-only (guarded in `useGSAP`/effects) so SSR renders the static page fine; no hydration mismatch.
- Design tokens (terracotta, forest, off-white, dark variants) go into `src/styles.css` as oklch values under `:root`/`.dark` and are registered in `@theme inline` — no hardcoded color classes in components.
- Dark mode toggle in the header, persisted to localStorage, read after hydration.
- Landing page replaces the placeholder at `src/routes/index.tsx`; each section is its own component under `src/components/landing/`, with reusable `useMouseParallax` and `useTilt` hooks.
- Hero artwork and portal mock visuals generated as assets; SEO head() on the index route with ePawati-specific title, description, og/twitter tags.

No backend is needed for this — it's a marketing page. CTAs can point to your existing portal URL (tell me the link and I'll wire it in).
