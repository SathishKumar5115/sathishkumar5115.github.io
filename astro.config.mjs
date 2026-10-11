// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// Spec: portfolio/docs/02-tech-spec.md §3 (static output, user site, no base path), §9 (sitemap).
export default defineConfig({
  site: "https://sathishkumar5115.github.io",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
});
