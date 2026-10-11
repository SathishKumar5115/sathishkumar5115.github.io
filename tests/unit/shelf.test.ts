// M4.5 acceptance (unit): bad shelf entries are rejected; empty types are hidden.
import { describe, expect, it } from "vitest";
import { shelfSchema } from "../../src/content/schemas";
import { shelfTypeLabels, sortShelf, visibleTypes } from "../../src/lib/shelf";

const valid = { name: "Astro", type: "tool", tag: "framework", note: "Static-first web framework.", url: "https://astro.build/", added: "2026-10-11" };
const entry = (type: "tool" | "link" | "music", added: string, name: string = type) => ({ data: { type, added: new Date(added), name } });

describe("shelfSchema", () => {
  it("accepts a valid entry", () => {
    expect(shelfSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects a missing URL", () => {
    const { url: _u, ...rest } = valid;
    expect(shelfSchema.safeParse(rest).success).toBe(false);
  });
  it("rejects an unknown type", () => {
    expect(shelfSchema.safeParse({ ...valid, type: "podcast" }).success).toBe(false);
  });
  it("rejects a note over 160 characters", () => {
    expect(shelfSchema.safeParse({ ...valid, note: "x".repeat(161) }).success).toBe(false);
  });
});

describe("visibleTypes", () => {
  it("is empty when there are no entries", () => {
    expect(visibleTypes([])).toEqual([]);
  });
  it("lists only types that have entries, in the fixed order tool, link, music", () => {
    expect(visibleTypes([entry("music", "2026-01-01"), entry("tool", "2026-01-01")])).toEqual(["tool", "music"]);
  });
});

describe("sortShelf", () => {
  it("puts the most recently added first", () => {
    const sorted = sortShelf([entry("tool", "2026-01-01", "old"), entry("tool", "2026-09-01", "new")]);
    expect(sorted.map((e) => e.data.name)).toEqual(["new", "old"]);
  });
});

describe("shelfTypeLabels", () => {
  it("has a label for every type", () => {
    expect(shelfTypeLabels).toEqual({ tool: "Tools", link: "Links", music: "Music" });
  });
});
