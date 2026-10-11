// Keyboard and small-screen behaviour (spec §11). Manual checks still happen per milestone.
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

test("skip link is the first tab stop and moves focus to main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();
});

test.describe("360px wide", () => {
  test.use({ viewport: { width: 360, height: 740 } });

  for (const path of pages) {
    test(`no horizontal scrolling on ${path}`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  // v5 has no menu button: the nav wraps, so every link stays visible and reachable.
  test("every main nav link is visible", async ({ page }) => {
    await page.goto("/");
    for (const link of await page.locator('nav[aria-label="Main"] a').all()) {
      await expect(link).toBeInViewport();
    }
  });
});
