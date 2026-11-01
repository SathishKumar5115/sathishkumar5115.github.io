import { describe, expect, it } from 'vitest';
import { assertFeatured, neighbours, sortProjects, yearOf } from '../../src/lib/project-order';

const p = (order: number, featured = false) => ({ data: { order, featured } });

describe('project helpers', () => {
  it('sorts by order without mutating the input', () => {
    const input = [p(3), p(1), p(2)];
    expect(sortProjects(input).map((x) => x.data.order)).toEqual([1, 2, 3]);
    expect(input[0].data.order).toBe(3);
  });
  it('allows up to 3 featured and rejects 4', () => {
    expect(() => assertFeatured([p(1, true), p(2, true), p(3, true), p(4)])).not.toThrow();
    expect(() => assertFeatured([p(1, true), p(2, true), p(3, true), p(4, true)])).toThrow(/At most 3/);
  });
  it('extracts a year or shows a placeholder', () => {
    expect(yearOf('March 2026')).toBe('2026');
    expect(yearOf('[month, year]')).toBe('[year]');
  });
  it('finds neighbours at the ends of the list', () => {
    expect(neighbours([1, 2, 3], 0)).toEqual({ prev: undefined, next: 2 });
    expect(neighbours([1, 2, 3], 2)).toEqual({ prev: 2, next: undefined });
  });
});
