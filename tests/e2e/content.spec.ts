// Content rules (decision 0001, PRD changelog): the employer is named on About only.
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

for (const path of pages) {
  test(`employer naming rule on ${path}`, async ({ page }) => {
    await page.goto(path);
    const text = await page.locator("body").innerText();
    if (path === "/about/") expect(text).toContain("Intel");
    else expect(text).not.toContain("Intel");
  });
}
