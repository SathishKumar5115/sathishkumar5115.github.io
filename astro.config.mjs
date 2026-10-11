// @ts-check
import { defineConfig } from "astro/config";

// Spec: portfolio/docs/02-tech-spec.md §3 (static output, user site, no base path).
export default defineConfig({
  site: "https://sathishkumar5115.github.io",
  output: "static",
  trailingSlash: "always",
});
