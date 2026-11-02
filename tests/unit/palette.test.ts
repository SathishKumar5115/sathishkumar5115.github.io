import { describe, expect, it } from 'vitest';
import { isMode, isPalette, paletteFromQuery, resolveDefaultPalette } from '../../src/lib/palette';

describe('palette helpers', () => {
  it('accepts only known palettes and modes', () => {
    expect(isPalette('teal')).toBe(true);
    expect(isPalette('indigo')).toBe(true);
    expect(isPalette('ink')).toBe(true);
    expect(isPalette('forest')).toBe(true);
    expect(isPalette('amber')).toBe(false);
    expect(isMode('dark')).toBe(true);
    expect(isMode('auto')).toBe(false);
  });
  it('parses the ?palette= value', () => {
    expect(paletteFromQuery('indigo')).toBe('indigo');
    expect(paletteFromQuery('reset')).toBe('reset');
    expect(paletteFromQuery('nope')).toBeNull();
    expect(paletteFromQuery(null)).toBeNull();
  });
  it('resolves the default palette from the build setting', () => {
    expect(resolveDefaultPalette(undefined)).toBe('indigo');
    expect(resolveDefaultPalette('')).toBe('indigo');
    expect(resolveDefaultPalette('  forest ')).toBe('forest');
    expect(() => resolveDefaultPalette('purple')).toThrow(/DEFAULT_PALETTE must be one of/);
  });
});
