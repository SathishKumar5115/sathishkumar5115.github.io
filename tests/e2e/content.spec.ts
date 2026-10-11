// Content rules (decision 0001, PRD changelog): the employer is named only on the Home intro line and on About.
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

for (const path of pages) {
  test(`employer naming rule on ${path}`, async ({ page }) => {
    await page.goto(path);
    const text = await page.locator("body").innerText();
    if (path === "/") {
      // Exactly once, in the intro line.
      expect(text.match(/Intel/g)?.length).toBe(1);
      await expect(page.locator(".intro")).toContainText("@ Intel");
    } else if (path === "/about/") expect(text).toContain("Intel");
    else expect(text).not.toContain("Intel");
  });
}
