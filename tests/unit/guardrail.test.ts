import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Decision 0001: the employer is named only in configured fields.
const ALLOWED = new Set(['src/config.ts', 'src/data/about.ts']);

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

describe('employer guardrail', () => {
  it('names the employer only in configured fields', () => {
    const offenders = files('src')
      .filter((f) => !ALLOWED.has(f.replaceAll('\\', '/')))
      .filter((f) => /\bintel\b/i.test(readFileSync(f, 'utf8')));
    expect(offenders).toEqual([]);
  });
  it('the allowed fields still exist', () => {
    for (const f of ALLOWED) expect(readFileSync(f, 'utf8')).toMatch(/Intel/);
  });
});
