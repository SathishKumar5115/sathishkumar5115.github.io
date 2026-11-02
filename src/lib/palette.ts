export const PALETTES = ['ink', 'teal', 'indigo', 'forest'] as const;
export const MODES = ['light', 'dark'] as const;
export type PaletteName = (typeof PALETTES)[number];
export type Mode = (typeof MODES)[number];

export function isPalette(v: unknown): v is PaletteName {
  return typeof v === 'string' && (PALETTES as readonly string[]).includes(v);
}

export function isMode(v: unknown): v is Mode {
  return v === 'light' || v === 'dark';
}

/** Resolves the `?palette=` value: a palette name sets it, `reset` clears it, anything else changes nothing. */
export function paletteFromQuery(q: string | null): PaletteName | 'reset' | null {
  if (q === 'reset') return 'reset';
  return isPalette(q) ? q : null;
}

export const FALLBACK_PALETTE: PaletteName = 'indigo';

/** Reads the DEFAULT_PALETTE build setting: empty means the fallback; a wrong name fails the build instead of being ignored. */
export function resolveDefaultPalette(value: string | undefined): PaletteName {
  const v = (value ?? '').trim();
  if (!v) return FALLBACK_PALETTE;
  if (isPalette(v)) return v;
  throw new Error(`DEFAULT_PALETTE must be one of ${PALETTES.join(', ')} (got "${v}")`);
}
