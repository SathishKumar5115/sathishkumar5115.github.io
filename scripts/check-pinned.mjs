// Fails if any dependency in package.json uses a version range instead of an exact version.
// Spec: portfolio/docs/02-tech-spec.md §13 (versions pinned exactly); milestone M0.
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const exact = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;
const problems = [];

for (const field of ["dependencies", "devDependencies", "optionalDependencies"]) {
  for (const [name, spec] of Object.entries(pkg[field] ?? {})) {
    if (!exact.test(spec)) problems.push(`${field}: ${name}@${spec}`);
  }
}

if (problems.length) {
  console.error("Dependencies must be pinned to exact versions:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log("All dependencies are pinned to exact versions.");
