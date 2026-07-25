/**
 * The projects page content. This is the only file to edit when adding, removing
 * or reordering a project — Projects.tsx reads it and needs no changes.
 *
 * Images live in public/projects/ and are shown at 16:9, centre-cropped by
 * object-fit: cover. They are 1280x720 — 2x the ~640px a card ever shows, so
 * they stay crisp on retina. Photographic ones are JPEG (a quarter the size at
 * this quality); Balance Chart stays PNG because JPEG smears its thin white
 * axis lines on black.
 *
 * external: false means a same-tab plain anchor. Balance Chart NEEDS that —
 * /balancetheory is a static file under public/, served outside the router, so
 * a react-router <Link> would fail to reach it.
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
    slug: "stack",
    name: "Stack",
    description:
      "The spatial browser I co-founded. Cards side by side instead of a row of tabs, for a calmer way of being online.",
    image: "/projects/stack.jpg",
    href: "https://stackbrowser.com/",
    external: true,
  },
  {
    slug: "simpsonify",
    name: "Simpsonify",
    description:
      "Upload a portrait, get yourself back as a Simpsons character. One photo, $1.99, delivered to your inbox.",
    image: "/projects/simpsonify.jpg",
    href: "https://www.simpsonify.us/",
    external: true,
  },
  {
    slug: "balance-chart",
    name: "Balance Chart",
    description:
      "A small tool for seeing how your life divides across body, work, people and meaning. The four always add up to 100, so something has to give.",
    image: "/projects/balance-chart.png",
    href: "/balancetheory",
    external: false,
  },
];

/** How many "more coming soon" cards trail the real ones. */
export const placeholderCount = 2;
