// M1 acceptance: every text/background token pair ≥ 4.5:1 and UI/focus pairs ≥ 3:1, in both themes.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { contrastRatio, mix, parseThemes } from "../../src/lib/contrast";
import { statusBadge } from "../../src/lib/projects";

const css = readFileSync(new URL("../../src/design/tokens.css", import.meta.url), "utf8");
const themes = parseThemes(css);

const backgrounds = ["--aui-bg-primary", "--aui-bg-secondary", "--aui-bg-tertiary"];

// [foreground, background] pairs the site uses for text (WCAG 1.4.3: 4.5:1).
const textPairs: [string, string][] = [
  ...["--aui-text-primary", "--aui-text-secondary", "--aui-text-muted", "--aui-link"].flatMap(
    (fg) => backgrounds.map((bg): [string, string] => [fg, bg]),
  ),
  ["--aui-text-muted", "--aui-clickable-hover"],
  ["--aui-text-secondary", "--aui-clickable-hover"],
  ["--aui-primary-text", "--aui-primary"],
  ["--site-primary-as-text", "--aui-bg-primary"],
  ["--site-primary-as-text", "--aui-bg-secondary"],
  ["--aui-tag-text", "--aui-tag-bg"],
  ["--aui-code-text", "--aui-code-bg"],
  ["--aui-pre-text", "--aui-pre-bg"],
  ...["--aui-success", "--aui-warning", "--aui-danger", "--aui-info"].map(
    (fg): [string, string] => [fg, "--aui-bg-primary"],
  ),
];

// UI components and focus indicators (WCAG 1.4.11: 3:1).
const uiPairs: [string, string][] = [
  ["--aui-primary", "--aui-bg-primary"],
  ["--aui-primary", "--aui-bg-secondary"],
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
    // Tinted badges: text in --aui-c-<variant>, background = 10% of that colour over the surface
    // (array-ui: color-mix(in srgb, var(--c) 10%, transparent)).
    const tintedVariants = [...new Set(Object.values(statusBadge).map((b) => b.variant))].filter(
      (v) => v !== "default",
    );
    for (const variant of tintedVariants) {
      for (const surface of ["--aui-bg-primary", "--aui-bg-secondary"]) {
        it(`badge ${variant} on ${surface} ≥ 4.5:1`, () => {
          const fg = tokens[`--aui-c-${variant}`]!;
          expect(contrastRatio(fg, mix(fg, tokens[surface]!, 0.1))).toBeGreaterThanOrEqual(4.5);
        });
      }
    }
    for (const [fg, bg] of uiPairs) {
      it(`ui ${fg} on ${bg} ≥ 3:1`, () => {
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
