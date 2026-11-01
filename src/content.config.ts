import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const TAGS = ['agents', 'data', 'security', 'tools'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tag: z.enum(TAGS),
    order: z.number().int(),
    summary: z.string(),
    status: z.string(),
    started: z.string(),
    stack: z.array(z.string()).min(1),
    links: z.object({ repo: z.url().optional(), demo: z.url().optional() }).default({}),
    featured: z.boolean().default(false),
    cover: z.object({ src: z.string(), alt: z.string().min(1) }).optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
