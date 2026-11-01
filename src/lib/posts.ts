export interface PostData { draft: boolean; date: Date }

/** The single gate for the Blog: drafts and future-dated posts are excluded; newest first. */
export function publishedPosts<T extends { data: PostData }>(posts: T[], now: Date = new Date()): T[] {
  return posts
    .filter((p) => !p.data.draft && p.data.date.getTime() <= now.getTime())
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
