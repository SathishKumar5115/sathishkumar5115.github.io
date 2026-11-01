// Runs after the build. Fails if any page still shows draft copy (decision: tech spec section 9).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { findPlaceholders, visibleText } from './placeholders.mjs';

const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
const problems = [];
for (const f of walk('dist').filter((f) => f.endsWith('.html'))) {
  const found = findPlaceholders(visibleText(readFileSync(f, 'utf8')));
  if (found.length) problems.push(`${f}: ${[...new Set(found)].join(' ')}`);
}
if (problems.length) {
  console.error('Placeholder copy found:\n' + problems.join('\n'));
  process.exit(1);
}
console.log('No placeholder copy found.');
