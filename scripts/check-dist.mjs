// Post-build checks: internal links resolve, and the JS and font budgets from the tech spec hold.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';

const dist = 'dist';
const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
const files = walk(dist);
const html = files.filter((f) => f.endsWith('.html'));
const problems = [];

const resolves = (p) => {
  const clean = p.split('#')[0].split('?')[0];
  if (!clean) return true;
  const target = join(dist, clean);
  return existsSync(target) && statSync(target).isFile() ? true : existsSync(join(target, 'index.html'));
};

for (const f of html) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(u)) continue;
    if (!u.startsWith('/')) { problems.push(`${f}: relative link ${u}`); continue; }
    if (!resolves(u)) problems.push(`${f}: broken link ${u}`);
  }
}

// JS: external bundles plus inline scripts, gzipped, across the heaviest page.
// Search (Pagefind) loads only when the dialog opens, so it is outside the per-page budget.
const jsFiles = files.filter((f) => extname(f) === '.js' && !f.startsWith(join(dist, 'pagefind')));
const jsGz = jsFiles.reduce((n, f) => n + gzipSync(readFileSync(f)).length, 0);
let maxInline = 0;
for (const f of html) {
  const inline = [...readFileSync(f, 'utf8').matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('');
  maxInline = Math.max(maxInline, gzipSync(inline).length);
}
const total = jsGz + maxInline;
if (total > 10 * 1024) problems.push(`JS is ${total} bytes gzipped, budget is 10240`);

const fonts = files.filter((f) => extname(f) === '.woff2');
if (fonts.length > 3) problems.push(`${fonts.length} font files, budget is 3`);

console.log(`${html.length} pages, JS ${total} B gzipped, ${fonts.length} fonts`);
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
