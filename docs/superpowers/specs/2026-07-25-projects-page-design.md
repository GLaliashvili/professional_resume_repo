# Projects page — design

Date: 2026-07-25
Status: approved by George, ready to implement

## Purpose

`iamgeorge.nl/projects` — a grid of project cards, so the Coming Soon page has
somewhere better to point than the professional resume. Built now with dummy
content; George populates it with real projects afterwards.

## Decisions settled before building

Three questions were open in CHANGELOG item #4. Answers:

1. **Where does a card click land?** Straight at the thing itself. No per-project
   pages hosted here. `/balancetheory` is an internal link, simpsonify and Stack
   Browser are external links. This is the whole reason the build stays small.
2. **Visual idiom?** The same dark, quiet Coming Soon look — not the balancetheory
   doodle aesthetic. The visitor arrives from Coming Soon and it is obviously the
   same site.
3. **Card image?** A real 16:9 image file per project under `public/projects/`.
   Placeholders ship first at the true display size; George swaps the files.

Still open, deliberately deferred until George populates the page: whether Stack
Browser (a company he co-founded, not a side project) sits in the same grid as
the personal projects or is presented differently.

## Files

| File | Change |
| --- | --- |
| `src/data/projects.ts` | New. The entire content list as one exported array. |
| `src/pages/Projects.tsx` | New. Reads the array, renders the grid. |
| `src/index.css` | New `.projects-*` block. |
| `src/App.tsx` | Add `<Route path="/projects" element={<Projects />} />`. |

Content lives in `projects.ts` so that populating the page later means editing a
plain array — never JSX. Each entry:

```ts
{ slug: string; name: string; description: string; image: string;
  href: string; external: boolean }
```

`external: true` renders `target="_blank" rel="noopener noreferrer"`; internal
links (e.g. `/balancetheory`) render as a plain same-tab anchor, because that
path is a static file served outside the SPA router and must not go through
react-router.

### Why a stylesheet and not inline styles

`Home.tsx` is styled entirely inline, which is why it has no media queries and no
hover states. This page needs both hover gating and responsive columns, so its
styles go in `src/index.css` under `.projects-*` classes. Same visual language,
different mechanism. Do not "fix" Home to match — its inline styling is load-bearing
for the badge's `min()`/`calc()` scaling.

### App.tsx caution

The `resume.`/`cv.` hostname check that picks the root route must be left exactly
as it is. Breaking it takes `resume.iamgeorge.nl` offline; that has happened once.

## Layout

Centered column, `max-width: 1100px`, `#222` background, `#e9e9e9` text, the same
system font stack as Home. Accent is `#f8766d` — the coral already used for the
resume link on Home.

Header: a back-to-home link in the accent, an `h1` ("Projects"), one line of intro.

Grid: `repeat(auto-fill, minmax(240px, 1fr))`, 24px gap. That yields 4 across on a
wide screen, 3 on a laptop, 2 on tablet and 1 on a phone with no media queries to
maintain.

## Cards

`#2b2b2b` surface, 1px `#333` border, 10px radius, `overflow: hidden`. The 16:9
image sits flush at the top; below it the project name in white and the description
in muted grey at ~15px. Each card is a single `<a>` wrapping all of it, so keyboard
focus, middle-click and "open in new tab" work without extra code.

### Hover and press

Per George's stated convention, touch and mouse must feel the same.

- Desktop, gated behind `@media (hover: hover) and (pointer: fine)`: `translateY(-6px)`
  and the shadow grows from `0 2px 8px rgba(0,0,0,.4)` at rest to
  `0 14px 28px rgba(0,0,0,.55)`, 180ms ease-out. Border brightens slightly.
- Touch: the same lift on `:active`, so a press looks like the hover does. Nothing
  latches, so iOS's sticky `:hover` cannot strand a card in the raised state.
- `prefers-reduced-motion: reduce` drops the transform and keeps the shadow change.

### Placeholder cards

Two, last in the grid, same footprint so rows stay even. No image — a dashed
`#3a3a3a` border on a transparent background with "more coming soon" centered in
muted grey. Rendered as a `<div>`, not a link: no hover, no click, not focusable.

## Dummy content

Six invented projects plus the two placeholders — enough to fill a 4-wide row and
demonstrate the wrap. Eight 16:9 placeholder PNGs generated into `public/projects/`
at the real display size so the proportions are honest.

## Out of scope

Pointing the Coming Soon page at `/projects` instead of the resume (CHANGELOG #5).
That is a separate step, done only once George has seen this page and approved it,
so the link never lands on something still being decided.
