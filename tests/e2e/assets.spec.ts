// M1 acceptance: no third-party font requests; at most 4 font files.
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

for (const path of pages) {
  test(`only same-origin requests and ≤ 4 font files on ${path}`, async ({ page, baseURL }) => {
    const urls: string[] = [];
    page.on("request", (request) => urls.push(request.url()));
    await page.goto(path, { waitUntil: "networkidle" });
    const origin = new URL(baseURL!).origin;
    expect(urls.filter((url) => !url.startsWith(origin) && !url.startsWith("data:"))).toEqual([]);
    expect(urls.filter((url) => /\.(woff2?|ttf|otf)(\?|$)/.test(url)).length).toBeLessThanOrEqual(4);
  });
}
