/**
 * The projects page content. This is the only file to edit when adding, removing
 * or reordering a project — Projects.tsx reads it and needs no changes.
 *
 * Images live in public/projects/<slug>.png and are shown at 16:9 (the files
 * there now are generated stand-ins; drop real images over the same names).
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
    image: "/projects/stack.png",
    href: "https://stackbrowser.com/",
    external: true,
  },
  {
    slug: "simpsonify",
    name: "Simpsonify",
    description:
      "Upload a portrait, get yourself back as a Simpsons character. One photo, $1.99, delivered to your inbox.",
    image: "/projects/simpsonify.png",
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
