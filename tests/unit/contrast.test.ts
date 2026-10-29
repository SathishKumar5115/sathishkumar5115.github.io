// Every text/background token pair ≥ 4.5:1 and UI/focus pairs ≥ 3:1, in both themes (v5 tokens, decision 0011).
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { contrastRatio, mix, parseThemes } from "../../src/lib/contrast";

const css = readFileSync(new URL("../../src/design/tokens.css", import.meta.url), "utf8");
const themes = parseThemes(css);

const surfaces = ["--bg", "--bg-grid", "--surface", "--surface-sunken"];

// [foreground, background] pairs the site uses for text (WCAG 1.4.3: 4.5:1).
const textPairs: [string, string][] = [
  ...["--text", "--text-soft", "--text-muted", "--accent", "--warm"].flatMap((fg) =>
    surfaces.map((bg): [string, string] => [fg, bg]),
  ),
  ["--on-accent", "--accent"],
  ["--bg", "--text"], // inverted buttons and the active segment
  ["--tag-fg", "--tag-bg"],
  ["--tag-active-fg", "--tag-active-bg"],
  ["--code-fg", "--code-bg"],
  ["--code-muted", "--code-bg"],
];

// UI components and focus indicators (WCAG 1.4.11: 3:1).
const uiPairs: [string, string][] = [
  ["--accent", "--bg"], // focus ring
  ["--accent", "--surface"],
  // Control borders (--line-strong) are decorative: every control is identified by its text label
  // and the pressed segment by a full fill (--bg on --text), so they need no 3:1 (WCAG 1.4.11 exception).
];

for (const [themeName, tokens] of Object.entries(themes)) {
  describe(`${themeName} theme`, () => {
    for (const [fg, bg] of textPairs) {
      it(`text ${fg} on ${bg} ≥ 4.5:1`, () => {
        expect(tokens[fg], `${fg} missing`).toBeDefined();
        expect(tokens[bg], `${bg} missing`).toBeDefined();
        expect(contrastRatio(tokens[fg]!, tokens[bg]!)).toBeGreaterThanOrEqual(4.5);
      });
    }
    for (const [fg, bg] of uiPairs) {
      it(`ui ${fg} on ${bg} ≥ 3:1`, () => {
        expect(tokens[fg], `${fg} missing`).toBeDefined();
        expect(contrastRatio(tokens[fg]!, tokens[bg]!)).toBeGreaterThanOrEqual(3);
      });
    }
  });
}

describe("mix", () => {
  it("mixes like color-mix in srgb", () => {
    expect(mix("#ffffff", "#000000", 0.5)).toBe("#808080");
    expect(mix("#ff0000", "#ffffff", 0.1)).toBe("#ffe6e6");
  });
});

describe("contrastRatio", () => {
  it("matches known WCAG values", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
    expect(contrastRatio("#777777", "#ffffff")).toBeCloseTo(4.48, 2);
  });
});
