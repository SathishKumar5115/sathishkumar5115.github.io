import { describe, expect, it } from "vitest";
import { projectStatuses } from "../../src/content/schemas";
import { MAX_FEATURED, featuredProjects, sortProjects, statusBadge } from "../../src/lib/projects";

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
  it("has a label and variant for every status", () => {
    for (const status of projectStatuses) {
      expect(statusBadge[status].label).not.toBe("");
    }
  });
});
