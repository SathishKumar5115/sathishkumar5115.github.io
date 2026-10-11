// Project list helpers (tech spec §5, §6).
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

type BadgeVariant = "violet" | "amber" | "green" | "blue" | "default";

/** Label and badge colour for every status. The Record type forces every status to be handled. */
export const statusBadge: Record<ProjectStatus, { label: string; variant: BadgeVariant }> = {
  idea: { label: "Idea", variant: "violet" },
  building: { label: "Building", variant: "amber" },
  live: { label: "Live", variant: "green" },
  completed: { label: "Completed", variant: "blue" },
  archived: { label: "Archived", variant: "default" },
};
