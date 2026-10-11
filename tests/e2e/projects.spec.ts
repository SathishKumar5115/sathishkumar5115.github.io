// M2 acceptance: projects index order, status badges, project page sections, featured on home.
import { expect, test } from "@playwright/test";
import { projectSlugs } from "./pages";

test("projects index lists every project in `order`", async ({ page }) => {
  await page.goto("/projects/");
  const ids = await page.locator("[data-project-list] [data-project]").evaluateAll((els) =>
    els.map((el) => el.getAttribute("data-project")),
  );
  expect(ids).toEqual(projectSlugs);
});

test("every project card has a status badge", async ({ page }) => {
  await page.goto("/projects/");
  const cards = page.locator("[data-project-list] [data-project]");
  for (const card of await cards.all()) {
    await expect(card.locator("[data-status]")).toHaveCount(1);
  }
});

for (const slug of projectSlugs) {
  test(`project page ${slug} has the required sections`, async ({ page }) => {
    await page.goto(`/projects/${slug}/`);
    await expect(page.locator("h1")).toHaveCount(1);
    const h2s = await page.locator("main h2").allTextContents();
    expect(h2s).toEqual(["Problem", "Approach", "Key decisions", "Status", "Links"]);
    await expect(page.locator("main [data-status]").first()).toBeVisible();
  });
}

test("home shows the featured projects (max 3) and links to all projects", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator("[data-project-list] [data-project]");
  expect(await cards.count()).toBeGreaterThan(0);
  expect(await cards.count()).toBeLessThanOrEqual(3);
  await page.getByRole("link", { name: "All projects →" }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
});

test("Projects is the current page in the nav on project pages", async ({ page }) => {
  await page.goto("/projects/retro/");
  await expect(page.locator('.aui-topnav-links a[aria-current="page"]')).toHaveText("Projects");
});
