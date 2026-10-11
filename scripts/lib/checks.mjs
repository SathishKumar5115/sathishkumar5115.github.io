// Pure helpers for the CI guardrails (M5). Each one is unit-tested in tests/unit/checks.test.ts.
import { gzipSync } from "node:zlib";

/**
 * Files that name the employer as a whole word, outside the allowed files (decision 0001).
 * @param {{ path: string, text: string }[]} files @param {string} employer @param {string[]} allowed
 * @returns {string[]} "path:line" for each mention
 */
export function findEmployerMentions(files, employer, allowed) {
  const word = new RegExp(`\\b${employer}\\b`);
  const hits = [];
  for (const { path, text } of files) {
    if (allowed.includes(path)) continue;
    text.split("\n").forEach((line, i) => {
      if (word.test(line)) hits.push(`${path}:${i + 1}`);
    });
  }
  return hits;
}

/**
 * Internal href/src targets that don't exist in the build output.
 * @param {Record<string, string>} pages built HTML by path relative to the output dir
 * @param {Set<string>} files every file path relative to the output dir
 * @returns {string[]} "page → link"
 */
export function findBrokenLinks(pages, files) {
  const broken = [];
  for (const [page, html] of Object.entries(pages)) {
    for (const [, url = ""] of html.matchAll(/\s(?:href|src)=["']?([^"'\s>]+)/g)) {
      if (!url.startsWith("/") || url.startsWith("//")) continue;
      const path = decodeURIComponent(url.split(/[?#]/)[0] ?? "").replace(/^\//, "");
      const target = path === "" || path.endsWith("/") ? `${path}index.html` : path;
      if (!files.has(target) && !files.has(`${path}/index.html`)) broken.push(`${page} → ${url}`);
    }
  }
  return [...new Set(broken)];
}

/**
 * Gzipped bytes of JavaScript a page loads up front: inline scripts plus local external scripts.
 * JSON-LD and remote scripts are not counted.
 * @param {string} html @param {(path: string) => string | null} readLocal
 */
export function pageScriptBytes(html, readLocal) {
  let total = 0;
  for (const [, attrs = "", body = ""] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type=["']?application\/ld\+json/.test(attrs)) continue;
    const src = attrs.match(/\ssrc=["']?([^"'\s>]+)/)?.[1];
    if (src) {
      if (!src.startsWith("/") || src.startsWith("//")) continue;
      const code = readLocal(src.replace(/^\//, ""));
      if (code) total += gzipSync(code).length;
    } else if (body.trim()) {
      total += gzipSync(body).length;
    }
  }
  return total;
}

/** Whether the page loads the GoatCounter analytics script (decision 0012). @param {string} html */
export function analyticsPresent(html) {
  return html.includes("gc.zgo.at/count.js");
}
