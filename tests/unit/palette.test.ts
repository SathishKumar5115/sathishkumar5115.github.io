import { describe, expect, it } from 'vitest';
import { isMode, isPalette, paletteFromQuery } from '../../src/lib/palette';

describe('palette helpers', () => {
  it('accepts only known palettes and modes', () => {
    expect(isPalette('teal')).toBe(true);
    expect(isPalette('indigo')).toBe(true);
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
});
