// Loads published posts once per build for routes, nav, home and feed (M4, PRD R10).
import { getCollection, type CollectionEntry } from "astro:content";
import { publishedPosts, tagSlug } from "./posts";

export type Post = CollectionEntry<"posts">;

export async function getPublishedPosts(): Promise<Post[]> {
  return publishedPosts(await getCollection("posts"));
}

/** Every tag used by published posts, with its slug and post count, most used first. */
export function allTags(posts: readonly Post[]): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, { tag: string; count: number }>();
  for (const p of posts) {
    for (const tag of p.data.tags) {
      const slug = tagSlug(tag);
      const entry = counts.get(slug) ?? { tag, count: 0 };
      entry.count += 1;
      counts.set(slug, entry);
    }
  }
  return [...counts.entries()]
    .map(([slug, v]) => ({ slug, ...v }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export const shortDate = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
export const longDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
