// Projects: order, status badges, project page sections, featured on home, filter (v5).
import { expect, test } from "@playwright/test";
import { projectSlugs } from "./pages";

const cards = (page: import("@playwright/test").Page) => page.locator("#project-list [data-project]");

test("projects index lists every project in `order`", async ({ page }) => {
  await page.goto("/projects/");
  const ids = await cards(page).evaluateAll((els) => els.map((el) => el.getAttribute("data-project")));
  expect(ids).toEqual(projectSlugs);
});

test("every project card has a status badge", async ({ page }) => {
  await page.goto("/projects/");
  for (const card of await cards(page).all()) {
    await expect(card.locator("[data-status]")).toHaveCount(1);
  }
});

test("the filter shows only matching projects and works by keyboard", async ({ page }) => {
  await page.goto("/projects/");
  const group = page.getByRole("group", { name: "Filter by status" });
  await expect(group).toBeVisible();
  const building = group.getByRole("button", { name: /^Building/ });
  await building.focus();
  await page.keyboard.press("Enter");
  await expect(building).toHaveAttribute("aria-pressed", "true");
  for (const card of await cards(page).all()) {
    const status = await card.locator("[data-status]").getAttribute("data-status");
    if (status === "building") await expect(card).toBeVisible();
    else await expect(card).toBeHidden();
  }
  await group.getByRole("button", { name: /^All/ }).click();
  for (const card of await cards(page).all()) await expect(card).toBeVisible();
});

test.describe("with JavaScript off", () => {
  test.use({ javaScriptEnabled: false });
  test("all projects are visible and the filter is not shown", async ({ page }) => {
    await page.goto("/projects/");
    await expect(cards(page)).toHaveCount(projectSlugs.length);
    for (const card of await cards(page).all()) await expect(card).toBeVisible();
    await expect(page.getByRole("group", { name: "Filter by status" })).toBeHidden();
  });
});

for (const slug of projectSlugs) {
  test(`project page ${slug} has the required sections and facts`, async ({ page }) => {
    await page.goto(`/projects/${slug}/`);
    await expect(page.locator("h1")).toHaveCount(1);
    const h2s = await page.locator("main article h2").allTextContents();
    expect(h2s.slice(0, 3)).toEqual(["Problem", "Approach", "Key decisions"]);
    const facts = page.getByRole("complementary", { name: "Project facts" });
    await expect(facts.getByText("Status", { exact: true })).toBeVisible();
    await expect(facts.getByText("Links", { exact: true })).toBeVisible();
    await expect(page.locator("main [data-status]").first()).toBeVisible();
  });
}

test("home shows the featured projects (max 3) and links to all projects", async ({ page }) => {
  await page.goto("/");
  const featured = page.locator("[data-project-list] [data-project]");
  expect(await featured.count()).toBeGreaterThan(0);
  expect(await featured.count()).toBeLessThanOrEqual(3);
  await page.getByRole("link", { name: "All projects →" }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
});

test("Projects is the current page in the nav on project pages", async ({ page }) => {
  await page.goto("/projects/ouroboros/");
  await expect(page.locator('nav[aria-label="Main"] a[aria-current="page"]')).toHaveText("Projects");
});

test("the Ouroboros page shows its screenshot with alt text", async ({ page }) => {
  await page.goto("/projects/ouroboros/");
  const img = page.locator("figure img");
  await expect(img).toBeVisible();
  expect((await img.getAttribute("alt"))?.length).toBeGreaterThan(20);
});
