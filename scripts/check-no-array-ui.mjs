// Fails if array-ui is a dependency or imported anywhere in src/ (decision 0011: own CSS, no Array UI).
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const problems = [];
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
for (const field of ["dependencies", "devDependencies"]) {
  if (pkg[field]?.["array-ui"]) problems.push(`package.json ${field} lists array-ui`);
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(astro|ts|tsx|js|mjs|css|md|mdx)$/.test(name) && /["']array-ui/.test(readFileSync(path, "utf8"))) {
      problems.push(`${relative(process.cwd(), path)} imports array-ui`);
    }
  }
}
walk(new URL("../src", import.meta.url).pathname);

if (problems.length) {
  console.error("Array UI must not be used (decision 0011):\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log("No Array UI dependency or imports.");
