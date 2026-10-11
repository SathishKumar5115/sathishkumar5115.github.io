// Resume PDF helper.
//   node scripts/resume.mjs strip <input.pdf>   → writes public/resume.pdf with clean metadata
//   node scripts/resume.mjs check               → fails if public/resume.pdf is missing or leaky
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { checkPdf, inspectPdf, stripPdf } from "./lib/pdf-metadata.mjs";

const OWNER = "Sathishkumar R";
const TARGET = new URL("../public/resume.pdf", import.meta.url);
const [command, input] = process.argv.slice(2);

if (command === "strip" && input) {
  const out = await stripPdf(readFileSync(input), { title: `${OWNER} – Resume`, author: OWNER });
  writeFileSync(TARGET, out);
  console.log(`Wrote public/resume.pdf (${(out.length / 1024).toFixed(0)} KB) with clean metadata.`);
} else if (command === "check") {
  if (!existsSync(TARGET)) {
    console.error("public/resume.pdf is missing (PRD Q4). Add it with: node scripts/resume.mjs strip <file>");
    process.exit(1);
  }
  const problems = checkPdf(await inspectPdf(readFileSync(TARGET)), OWNER);
  if (problems.length) {
    console.error("public/resume.pdf metadata problems:\n  " + problems.join("\n  "));
    process.exit(1);
  }
  console.log("public/resume.pdf metadata is clean.");
} else {
  console.error("Usage: node scripts/resume.mjs strip <input.pdf> | check");
  process.exit(2);
}
