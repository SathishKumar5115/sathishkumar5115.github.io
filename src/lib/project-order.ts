export const MAX_FEATURED = 3;

interface Orderable { data: { order: number; featured: boolean } }

export function sortProjects<T extends Orderable>(projects: T[]): T[] {
  return [...projects].sort((a, b) => a.data.order - b.data.order);
}

export function assertFeatured(projects: Orderable[]): void {
  const n = projects.filter((p) => p.data.featured).length;
  if (n > MAX_FEATURED) throw new Error(`At most ${MAX_FEATURED} featured projects, found ${n}`);
}

/** First four-digit year in a free-text date such as "March 2026"; otherwise a visible placeholder. */
export function yearOf(started: string): string {
  return started.match(/\b(19|20)\d{2}\b/)?.[0] ?? '[year]';
}

export function neighbours<T>(list: T[], i: number): { prev?: T; next?: T } {
  return { prev: list[i - 1], next: list[i + 1] };
}
