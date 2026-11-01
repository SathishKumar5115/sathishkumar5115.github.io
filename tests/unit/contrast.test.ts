import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { PALETTES, MODES } from '../../src/lib/palette';

const css = readFileSync(new URL('../../src/styles/tokens.css', import.meta.url), 'utf8');

function tokens(palette: string, mode: string): Record<string, string> {
  const re = new RegExp(`\\[data-palette='${palette}'\\]\\[data-theme='${mode}'\\]\\s*\\{([^}]*)\\}`);
  const block = css.match(re)?.[1];
  if (!block) throw new Error(`no block for ${palette}/${mode}`);
  return Object.fromEntries([...block.matchAll(/--(\w+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));
}

function lum(hex: string): number {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a: string, b: string): number {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [foreground, background] pairs that carry text
const pairs: [string, string][] = [
  ['text', 'bg'], ['text', 'surface'], ['text', 'panel'],
  ['muted', 'bg'], ['muted', 'surface'], ['muted', 'panel'],
  ['accent', 'bg'], ['accent', 'surface'], ['accent', 'panel'],
  ['warm', 'bg'], ['warm', 'surface'], ['warm', 'panel'],
  ['onAccent', 'accent'],
];

describe('colour contrast (WCAG 2.x, at least 4.5:1)', () => {
  for (const palette of PALETTES) {
    for (const mode of MODES) {
      const t = tokens(palette, mode);
      it(`${palette} ${mode} defines every token`, () => {
        for (const k of ['bg', 'surface', 'panel', 'grid', 'text', 'muted', 'line', 'accent', 'onAccent', 'warm']) {
          expect(t[k], k).toMatch(/^#[0-9a-f]{6}$/i);
        }
      });
      for (const [fg, bg] of pairs) {
        it(`${palette} ${mode}: ${fg} on ${bg}`, () => {
          expect(ratio(t[fg], t[bg])).toBeGreaterThanOrEqual(4.5);
        });
      }
    }
  }
});
