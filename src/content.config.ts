// Content collections (tech spec §5). Frontmatter is validated at build time.
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { postSchema, projectSchema, shelfSchema } from "./content/schemas";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  // The cover image is checked and optimised by Astro (image()); alt text stays required.
  schema: ({ image }) =>
    projectSchema.extend({
      cover: z.object({ src: image(), alt: z.string().min(1) }).optional(),
    }),
});

// Fixture posts are only included in the test build (BLOG_FIXTURES=1, see astro.config.mjs).
const postPatterns = ["src/content/posts/**/*.{md,mdx}"];
if (process.env["BLOG_FIXTURES"] === "1") postPatterns.push("tests/fixtures/posts/**/*.{md,mdx}");

const posts = defineCollection({
  loader: glob({
    pattern: postPatterns,
    base: ".",
    generateId: ({ entry }) => entry.replace(/^.*\//, "").replace(/\.mdx?$/, ""),
  }),
  schema: postSchema,
});

// Shelf entries live in one YAML file (PRD P9, M4.5).
const shelf = defineCollection({
  loader: file("src/content/shelf.yaml"),
  schema: shelfSchema,
});

export const collections = { projects, posts, shelf };
