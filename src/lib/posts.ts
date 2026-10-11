// Blog helpers (tech spec §6; M4). Every route, the nav, the home page and the feed use publishedPosts().

interface PostLike {
  id: string;
  data: { pubDate: Date; draft: boolean };
}

/** Published posts, newest first. Drafts never appear. */
export function publishedPosts<T extends PostLike>(posts: readonly T[]): T[] {
  return posts.filter((p) => !p.data.draft).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** Minutes to read at ~200 words a minute, at least 1. Code blocks and markup are not counted. */
export function readingTime(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`[\]()!-]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** URL slug for a tag: lower case, words joined by hyphens, other characters dropped. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Posts grouped by publication year, newest year first; order within a year is kept. */
export function postsByYear<T extends PostLike>(posts: readonly T[]): { year: number; posts: T[] }[] {
  const groups = new Map<number, T[]>();
  for (const p of posts) {
    const year = p.data.pubDate.getUTCFullYear();
    groups.set(year, [...(groups.get(year) ?? []), p]);
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0]).map(([year, list]) => ({ year, posts: list }));
}
