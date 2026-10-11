// Content collections (tech spec §5). Frontmatter is validated at build time.
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { projectSchema } from "./content/schemas";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  // The cover image is checked and optimised by Astro (image()); alt text stays required.
  schema: ({ image }) =>
    projectSchema.extend({
      cover: z.object({ src: image(), alt: z.string().min(1) }).optional(),
    }),
});

export const collections = { projects };
