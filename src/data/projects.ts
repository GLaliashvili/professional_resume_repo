/**
 * The projects page content. This is the only file to edit when adding, removing
 * or reordering a project — Projects.tsx reads it and needs no changes.
 *
 * Everything here is placeholder content for now. Real entries to come:
 *   balance theory -> "/balancetheory", external: false (static file, not a
 *                     react-router route, so it must be a plain anchor)
 *   simpsonify     -> "https://simpsonify.us", external: true
 *   Stack Browser  -> "https://stackbrowser.com/", external: true
 *
 * Images live in public/projects/<slug>.png and are shown at 16:9. The files
 * currently there are generated stand-ins; drop real screenshots over them at
 * the same names and nothing else needs touching.
 */
export type Project = {
  slug: string;
  name: string;
  description: string;
  image: string;
  href: string;
  /** true opens in a new tab; false is a same-tab navigation on this domain */
  external: boolean;
};

export const projects: Project[] = [
  {
    slug: "field-notes",
    name: "Field Notes",
    description:
      "A quiet place to write down what happened today, before the day rewrites it.",
    image: "/projects/field-notes.png",
    href: "https://example.com",
    external: true,
  },
  {
    slug: "tempo",
    name: "Tempo",
    description:
      "Tracks how long things actually take, so the next estimate is less of a guess.",
    image: "/projects/tempo.png",
    href: "https://example.com",
    external: true,
  },
  {
    slug: "north",
    name: "North",
    description:
      "One goal on screen at a time. Everything else waits its turn.",
    image: "/projects/north.png",
    href: "https://example.com",
    external: true,
  },
  {
    slug: "paper-trail",
    name: "Paper Trail",
    description:
      "Keeps every decision next to the reason it was made, for the version of you who forgets.",
    image: "/projects/paper-trail.png",
    href: "https://example.com",
    external: true,
  },
  {
    slug: "signal",
    name: "Signal",
    description:
      "Reading, watching and listening, filtered down to the handful worth the time.",
    image: "/projects/signal.png",
    href: "https://example.com",
    external: true,
  },
  {
    slug: "small-hours",
    name: "Small Hours",
    description:
      "Half-built ideas that only make sense after midnight, kept somewhere they can grow.",
    image: "/projects/small-hours.png",
    href: "https://example.com",
    external: true,
  },
];

/** How many "more coming soon" cards trail the real ones. */
export const placeholderCount = 2;
