// Shelf helpers (PRD P9, M4.5). Types with no entries are hidden everywhere.
import { shelfTypes, type ShelfType } from "../content/schemas";

interface ShelfLike {
  data: { type: ShelfType; added: Date; name: string };
}

export const shelfTypeLabels: Record<ShelfType, string> = { tool: "Tools", link: "Links", music: "Music" };

/** Types that have at least one entry, in the fixed order tool, link, music. */
export function visibleTypes(entries: readonly ShelfLike[]): ShelfType[] {
  return shelfTypes.filter((t) => entries.some((e) => e.data.type === t));
}

/** Most recently added first, then by name. */
export function sortShelf<T extends ShelfLike>(entries: readonly T[]): T[] {
  return [...entries].sort(
    (a, b) => b.data.added.getTime() - a.data.added.getTime() || a.data.name.localeCompare(b.data.name),
  );
}
