// Every page type in the site. Extended as milestones add pages.
export const projectSlugs = ["retro", "unit-price-everywhere", "portfolio"];

export const pages = ["/", "/projects/", ...projectSlugs.map((slug) => `/projects/${slug}/`), "/about/"];

// Rendered by the 404 page (any unknown URL).
export const notFoundPath = "/this-page-does-not-exist/";
