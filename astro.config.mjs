// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// Test-only build with fixture blog posts (M4). Never deployed: it writes to dist-blog/.
const blogFixtures = process.env["BLOG_FIXTURES"] === "1";

// Spec: portfolio/docs/02-tech-spec.md §3 (static output, user site, no base path), §9 (sitemap).
export default defineConfig({
  site: "https://sathishkumar5115.github.io",
  output: "static",
  trailingSlash: "always",
  outDir: blogFixtures ? "./dist-blog" : "./dist",
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes("/404") })],
});
