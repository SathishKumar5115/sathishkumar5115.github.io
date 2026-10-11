// M4 acceptance with fixture posts: the blog appears, drafts never do, pages are accessible.
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const blogPages = ["/blog/", "/blog/fixture-newer/", "/blog/fixture-older/", "/tags/testing/"];

test("Writing index lists published posts newest first, grouped by year, without drafts", async ({ page }) => {
  await page.goto("/blog/");
  const ids = await page.locator("[data-post]").evaluateAll((els) => els.map((e) => e.getAttribute("data-post")));
  expect(ids).toEqual(["fixture-newer", "fixture-older"]);
  await expect(page.getByRole("heading", { name: "2026" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "2025" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Draft fixture");
});

test("drafts are not built, not tagged and not in the feed", async ({ request }) => {
  expect((await request.get("/blog/fixture-draft/")).status()).toBe(404);
  expect((await request.get("/tags/secret-draft-tag/")).status()).toBe(404);
  expect((await request.get("/blog/_post-template/")).status()).toBe(404);
  const rss = await (await request.get("/rss.xml")).text();
  expect(rss).not.toContain("Draft fixture");
});

test("the nav, head and footer link to the blog; Home lists recent posts", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('nav[aria-label="Main"]').getByRole("link", { name: "Writing" })).toHaveAttribute("href", "/blog/");
  await expect(page.locator('link[rel="alternate"][type="application/rss+xml"]')).toHaveAttribute("href", "/rss.xml");
  await expect(page.locator("footer").getByRole("link", { name: "RSS" })).toBeVisible();
  const latest = page.locator("[data-latest-posts] [data-post]");
  await expect(latest).toHaveCount(2);
});

test("a post page has its title, meta, table of contents and older/newer links", async ({ page }) => {
  await page.goto("/blog/fixture-newer/");
  await expect(page.locator("h1")).toHaveText("Fixture post with sections");
  await expect(page.getByText(/\d+ min read/)).toBeVisible();
  const toc = page.getByRole("complementary", { name: "On this page" });
  await expect(toc.getByRole("link")).toHaveText(["First section", "Second section", "Third section"]);
  await toc.getByRole("link", { name: "Second section" }).click();
  await expect(page).toHaveURL(/#second-section$/);
  await expect(page.locator("article pre")).toBeVisible();
  await expect(page.getByRole("link", { name: /Older/ })).toHaveAttribute("href", "/blog/fixture-older/");
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain("BlogPosting");
});

test("RSS validates as a feed with both published posts", async ({ request }) => {
  const res = await request.get("/rss.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  expect(xml).toContain("<rss");
  expect(xml.match(/<item>/g)?.length).toBe(2);
  expect(xml).toContain("https://sathishkumar5115.github.io/blog/fixture-newer/");
});

test("tag pages list the posts for that tag", async ({ page }) => {
  await page.goto("/tags/agents/");
  await expect(page.locator("[data-post]")).toHaveCount(1);
  await page.goto("/tags/testing/");
  await expect(page.locator("[data-post]")).toHaveCount(2);
});

for (const path of blogPages) {
  for (const scheme of ["light", "dark"] as const) {
    test(`axe: ${path} (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
    });
  }
}

test.describe("360px wide", () => {
  test.use({ viewport: { width: 360, height: 740 } });
  for (const path of blogPages) {
    test(`no horizontal scrolling on ${path}`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
