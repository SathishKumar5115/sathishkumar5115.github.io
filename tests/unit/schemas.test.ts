// M2 acceptance: bad frontmatter is rejected (missing summary, cover without alt, bad values).
import { describe, expect, it } from "vitest";
import { postSchema, projectSchema } from "../../src/content/schemas";

const validProject = {
  title: "Retro",
  summary: "An evidence-based weekly review.",
  status: "idea",
  order: 1,
  started: "2026-10-10",
  updated: "2026-10-11",
};

describe("projectSchema", () => {
  it("accepts a minimal valid project and applies defaults", () => {
    const parsed = projectSchema.parse(validProject);
    expect(parsed.featured).toBe(false);
    expect(parsed.tags).toEqual([]);
    expect(parsed.links).toEqual({});
    expect(parsed.started).toBeInstanceOf(Date);
  });

  it("rejects a missing summary", () => {
    const { summary: _omit, ...rest } = validProject;
    expect(projectSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects a summary over 160 characters", () => {
    expect(projectSchema.safeParse({ ...validProject, summary: "x".repeat(161) }).success).toBe(false);
  });

  it("rejects a cover without alt text", () => {
    expect(projectSchema.safeParse({ ...validProject, cover: { src: "/a.png" } }).success).toBe(false);
    expect(projectSchema.safeParse({ ...validProject, cover: { src: "/a.png", alt: "" } }).success).toBe(false);
  });

  it("rejects an unknown status", () => {
    expect(projectSchema.safeParse({ ...validProject, status: "done" }).success).toBe(false);
  });

  it("rejects links that aren't URLs", () => {
    expect(projectSchema.safeParse({ ...validProject, links: { repo: "not a url" } }).success).toBe(false);
  });
});

describe("postSchema", () => {
  it("defaults draft to true when missing", () => {
    const parsed = postSchema.parse({ title: "T", description: "D", pubDate: "2026-10-11" });
    expect(parsed.draft).toBe(true);
  });
});
