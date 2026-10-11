// Guards the public resume source (decision 0001, PRD Q2/Q4): no phone number, and the employer
// appears only as a title line with no project description.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const html = readFileSync(new URL("../../resume/resume.html", import.meta.url), "utf8");
const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

describe("resume source", () => {
  it("contains no phone number", () => {
    expect(text).not.toMatch(/\+?\d[\d\s().-]{8,}\d/);
    expect(html).not.toMatch(/tel:/);
  });

  it("names the employer exactly once, as a title line", () => {
    expect(text.match(/Intel/g)?.length).toBe(1);
    expect(html).toMatch(/data-employer-entry/);
  });

  it("has no description bullets for the employer entry", () => {
    const entry = html.match(/<section[^>]*data-employer-entry[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";
    expect(entry).not.toMatch(/<li/);
  });

  it("links the portfolio and the current LinkedIn profile", () => {
    expect(html).toContain("https://sathishkumar5115.github.io");
    expect(html).toContain("https://www.linkedin.com/in/sathishkumar-r-/");
  });
});
