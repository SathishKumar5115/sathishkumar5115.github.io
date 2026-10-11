// Every page type in the site. Extended as milestones add pages.
// Project slugs in `order` (v5, decision 0011).
export const projectSlugs = [
  "ouroboros",
  "portfolio",
  "retro",
  "unit-price-everywhere",
  "foodindex",
  "sentinels",
  "warehouse-intrusion-detection",
  "discord-bot",
];

export const pages = ["/", "/projects/", ...projectSlugs.map((slug) => `/projects/${slug}/`), "/about/"];

// Rendered by the 404 page (any unknown URL).
export const notFoundPath = "/this-page-does-not-exist/";
