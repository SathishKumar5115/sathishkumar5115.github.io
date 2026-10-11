import { describe, expect, it } from "vitest";
import { projectStatuses } from "../../src/content/schemas";
import { MAX_FEATURED, featuredProjects, projectYears, sortProjects, statusBadge } from "../../src/lib/projects";

const p = (title: string, order: number, featured = false) => ({ data: { title, order, featured } });

describe("sortProjects", () => {
  it("sorts by order, then title", () => {
    const sorted = sortProjects([p("C", 2), p("B", 1), p("A", 2)]);
    expect(sorted.map((x) => x.data.title)).toEqual(["B", "A", "C"]);
  });
});

describe("featuredProjects", () => {
  it(`returns at most ${MAX_FEATURED} featured projects, sorted`, () => {
    expect(featuredProjects([p("B", 2, true), p("A", 1, true), p("X", 0)]).map((x) => x.data.title)).toEqual([
      "A",
      "B",
    ]);
  });

  it(`throws when more than ${MAX_FEATURED} are featured`, () => {
    expect(() => featuredProjects([1, 2, 3, 4].map((n) => p(`P${n}`, n, true)))).toThrow(/At most 3/);
  });
});

describe("statusBadge", () => {
  it("has a label and a tone for every status", () => {
    for (const status of projectStatuses) {
      expect(statusBadge[status].label).not.toBe("");
      expect(["active", "neutral"]).toContain(statusBadge[status].tone);
    }
  });

  it("marks only ongoing work as active", () => {
    expect(statusBadge.building.tone).toBe("active");
    expect(statusBadge.live.tone).toBe("active");
    expect(statusBadge.idea.tone).toBe("neutral");
    expect(statusBadge.completed.tone).toBe("neutral");
  });
});

describe("projectYears", () => {
  const d = (s: string) => new Date(s);
  it("shows an open range for ongoing work", () => {
    expect(projectYears(d("2025-06-01"), d("2026-03-26"), "building")).toBe("2025 –");
  });
  it("shows a single year when start and end match", () => {
    expect(projectYears(d("2026-01-01"), d("2026-04-14"), "completed")).toBe("2026");
  });
  it("shows a range when finished work spans years", () => {
    expect(projectYears(d("2022-06-01"), d("2023-08-31"), "completed")).toBe("2022 – 2023");
  });
  it("shows the start year for ideas", () => {
    expect(projectYears(d("2026-10-10"), d("2026-10-11"), "idea")).toBe("2026");
  });
});
