// Runs after `astro build`: builds the Pagefind search index into <outDir>/pagefind/ (tech spec §8).
import * as pagefind from "pagefind";

const outDir = process.env["BLOG_FIXTURES"] === "1" ? "dist-blog" : "dist";
const { index } = await pagefind.createIndex({});
const { errors, page_count } = await index.addDirectory({ path: outDir });
if (errors.length) throw new Error(`Pagefind: ${errors.join("; ")}`);
await index.writeFiles({ outputPath: `${outDir}/pagefind` });
await pagefind.close();
console.log(`Pagefind indexed ${page_count} pages into ${outDir}/pagefind/`);
