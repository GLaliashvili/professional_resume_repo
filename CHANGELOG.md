Change Log
==========

OPEN — start here next session
------------------------------
Carried over from 2026-07-25. Tick these off and delete them from this section.
Four items closed on 2026-07-25 (palette picker everywhere + outside-tap
dismiss, badge scaling, ninja press-and-hold, ninja frames/baseline/greeting);
they are gone from this list and written up in the dated entries below.

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

Backlog — features, not cleanup
-------------------------------

4. [x] **DONE 2026-07-25 — the projects page exists at `/projects`.** Built with
       dummy content; George populates `src/data/projects.ts` with the real
       entries. The three questions below were settled first: cards link
       STRAIGHT AT the thing itself (no per-project pages hosted here), the page
       wears the Coming Soon look rather than the balancetheory doodle, and each
       card carries a real 16:9 image from `public/projects/`. Design is written
       up in `docs/superpowers/specs/2026-07-25-projects-page-design.md`.
       Still undecided, on purpose: whether Stack Browser belongs in the same
       grid as the personal projects or is presented differently. Original note
       kept below for that reason.
4b. [x] **DONE 2026-07-25 — the real three are in.** Stack, Simpsonify and
       Balance Chart, in that order, in `src/data/projects.ts`. George settled
       the open question by putting Stack FIRST in the same grid as the other
       two, so it is not presented differently. Descriptions were written from
       each site's own copy. Grid is capped at THREE columns — that cap is the
       1080px `max-width` on `.projects-shell` against the 300px track minimum,
       so widening the shell silently makes it 4-up.
4c. [ ] **Swap in George's real card images.** `public/projects/{stack,
       simpsonify,balance-chart}.png` are generated stand-ins. Drop real 16:9
       images over the same filenames; nothing else needs touching.
5. [ ] **Point Coming Soon at the projects page instead of the resume.**
       `src/pages/Home.tsx` ends with "feel free to visit my [professional
       resume]" linking to `https://resume.iamgeorge.nl/`. That link becomes
       the projects page once #4 exists. Depends on #4 — do not do this one
       first or the link goes nowhere.
6. [ ] **Optional, offered but never asked for:** alternate the ninja's two
       frames on a ~400ms loop while held, so it reads as a repeating wave
       rather than a single pose change. Everything needed is in place — both
       frames are preloaded and registered, and the swap is already a pure
       opacity crossfade with no transform to fight.

Verified working, no action needed:
- Email round-trip through `hi@iamgeorge.nl` tested in both directions after
  the nameserver move — send and receive both confirmed by George on
  2026-07-25. The DNS migration did not disturb mail.
- Mail authentication is complete as of 2026-07-25: SPF (`~all`), DKIM
  (`default._domainkey`, 408 chars) and DMARC (`p=none`) all publish and were
  each confirmed through Cloudflare, Google and Quad9 resolvers plus both
  Vercel nameservers. Before this session only SPF existed.

2026-07-25 (session summary — Coming Soon polish)
--------------------------------------------------
Five commits, all deployed and verified live. Everything in this session was
front-end polish on `/` and `/balancetheory`; no DNS, hosting or mail changes.

  2300f87  palette picker on every device + outside-tap dismiss
  27f2740  COMING SOON badge scales like an image; ninja press-and-hold
  0dfb3dd  matching ninja frames, baseline position, one-shot greeting wave
  8719fbf  cleared closed items out of this open-tasks list
  c7d7a05  lowered the ninja so his feet cross the baseline

Four things this session established that are easy to break later, all
documented in the entries below and worth reading before touching this page:
- The badge's `16.9` divisor is a MEASURED width in em. Change the wording,
  weight, tracking or padding and it must be re-measured.
- The ninja's two frames must share one unchanging box: no transform, ever.
  George rejected the lift/scale explicitly.
- The ninja's `-13px` offset assumes the 56px size and the artwork's ten
  transparent rows under the feet. Whole numbers only, or the pixel art softens.
- The frames must stay registered and share a skin tone. One frame was replaced
  this session for exactly that.

Verification approach worth reusing: headless Chrome clamps its own window to
~500px, so narrow layouts were measured inside same-origin iframes; behaviour
was asserted with PointerEvent probes against the BUILT page rather than by
reading the CSS. Three traps cost time and are written up below — CSS
transitions do not advance predictably under --virtual-time-budget, React's
state flush is not synchronous with dispatchEvent, and React derives
onPointerLeave from pointerout + relatedTarget.

2026-07-25 (ninja frames)
-------------------------
Summary
Replaced the waving frame with art whose skin matches the idle frame, removed
the lift/scale so the two frames never move or resize, stood the ninja on the
text baseline, and added a one-shot greeting wave 1s after load.

Details
- Vertical position: the avatar used to hang ~20px below the line it sits on.
  `.avatar-wave` now takes `position: relative; top: -13px`, which puts the feet
  7.37px below the text baseline — crossing it slightly, per the marked-up
  reference George supplied. It first went to -20px (feet exactly ON the
  baseline), which read as too high; -13px was the follow-up.
  The value is MEASURED, not derived — a zero-height inline-block probe gives
  the true text baseline, and the feet are at 158/168 of the box because the art
  carries ten transparent rows beneath them. Identical at 390px and 1280px.
  READING THAT REFERENCE IMAGE: its two guide lines are the text's LINE BOX, not
  the baseline — anchoring on them would have placed the ninja ~3px too low. The
  baseline is the glyph bottom of "Hi". Scale was confirmed two independent ways
  (cap height, and the avatar's own art height), agreeing at 9.86x vs 9.89x,
  which is what makes ~7px trustworthy rather than a guess.
  Keep the offset a WHOLE number: a half-pixel shift softens the pixel art.
  `position: relative` is deliberate — it shifts the art without touching
  layout, so the line box stays 28px and no text moves. Re-measure if the 56px
  size or the artwork's padding changes.
- Greeting wave: 1s after load the hand goes up for 750ms, once, then down. It
  is a separate `autoWave` state OR-ed with the press state, not a fake press.
  A press cancels it outright, clearing both pending timers — otherwise the
  1750ms timer would drop the hand in the middle of a real press, or leave it
  up after the user released. Verified in both collision directions: pressing
  during the greeting (up at 1100/1300, down from 1500 on) and pressing before
  it (the greeting never fires at all). Timing measured with a MutationObserver
  on the class: up at 1004ms, down at 1754ms, exactly one raise in six seconds.
  The effect cleanup also clears the timers so they cannot fire into an
  unmounted component.
- Skin mismatch, confirmed by sampling the face region: the old waving frame's
  dominant skin was rgb(252,190,125) against the idle frame's rgb(253,198,138),
  so the face shifted tone mid-crossfade. George supplied replacement art whose
  dominant skin samples at rgb(253,198,138) — an exact match. `design/source/
  avatar-hi-tb-1172.png` replaced, `public/avatar-hi-tb.png` regenerated with
  the documented LANCZOS 1172->168 recipe. The Desktop original is untouched.
- The apparent "second frame moves up / gets bigger" was
  `transform: translateY(-5px) scale(1.07)`, applied on raise. It was on `img`,
  so it moved BOTH frames equally — but since it fired exactly when the frames
  swapped, it read as the waving frame jumping. Removed from both the hover and
  the .is-raised rules, and the transform half of the transition with it. The
  swap is now a pure 140ms opacity crossfade. The reduced-motion block shrinks
  to just the faster fade, since there is no longer any motion to suppress.
  DO NOT reintroduce a lift here — it is the thing that was wrong.
- Registration checked directly on the shipped 168px pair rather than trusting
  the artwork: identical canvas size, feet baseline within 1px, hood top within
  2px, legs within 2px — all under 0.7px at the 56px render size. A 50/50 blend
  of the two frames shows hood, body, belt and legs landing on the same pixels,
  with ghosting only where the pose and the eye expression genuinely differ.
- Probe on the built page asserts what the requirement actually says: both
  frames share one bounding box at rest, neither box changes when raised, the
  two boxes stay identical while raised, and computed transform is `none`
  throughout. Plus the press/release cycle still works and the wave frame
  resolves to the new asset. All 12 assertions pass.

2026-07-25 (Coming Soon mobile)
-------------------------------
Summary
Made the COMING SOON badge scale like an image on narrow screens, and made the
ninja press-and-hold on touch instead of latching on the first tap.

Details

The badge (src/pages/Home.tsx)
- Symptom: below ~414px the pill lost width, gained height and broke COMING /
  SOON onto two lines. Measured before the fix: 320px viewport -> 272x111,
  aspect 2.45, two lines. It was a fixed-size element in a flex column, so the
  only thing that could give was the text.
- Fix: every dimension of the badge — both paddings, the border radius, all
  seven shadow offsets/blurs/spreads, the engraved text shadow and the 96px gap
  beneath it — is now expressed in `em` off a single font-size on the outer
  div, and the span no longer sets its own font-size. Scaling that one value
  therefore scales the entire badge uniformly, which is what fixes the aspect
  ratio by construction rather than by declaring one.
- The font-size is `min(21px, calc((100vw - 48px) / 16.9))`. 16.9 is the
  badge's measured full width in em; 48px is the page's 24px horizontal padding
  doubled. So it renders at the approved 21px whenever there is room and
  otherwise at exactly the size that fits. `white-space: nowrap` guarantees one
  line. RE-MEASURE 16.9 if the wording, weight, tracking or padding changes.
- No media query and no matchMedia hook: `min()`/`calc()` work in inline styles,
  which is what made this fixable without moving the badge into index.css.
- Verified by measuring the rendered page at 320/360/375/390/414/500/768/1280
  (in same-origin iframes — headless Chrome clamps its own window to ~500px, so
  window-size cannot test narrow layouts). Aspect ratio holds at 4.452-4.456
  across every width, one line everywhere, never overflows, and >=24px of side
  margin. Desktop is untouched: 354x79.5 at both 414 and 1280, identical to the
  pre-change build measured by stashing the diff.

The ninja (src/index.css, src/pages/Home.tsx)
- Symptom George reported: on mobile the first tap raised the hand and it
  stayed raised — later taps did nothing, so touch did not match desktop hover.
- Root cause: `.avatar-wave:hover` was not gated by `(hover: hover)`. iOS grants
  a tapped element a STICKY :hover that survives the release and persists until
  something else is tapped, so the first tap latched the wave frame on and every
  later tap was a no-op. The `:active` rule that was supposed to cover touch
  never fired — Safari only applies :active to elements it considers clickable,
  and this is a plain span.
- Fix: hover rules moved inside `@media (hover: hover) and (pointer: fine)` so
  they only apply to real pointers, and touch is driven by an `.is-raised`
  class from React state — set on pointerDown, cleared on pointerUp,
  pointerCancel and pointerLeave. Hold raises, release lowers, repeatably.
  pointerCancel matters: the browser steals the gesture when a scroll starts,
  and without it the hand would stay up for good.
- Also added on `.avatar-wave`: `-webkit-touch-callout: none` (a long press on
  an <img> otherwise opens iOS's Save Image sheet — likely on a hold gesture),
  `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation` (no
  300ms double-tap-zoom wait), and `pointer-events: none` on the two frames so
  the span owns the gesture and swapping frames mid-press cannot retarget it.
- Verified with a 24-assertion probe firing real PointerEvents at the built
  page: press raises and lifts, release lowers, the second/third/fourth press
  all raise again (the reported bug), pointerCancel and pointerLeave both
  lower, duplicate down/up events are idempotent, and six further press/release
  cycles all behave. Note for anyone re-running it: CSS transitions do not
  advance predictably under --virtual-time-budget and React's state flush is
  not synchronous with dispatchEvent, so the probe disables transitions and
  yields a tick before asserting. Both were mistaken for real failures first.
  React derives onPointerLeave from `pointerout` + relatedTarget, so a directly
  dispatched `pointerleave` never reaches the handler — test with pointerout.

2026-07-25 (later)
------------------
Summary
Opened the /balancetheory palette picker to every device — it was desktop-only.

Details
- Deleted the `@media (max-width: 720px) { #picker, #picker-toggle { display: none } }`
  rule. Nothing else gated the picker: the script never checked the viewport, so
  removing the hide was all that "enable it for everyone" required.
- Mobile sizing added in its place, inside the same PALETTE PICKER band:
  card width `min(268px, calc(100vw - 24px))` so it cannot overflow a 320px
  phone, 12px type, 11px field spacing, and a 30px-tall range strip (desktop is
  18px) so the native thumb is grabbable with a thumb. The sliders stay native
  and take their colour from `accent-color`; the heavy custom thumb styling
  under `.panel .range` is deliberately NOT reused — that is the axis panel's
  look, and copying it would make the picker compete with the four axis sliders.
- The card overlays the diagram's top axis while open. That is intentional: it
  is closed by default and the toggle dismisses it, so it costs no permanent
  vertical room — which matters because the mobile layout is tuned to fit on
  one screen without scrolling.
- The toggle already mirrored `#reset` in the opposite corner at the same 38px
  size, so the mobile top row reads as a matched pair: palette left, reset right.
- Verified with headless Chrome at 500x860 (the practical mobile width — Chrome
  clamps below ~500px) with the picker forced open, and against a closed
  baseline: the diagram geometry is byte-for-byte the same layout, so nothing
  regressed for people who never open it.
- Click/tap outside now dismisses the picker, on both desktop and mobile. One
  `document` listener on `pointerdown` — not `click` — so it closes on the same
  gesture that starts a drag on the diagram underneath, and so mouse, touch and
  pen are all covered by a single path. Open/close moved into a `setOpen()`
  helper so `aria-expanded` cannot drift out of step with the `hidden` attribute.
  THE TRAP: the toggle must be excluded from the outside check. Without it the
  toggle's own pointerdown closes the panel and its click immediately reopens
  it, so tapping the icon to close looks like nothing happened. `#picker` is
  excluded too, which also covers dragging a picker slider past the card edge —
  the gesture began inside, and only pointerdown closes, never pointerup.
  Verified headlessly with a 10-case probe (synthetic PointerEvents against the
  real page): opens, stays open on pointerdown inside the card and on its own
  sliders, closes on the diagram / an axis slider / the reset icon, reopens
  after an outside close, closes from its own toggle with no bounce, and is a
  no-op when already closed. All pass.

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
