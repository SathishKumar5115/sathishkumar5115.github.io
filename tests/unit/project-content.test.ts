// M2 acceptance: each project page body has Problem, Approach and Key decisions sections.
// (Status and Links are rendered from frontmatter by the project layout.)
import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

const dir = new URL("../../src/content/projects/", import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith(".md"));

describe("project content", () => {
  it("has at least one project", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    it(`${file} has the required sections in order`, () => {
      const headings = [...readFileSync(new URL(file, dir), "utf8").matchAll(/^## (.+)$/gm)].map((m) => m[1]);
      expect(headings.slice(0, 3)).toEqual(["Problem", "Approach", "Key decisions"]);
    });
  }
});
