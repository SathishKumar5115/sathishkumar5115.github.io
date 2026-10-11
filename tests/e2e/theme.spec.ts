// M1 acceptance: theme follows the system, toggle persists, no flash of the wrong theme.
import { expect, test } from "@playwright/test";

const theme = (page: import("@playwright/test").Page) =>
  page.evaluate(() => document.documentElement.getAttribute("data-theme"));

for (const scheme of ["light", "dark"] as const) {
  test(`follows the system setting (${scheme}) on first visit`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/");
    expect(await theme(page)).toBe(scheme);
    await expect(page.locator("[data-theme-toggle]")).toHaveAttribute(
      "aria-pressed",
      String(scheme === "dark"),
    );
  });
}

test("toggle overrides the system setting and persists across reloads", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.locator("[data-theme-toggle]");
  await toggle.click();
  expect(await theme(page)).toBe("dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  expect(await theme(page)).toBe("dark");
  await toggle.click();
  await page.reload();
  expect(await theme(page)).toBe("light");
});

// The theme must be set before <body> exists, i.e. before anything can be painted.
async function themeWhenBodyAppears(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    const record = () => {
      (window as unknown as { __themeAtBody: string | null }).__themeAtBody =
        document.documentElement.getAttribute("data-theme");
    };
    const observer = new MutationObserver(() => {
      if (document.body) {
        record();
        observer.disconnect();
      }
    });
    observer.observe(document, { childList: true, subtree: true });
  });
  await page.goto("/");
  return page.evaluate(() => (window as unknown as { __themeAtBody: string | null }).__themeAtBody);
}

test("no flash: system dark theme is applied before the body is parsed", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  expect(await themeWhenBodyAppears(page)).toBe("dark");
});

test("no flash: a stored choice wins over the system before the body is parsed", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  expect(await themeWhenBodyAppears(page)).toBe("light");
});
