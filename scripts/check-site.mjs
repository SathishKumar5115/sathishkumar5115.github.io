// CI guardrails over the source and the built site (M5). Usage:
//   node scripts/check-site.mjs employer            → "Intel" only in src/config.ts (decision 0001)
//   node scripts/check-site.mjs links <outDir>      → every internal link/asset exists
//   node scripts/check-site.mjs js <outDir>         → each page loads < 10 KB gzipped JS up front
//   node scripts/check-site.mjs analytics <outDir> present|absent
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { analyticsPresent, findBrokenLinks, findEmployerMentions, pageScriptBytes } from "./lib/checks.mjs";

const JS_BUDGET = 10 * 1024;
const [check, outDir = "dist", expectation] = process.argv.slice(2);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}
const builtPages = () =>
  Object.fromEntries(
    walk(outDir)
      .filter((f) => f.endsWith(".html"))
      .map((f) => [relative(outDir, f), readFileSync(f, "utf8")]),
  );
function fail(title, items) {
  console.error(`${title}:\n  ${items.join("\n  ")}`);
  process.exit(1);
}

if (check === "employer") {
  const files = walk("src")
    .filter((f) => /\.(astro|ts|md|mdx|yaml|css|mjs)$/.test(f))
    .map((path) => ({ path, text: readFileSync(path, "utf8") }));
  const hits = findEmployerMentions(files, "Intel", ["src/config.ts"]);
  if (hits.length) fail("Name the employer only in src/config.ts (decision 0001); found", hits);
  console.log("Employer named only in src/config.ts.");
} else if (check === "links") {
  const files = new Set(walk(outDir).map((f) => relative(outDir, f)));
  const broken = findBrokenLinks(builtPages(), files);
  if (broken.length) fail("Broken internal links", broken);
  console.log(`No broken internal links in ${outDir}/.`);
} else if (check === "js") {
  const over = [];
  for (const [page, html] of Object.entries(builtPages())) {
    const bytes = pageScriptBytes(html, (p) => {
      try {
        return readFileSync(join(outDir, p), "utf8");
      } catch {
        return null;
      }
    });
    if (bytes > JS_BUDGET) over.push(`${page}: ${(bytes / 1024).toFixed(1)} KB`);
  }
  if (over.length) fail(`Pages over the ${JS_BUDGET / 1024} KB JS budget`, over);
  console.log(`Every page loads under ${JS_BUDGET / 1024} KB of gzipped JS up front.`);
} else if (check === "analytics") {
  const pages = Object.entries(builtPages());
  const wrong = pages.filter(([, html]) => analyticsPresent(html) !== (expectation === "present")).map(([p]) => p);
  if (wrong.length) fail(`Analytics script should be ${expectation} on`, wrong);
  console.log(`Analytics script ${expectation} on all ${pages.length} pages.`);
} else {
  console.error("Usage: node scripts/check-site.mjs employer | links <dir> | js <dir> | analytics <dir> present|absent");
  process.exit(2);
}
