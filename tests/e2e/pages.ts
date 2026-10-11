// Every page type in the site. Extended as milestones add pages.
export const projectSlugs = [
  "retro",
  "unit-price-everywhere",
  "portfolio",
  "ouroboros",
  "sentinels",
  "foodindex",
  "gha-bfp-plus",
  "discord-bot",
  "warehouse-intrusion-detection",
];

export const pages = ["/", "/projects/", ...projectSlugs.map((slug) => `/projects/${slug}/`)];
