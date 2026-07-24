Change Log
==========

2026-07-24
----------
Summary
Made /balancetheory usable on mobile: viewport/charset metas, near-edge axes, sliders instead of number entry, forgiving drag targets, a corner refresh icon, and whole-number read-outs. Desktop layout deliberately unchanged.

Details
- Missing metas (root cause of "everything is tiny"): added `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` — without it iOS laid the page out at a 980px viewport and scaled it down. Also added `<meta charset="utf-8">`; the Georgian text renders as mojibake on any server that does not declare the charset.
- Responsive geometry: the script now holds two geometries (DESKTOP 1300x1120 / MOBILE 1000x1130) and swaps viewBox, stage aspect-ratio, pen weights, dot radius, label size and grab radius on the `(max-width: 720px)` media query. Mobile half-axis is 480 of a 1000-wide viewBox, so the axes end ~14px from the screen edge. Every drawn weight is ~1.5x the desktop value because mobile packs fewer screen pixels per viewBox unit.
- Side labels: on mobile `საზრისი`/`საქმე` sit ABOVE the horizontal axis at its tips instead of beside it — that is what freed the horizontal room for full-width axes.
- Controls: number inputs are hidden on mobile and replaced by range sliders (7px track, 26px thumb, 38px touch strip). Rows are one line per axis — label | slider | read-out — via a single 3-column grid on `.panel` with `.panel .row { display: contents }`, so all sliders align to the widest label automatically. This one-line form was needed to fit all four sliders plus the footer on screen without scrolling (it cut the non-diagram vertical space from 393px to 274px).
- Handle grabbing: `pointerdown` anywhere on the SVG now picks the NEAREST handle within a radius (`pickDot`), with a mild preference for the handle on the axis the finger points down, instead of requiring a direct hit on a small circle.
- Reset: the `თავიდან` button became a 38px refresh icon fixed in the top-right corner on mobile (label kept as visually-hidden text + aria-label). Colours reversed on desktop too so that yellow consistently means interactive: bright yellow at rest, muted on hover.
- Footer: font up to 15px, `min-height: 100svh` on body. NOTE: `padding-bottom` must NOT add `env(safe-area-inset-bottom)` on top of svh sizing — svh already excludes the browser's bottom bar, so the inset double-counted and floated the line ~60px too high. It is a flat 16px.
- Whole-number read-outs: slider `step` is 1, and `displayValues()` uses largest-remainder rounding so all four displayed figures are integers that still total exactly 100. Values stay fractional internally so the rhombus moves smoothly. Previously the proportional compensation produced values like 33.3, which made the boxes flicker between 2 and 4 characters. Verified across all 4 sliders x 101 positions: no fractional read-out, every state sums to 100.
- Safety net: `.stage { max-height: calc(100svh - 320px) }` shrinks the diagram on unusually short screens rather than pushing sliders below the fold.

2026-07-24
----------
Summary
Rebuilt iamgeorge.nl as a "Coming Soon" landing page on Vercel (replacing the old Craft.do page), added a /balancetheory static tool, and cut the domain over from Craft to Vercel with a www→apex redirect.

Details
- Home page: rebuilt `src/pages/Home.tsx` as the Coming Soon page — dark (#222) background, metallic "COMING SOON" pill (raised chrome bezel + engraved inner panel, Montserrat via Google Fonts added in `index.html`), and intro copy. Links: Stack Browser → https://stackbrowser.com/, professional resume → https://resume.iamgeorge.nl/. Interests line reads "entrepreneurship, product management, AI, productivity" (added AI).
- New subdirectory: added `public/balancetheory/index.html` (self-contained "ბალანსის ზედაპირი" balance-surface tool), served at iamgeorge.nl/balancetheory.
- Deploy config: added `vercel.json` — outputDirectory `build`, SPA catch-all rewrite to /index.html, and host-based redirects for www→apex (needs BOTH a `/` rule and a `/:path*` rule; `/:path*` alone does not match bare root).
- Vercel: created/linked project `iamgeorge` (team giorgis-projects-f722e37b); deployed to production.
- DNS cutover (Cloudflare): repointed apex `iamgeorge.nl` to `A 76.76.21.21` (DNS-only), added `www` CNAME → cname.vercel-dns.com (DNS-only). Left `resume`/`cv` (Cloudflare Pages → resume-8h2.pages.dev), MX (privateemail.com), and TXT records untouched. SSL issued; www permanently redirects to the bare domain.

2026-01-30
----------
Summary
Fixed resume content dates and typos, updated the footer year and one-pager PDF, and corrected bullet list wrapping so multi-line bullets align with the text instead of the bullet.

Details
- Content: updated Buynomics start date (Oct 2023), Stack Browser CEO end date (Oct 2023), and footer year (2026) in `src/components/Resume.tsx`.
- Copy edits: fixed typos in the Georgia's Innovation & Technology Agency section ("Built" and removed stray punctuation).
- Document: replaced the downloadable one-pager PDF in `public/CV-one-pager.pdf` (and regenerated build output).
- Styling: introduced a custom `.resume-list` utility in `src/index.css` to restore list markers (Tailwind base resets list styles) and ensure wrapped bullet lines align under the text, not the bullet.
- Hygiene: added `.DS_Store` to `.gitignore` to avoid committing macOS metadata.

2026-01-30
----------
Summary
Expanded the Tools & Technical Proficiency skill badges with AI tooling and workflow platforms.

Details
- Content: added LLMs, n8n, Claude Code, and AI Agentic Workflows badges in the Tools & Technical Proficiency section of `src/components/Resume.tsx`.
