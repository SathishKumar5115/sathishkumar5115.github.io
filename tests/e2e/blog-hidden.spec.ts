// M4 acceptance on the real site (0 published posts): no trace of the blog anywhere (PRD R10).
import { expect, test } from "@playwright/test";

test("no blog pages, feed or links while there are no published posts", async ({ page, request }) => {
  expect((await request.get("/blog/")).status()).toBe(404);
  expect((await request.get("/rss.xml")).status()).toBe(404);
  await page.goto("/");
  await expect(page.locator('nav[aria-label="Main"]').getByRole("link", { name: "Writing" })).toHaveCount(0);
  await expect(page.locator('link[rel="alternate"][type="application/rss+xml"]')).toHaveCount(0);
  await expect(page.locator("[data-latest-posts]")).toHaveCount(0);
  await expect(page.locator("footer").getByRole("link", { name: "RSS" })).toHaveCount(0);
});
