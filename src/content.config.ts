// Content collections (tech spec §5). Frontmatter is validated at build time.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { projectSchema } from "./content/schemas";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: projectSchema,
});

export const collections = { projects };
