// Fails if any file outside src/components/ui/ imports array-ui.
// Pages and layouts use our wrappers so the design system can be swapped (decision 0010; M1).
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = new URL("../src", import.meta.url).pathname;
const allowed = join(root, "components", "ui") + sep;
const offenders = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(astro|ts|tsx|js|mjs|md|mdx)$/.test(name) && !path.startsWith(allowed)) {
      if (/from\s+["']array-ui|import\s+["']array-ui/.test(readFileSync(path, "utf8"))) {
        offenders.push(relative(process.cwd(), path));
      }
    }
  }
}

walk(root);
if (offenders.length) {
  console.error("Import array-ui only from src/components/ui/. Offending files:\n  " + offenders.join("\n  "));
  process.exit(1);
}
console.log("No direct array-ui imports outside src/components/ui/.");
