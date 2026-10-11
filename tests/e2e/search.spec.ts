// M5 acceptance: search finds a project and works by keyboard only.
import { expect, test } from "@playwright/test";

test("'/' opens search; typing finds the Ouroboros project; Enter follows the result", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("/");
  const dialog = page.getByRole("dialog", { name: "Search" });
  await expect(dialog).toBeVisible();
  await expect(page.getByLabel("Search projects, writing and pages")).toBeFocused();
  await page.keyboard.type("honeypot");
  const result = dialog.getByRole("link", { name: /Ouroboros/ }).first();
  await expect(result).toBeVisible();
  await result.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/ouroboros\/$/);
});

test("Escape closes search and returns focus to the button", async ({ page }) => {
  await page.goto("/about/");
  const button = page.getByRole("button", { name: "Search" });
  await button.click();
  await expect(page.getByRole("dialog", { name: "Search" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Search" })).toBeHidden();
  await expect(button).toBeFocused();
});

test("the 404 page is not in the search index", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("/");
  await page.keyboard.type("Page not found");
  const dialog = page.getByRole("dialog", { name: "Search" });
  await expect(dialog.getByRole("status")).not.toHaveText("");
  await expect(dialog.getByRole("link", { name: /Page not found/ })).toHaveCount(0);
});
