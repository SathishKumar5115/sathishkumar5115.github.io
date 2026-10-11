// M4 acceptance (unit): drafts never publish, newest first, empty list when there are no posts.
import { describe, expect, it } from "vitest";
import { postsByYear, publishedPosts, readingTime, tagSlug } from "../../src/lib/posts";

const post = (id: string, pubDate: string, draft = false) => ({ id, data: { pubDate: new Date(pubDate), draft } });

describe("publishedPosts", () => {
  it("returns [] when there are no posts", () => {
    expect(publishedPosts([])).toEqual([]);
  });

  it("excludes drafts", () => {
    expect(publishedPosts([post("a", "2026-01-01", true)])).toEqual([]);
  });

  it("sorts newest first", () => {
    const ids = publishedPosts([post("old", "2026-01-01"), post("new", "2026-09-01"), post("mid", "2026-05-01")]).map(
      (p) => p.id,
    );
    expect(ids).toEqual(["new", "mid", "old"]);
  });
});

describe("readingTime", () => {
  it("is at least 1 minute", () => {
    expect(readingTime("")).toBe(1);
    expect(readingTime("a few words")).toBe(1);
  });
  it("counts about 200 words a minute, rounded up", () => {
    expect(readingTime("word ".repeat(450))).toBe(3);
  });
  it("ignores code fences and markup", () => {
    expect(readingTime("```\n" + "x ".repeat(1000) + "\n```\nhello")).toBe(1);
  });
});

describe("tagSlug", () => {
  it("makes URL-safe slugs", () => {
    expect(tagSlug("Machine Learning")).toBe("machine-learning");
    expect(tagSlug("C++ / Rust!")).toBe("c-rust");
  });
});

describe("postsByYear", () => {
  it("groups by year, newest year first, keeping order", () => {
    const groups = postsByYear(publishedPosts([post("a", "2025-03-01"), post("b", "2026-02-01"), post("c", "2026-08-01")]));
    expect(groups.map((g) => [g.year, g.posts.map((p) => p.id)])).toEqual([
      [2026, ["c", "b"]],
      [2025, ["a"]],
    ]);
  });
});
