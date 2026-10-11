// Content schemas (tech spec §5). Shared by content.config.ts and the unit tests.
import { z } from "astro/zod";

export const projectStatuses = ["idea", "building", "live", "completed", "archived"] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

export const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(160),
  status: z.enum(projectStatuses),
  track: z.enum(["A", "B", "C"]).optional(),
  tags: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
  order: z.number().int(),
  links: z
    .object({ repo: z.url().optional(), store: z.url().optional(), demo: z.url().optional() })
    .default({}),
  cover: z.object({ src: z.string().min(1), alt: z.string().min(1) }).optional(),
  started: z.coerce.date(),
  updated: z.coerce.date(),
});

// Used from M4; defined now so the content model is complete.
export const postSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(200),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string().min(1)).default([]),
  draft: z.boolean().default(true),
  toc: z.boolean().optional(),
});

// Shelf (PRD P9, M4.5): tools, links and music, one line each.
export const shelfTypes = ["tool", "link", "music"] as const;
export type ShelfType = (typeof shelfTypes)[number];

export const shelfSchema = z.object({
  name: z.string().min(1),
  type: z.enum(shelfTypes),
  tag: z.string().min(1).max(24),
  note: z.string().min(1).max(160),
  url: z.url(),
  added: z.coerce.date(),
});
