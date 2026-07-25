Change Log
==========

OPEN — start here next session
------------------------------
Carried over from 2026-07-25. Tick these off and delete them from this section.

1. [ ] **Delete the Cloudflare Pages project and DNS zone.** `resume-8h2` under
       Workers & Pages, then the `iamgeorge.nl` zone itself. Nothing routes to
       either — they were kept as the rollback for the DNS move. Safe to remove
       from 2026-07-27 onward (48h after the cutover). Disconnect its GitHub
       integration first so a stray push cannot resurrect a deployment.
2. [ ] **Stop tracking `build/` in git.** `git rm -r --cached build` plus a
       `.gitignore` line. It was only kept because Cloudflare Pages deployed
       this repo and might have served the committed output; Pages is now out
       of the serving path, so the risk is gone. Vercel builds from source
       (`buildCommand: vite build`). Removes a lot of minified diff noise.
3. [ ] **Tighten DMARC from monitor to enforcing.** The record was added on
       2026-07-25 as `_dmarc TXT "v=DMARC1; p=none; rua=mailto:hi@iamgeorge.nl;
       fo=1"` — monitor only, it changes nothing on its own. Aggregate reports
       now arrive at hi@ as daily XML. After a few weeks, if they show SPF and
       DKIM consistently passing AND aligned, move `p=none` -> `p=quarantine`,
       then later -> `p=reject`. Do not skip straight to reject: DKIM only
       started publishing on 2026-07-25 and has no track record yet.
4. [ ] **Decide the fate of the palette picker** on /balancetheory. It is
       currently live and public on desktop. Keep, or remove the three blocks
       banded `PALETTE PICKER — START/END` in the CSS, markup and script.

Verified working, no action needed:
- Email round-trip through `hi@iamgeorge.nl` tested in both directions after
  the nameserver move — send and receive both confirmed by George on
  2026-07-25. The DNS migration did not disturb mail.
- Mail authentication is complete as of 2026-07-25: SPF (`~all`), DKIM
  (`default._domainkey`, 408 chars) and DMARC (`p=none`) all publish and were
  each confirmed through Cloudflare, Google and Quad9 resolvers plus both
  Vercel nameservers. Before this session only SPF existed.

2026-07-25
----------
Summary
Moved DNS off Cloudflare to Vercel (Cloudflare now removed entirely), moved the resume subdomains from Cloudflare Pages to Vercel, restyled /balancetheory to a pink palette with a live palette picker, added a site-wide favicon, and replaced the Coming Soon wave emoji with an animated avatar.

Details

Hosting / DNS — Cloudflare fully decommissioned
- `resume.iamgeorge.nl` and `cv.iamgeorge.nl` were served by a Cloudflare Pages project (`resume-8h2`) fed from this repo's GitHub main. Both are now Vercel domains on the `iamgeorge` project; their DNS records became `CNAME -> cname.vercel-dns.com`, DNS-only (Vercel cannot issue SSL through Cloudflare's proxy — an orange cloud leaves the subdomain in a cert error).
- Nameservers moved from Cloudflare (`nash`/`raegan.ns.cloudflare.com`) to Vercel (`ns1`/`ns2.vercel-dns.com`) at Namecheap. The whole zone was staged at Vercel and verified record-by-record BEFORE the switch, so both providers answered identically and propagation was invisible. Namecheap took ~1h to push the delegation to the `.nl` registry; the Namecheap UI showed it saved long before the registry did.
- Records now served by Vercel: apex (automatic, no explicit A record), `www`/`resume`/`cv` CNAMEs, 2x MX to privateemail.com (priority 10), SPF, google-site-verification.
- NEW: DKIM (`default._domainkey`) is published for the first time. It existed at Namecheap but had never been put in DNS, so outgoing mail was unsigned. Note: records added to a Vercel zone before delegation do not serve — DKIM returned NXDOMAIN until the nameservers actually switched, then appeared immediately.
- Cloudflare Email Routing is DISABLED and must stay that way. Its settings page lists five records as "Missing", which is the correct healthy state — clicking "Add missing records" would repoint MX at Cloudflare and break mail.

Regression fixed: resume subdomain served the wrong page
- GitHub main still had the pre-rewrite App that rendered the resume at every path, so Cloudflare Pages kept serving the resume on `resume.iamgeorge.nl`. Pushing the Coming Soon routing rewrite made `/` render Home on every host, taking the resume offline for ~10 minutes.
- Fixed in `src/App.tsx`: both hosts serve the same bundle, so the root route now picks from `window.location.hostname` — `resume.` / `cv.` render the resume, everything else renders Home. `/resume` still works on every host.

/balancetheory
- Renamed `ბალანსის ზედაპირი` -> `ბალანსის თეორია` (title + SVG aria-label). The footer link stays `პეზეშკიანის ბალანსის მოდელი` — that is the name of Peseschkian's model, not the page.
- Palette refactor: every colour now lives in ONE `:root` block. Previously it was split across CSS variables, `rgba()` tints with literal channel values, and hardcoded hex inside the SVG, which made recolouring a three-place change. The SVG now inherits via CSS rules (`#axes`, `#labels`, `#hatch line`, `#rhombus`, `.dot.vis`/`.dot.hit`) and tints use `rgba(var(--accent-rgb), a)`.
- Colour went amber -> purple -> green -> pink (`--accent: #dc3887`). Neutrals are hue-rotated to match the accent rather than left warm, so the greys belong to the same family.
- Palette picker (desktop only, collapsed by default, opened by a corner toggle): three sliders for accent hue, accent lightness and contrast, driving the `:root` properties live. Contrast 0 gives pure #000/#fff with no tint; higher values lift the black, drop the white and tint both. Hatch opacity is now derived from accent lightness (0.30 dark -> 0.15 bright) so the crosshatch cannot vanish behind a dark accent, which is what happened with the purple.
- Axis pen weights thinned: desktop 6.5 -> 4.8, mobile 10 -> 7.4 (the ~1.54 ratio between them is what keeps the strokes looking equally heavy on both).

Site-wide favicon
- `public/favicon.ico` + `favicon-32/180/512.png`, generated from `design/source/favicon-pink-512.png` with nearest-neighbour so the pixel art stays crisp. Linked with absolute paths from both `index.html` and `public/balancetheory/index.html`, so subdirectories resolve correctly. Replaces an inline SVG octopus emoji.

Coming Soon avatar
- The `👋` emoji in `src/pages/Home.tsx` is now a 56px pixel-art avatar that swaps to a waving frame on hover, with a lift + slight scale on a springy easing. Both frames are stacked and cross-faded rather than swapping `src`, so the hover frame is decoded up front instead of flashing blank on first hover. Negative block margins keep the 56px art from stretching the 1.7 line box. `:active` covers touch; `prefers-reduced-motion` drops the bounce but keeps the swap.

Other
- `design/source/` holds the original artwork with a README covering how each shipped asset is regenerated. Not served — Vite only copies `public/`.
- Namecheap/DKIM notes live in `../NC/NC.md`, deliberately OUTSIDE this repo: it is public on GitHub.

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
