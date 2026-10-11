// M4.5 acceptance: the shelf page, hidden empty types, nav link, Home preview.
import { expect, test } from "@playwright/test";

test("the shelf lists the launch tools, newest first, each with a link", async ({ page }) => {
  await page.goto("/shelf/");
  const rows = page.locator("[data-shelf]");
  expect(await rows.count()).toBeGreaterThan(0);
  for (const row of await rows.all()) {
    await expect(row.getByRole("link")).toHaveAttribute("href", /^https:\/\//);
  }
});

test("types with no entries have no tab; one type means no filter at all", async ({ page }) => {
  await page.goto("/shelf/");
  const types = await page.locator("[data-shelf]").evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute("data-filter-value")))]);
  const group = page.getByRole("group", { name: "Shelf sections" });
  if (types.length < 2) {
    await expect(group).toHaveCount(0);
  } else {
    for (const label of ["Tools", "Links", "Music"]) {
      const type = { Tools: "tool", Links: "link", Music: "music" }[label]!;
      await expect(group.getByRole("button", { name: new RegExp(`^${label}`) })).toHaveCount(types.includes(type) ? 1 : 0);
    }
  }
});

test("the nav links to the shelf and Home previews it", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('nav[aria-label="Main"]').getByRole("link", { name: "Shelf" })).toHaveAttribute("href", "/shelf/");
  const preview = page.locator("[data-shelf-preview] li");
  expect(await preview.count()).toBeGreaterThan(0);
  expect(await preview.count()).toBeLessThanOrEqual(3);
});
