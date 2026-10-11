// M5 acceptance (unit): the CI guardrails catch what they should.
import { gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { beaconPresent, findBrokenLinks, findEmployerMentions, pageScriptBytes } from "../../scripts/lib/checks.mjs";

describe("findEmployerMentions", () => {
  const files = [
    { path: "src/config.ts", text: 'employer: "Intel",' },
    { path: "src/content/projects/x.md", text: "I built this at Intel for a team." },
    { path: "src/pages/about.astro", text: "{site.employer}" },
    { path: "src/content/projects/y.md", text: "Intelligent agents and intelligence." },
  ];
  it("flags the employer outside the allowed config file, as a whole word only", () => {
    expect(findEmployerMentions(files, "Intel", ["src/config.ts"])).toEqual(["src/content/projects/x.md:1"]);
  });
});

describe("findBrokenLinks", () => {
  const pages = {
    "index.html": '<a href="/projects/">P</a> <a href="/missing/">M</a> <img src="/og.png"> <a href="https://x.dev">X</a> <a href="#main">S</a> <a href="mailto:a@b.c">E</a>',
    "projects/index.html": '<a href="/">Home</a> <link rel="stylesheet" href="/_astro/a.css"> <a href="/resume.pdf?v=1#p2">R</a>',
  };
  const files = new Set(["index.html", "projects/index.html", "og.png", "_astro/a.css", "resume.pdf"]);
  it("reports internal links whose target file doesn't exist; ignores external, anchors and mailto", () => {
    expect(findBrokenLinks(pages, files)).toEqual(["index.html → /missing/"]);
  });
});

describe("pageScriptBytes", () => {
  it("sums gzipped inline and local external scripts, ignoring JSON-LD and remote scripts", () => {
    const inline = "console.log('hello world');";
    const ext = "export const x = 1;".repeat(50);
    const html = `<script>${inline}</script><script type="application/ld+json">{"a":1}</script><script type="module" src="/_astro/a.js"></script><script src="https://static.example.com/b.js"></script>`;
    const bytes = pageScriptBytes(html, (path: string) => (path === "_astro/a.js" ? ext : null));
    expect(bytes).toBe(gzipSync(inline).length + gzipSync(ext).length);
  });
});

describe("beaconPresent", () => {
  it("detects the Cloudflare Web Analytics beacon", () => {
    expect(beaconPresent('<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon=\'{"token":"x"}\'></script>')).toBe(true);
    expect(beaconPresent("<script src=/a.js></script>")).toBe(false);
  });
});
