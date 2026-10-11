// WCAG 2.x contrast helpers and a minimal parser for CSS custom properties.
// Used by the contrast test (spec §7, §11; milestone M1).

export type Tokens = Record<string, string>;

/** Parses `#rgb` / `#rrggbb` into [r, g, b] (0–255). */
export function parseHex(hex: string): [number, number, number] {
  const h = hex.trim().replace(/^#/, "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  if (!/^[0-9a-f]{6}$/i.test(full)) throw new Error(`Not a hex color: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number];
}

/** Relative luminance per WCAG 2.x. */
export function luminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two hex colors (1–21). */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Extracts custom properties per theme from a token stylesheet.
 * Light = every block whose selector contains `:root` or `[data-theme="light"]`.
 * Dark = light values overridden by blocks containing `[data-theme="dark"]`.
 * `var(--x)` references are resolved.
 */
export function parseThemes(css: string): { light: Tokens; dark: Tokens } {
  const light: Tokens = {};
  const darkOnly: Tokens = {};
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const [, selector = "", body = ""] of stripped.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const target = selector.includes('[data-theme="dark"]')
      ? darkOnly
      : selector.includes(":root") || selector.includes('[data-theme="light"]')
        ? light
        : null;
    if (!target) continue;
    for (const [, name = "", value = ""] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      target[name] = value.trim();
    }
  }
  const resolve = (tokens: Tokens): Tokens => {
    const out: Tokens = {};
    for (const name of Object.keys(tokens)) {
      let value = tokens[name] ?? "";
      for (let i = 0; i < 5 && value.startsWith("var("); i++) {
        value = tokens[value.slice(4, -1).trim()] ?? value;
      }
      out[name] = value;
    }
    return out;
  };
  return { light: resolve(light), dark: resolve({ ...light, ...darkOnly }) };
}

/** `color-mix(in srgb, fg <weight>, bg)`: the colour of `fg` at `weight` (0–1) over an opaque `bg`. */
export function mix(fg: string, bg: string, weight: number): string {
  const a = parseHex(fg);
  const b = parseHex(bg);
  return (
    "#" +
    a
      .map((v, i) => Math.round(v * weight + b[i]! * (1 - weight)))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}
