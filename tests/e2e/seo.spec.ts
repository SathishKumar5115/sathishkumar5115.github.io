// M3 acceptance: unique titles/descriptions/canonicals, sitemap = built pages, 404, resume, JSON-LD.
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, test } from "@playwright/test";
import { notFoundPath } from "./pages";

const SITE = "https://sathishkumar5115.github.io";

function builtPages(dir = "dist"): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return builtPages(path);
    if (name !== "index.html") return [];
    const rel = relative("dist", dir);
    return [rel ? `/${rel}/` : "/"];
  });
}

async function sitemapPaths(request: import("@playwright/test").APIRequestContext) {
  const index = await (await request.get("/sitemap-index.xml")).text();
  const paths: string[] = [];
  for (const [, loc = ""] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const xml = await (await request.get(new URL(loc).pathname)).text();
    for (const [, url = ""] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) paths.push(new URL(url).pathname);
  }
  return paths.sort();
}

test("sitemap lists exactly the built pages, and no blog pages", async ({ request }) => {
  const paths = await sitemapPaths(request);
  expect(paths).toEqual(builtPages().sort());
  expect(paths.filter((p) => p.startsWith("/blog") || p.startsWith("/tags"))).toEqual([]);
});

test("every page has a unique title, a description and a correct canonical URL", async ({ page, request }) => {
  const titles = new Set<string>();
  for (const path of await sitemapPaths(request)) {
    await page.goto(path);
    const title = await page.title();
    expect(title, path).not.toBe("");
    expect(titles.has(title), `duplicate title "${title}" on ${path}`).toBe(false);
    titles.add(title);
    expect(await page.locator('meta[name="description"]').getAttribute("content"), path).toBeTruthy();
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(SITE + path);
    expect(await page.locator('meta[property="og:image"]').getAttribute("content")).toBe(`${SITE}/og-default.png`);
  }
});

test("robots.txt points to the sitemap and the share image exists", async ({ request }) => {
  expect(await (await request.get("/robots.txt")).text()).toContain(`Sitemap: ${SITE}/sitemap-index.xml`);
  const og = await request.get("/og-default.png");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
});

test("unknown URLs show the 404 page with links home and to projects", async ({ page }) => {
  const response = await page.goto(notFoundPath);
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Page not found");
  await expect(page.getByRole("link", { name: "Go to the home page" })).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: "See all projects" })).toHaveAttribute("href", "/projects/");
});

test("About links the resume as a PDF with its size, and the PDF is served", async ({ page, request }) => {
  await page.goto("/about/");
  const link = page.getByRole("link", { name: /resume \(PDF, \d+ KB\)/ });
  await expect(link).toHaveAttribute("href", "/resume.pdf");
  const pdf = await request.get("/resume.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
});

for (const path of ["/", "/about/"]) {
  test(`JSON-LD Person on ${path}`, async ({ page }) => {
    await page.goto(path);
    const json = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
    expect(json).toMatchObject({ "@type": "Person", name: "Sathishkumar R", url: SITE });
  });
}
