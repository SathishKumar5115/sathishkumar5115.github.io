// Project list helpers (tech spec §5, §6; v5 design, decision 0011).
import type { ProjectStatus } from "../content/schemas";

export const MAX_FEATURED = 3;

interface HasProjectData {
  data: { order: number; featured: boolean; title: string };
}

/** Projects sorted by `order`, then title. */
export function sortProjects<T extends HasProjectData>(projects: readonly T[]): T[] {
  return [...projects].sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}

/** Featured projects for the home page. Throws (failing the build) if more than MAX_FEATURED. */
export function featuredProjects<T extends HasProjectData>(projects: readonly T[]): T[] {
  const featured = projects.filter((p) => p.data.featured);
  if (featured.length > MAX_FEATURED) {
    throw new Error(
      `At most ${MAX_FEATURED} projects can be featured; found ${featured.length}: ` +
        featured.map((p) => p.data.title).join(", "),
    );
  }
  return sortProjects(featured);
}

/** Label and tag tone for every status. The Record type forces every status to be handled. */
export const statusBadge: Record<ProjectStatus, { label: string; tone: "active" | "neutral" }> = {
  idea: { label: "Idea", tone: "neutral" },
  building: { label: "Building", tone: "active" },
  live: { label: "Live", tone: "active" },
  completed: { label: "Completed", tone: "neutral" },
  archived: { label: "Archived", tone: "neutral" },
};

/** Year label for cards and lists: "2025 –" for ongoing work, "2022 – 2023" for finished work spanning years. */
export function projectYears(started: Date, updated: Date, status: ProjectStatus): string {
  const from = started.getUTCFullYear();
  if (status === "building" || status === "live") return `${from} –`;
  if (status === "idea") return `${from}`;
  const to = updated.getUTCFullYear();
  return to > from ? `${from} – ${to}` : `${from}`;
}
