import { describe, expect, it } from 'vitest';
import { publishedPosts } from '../../src/lib/posts';

const post = (id: string, date: string, draft = false) => ({ id, data: { date: new Date(date), draft } });
const now = new Date('2026-11-01T00:00:00Z');

describe('publishedPosts', () => {
  it('is empty for no posts', () => {
    expect(publishedPosts([], now)).toEqual([]);
  });
  it('excludes drafts and future-dated posts', () => {
    const out = publishedPosts([post('a', '2026-10-01'), post('b', '2026-10-02', true), post('c', '2026-12-01')], now);
    expect(out.map((p) => p.id)).toEqual(['a']);
  });
  it('includes a post dated exactly now and sorts newest first', () => {
    const out = publishedPosts([post('old', '2026-01-01'), post('now', '2026-11-01T00:00:00Z'), post('mid', '2026-06-01')], now);
    expect(out.map((p) => p.id)).toEqual(['now', 'mid', 'old']);
  });
});
