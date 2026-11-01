import { expect, test } from '@playwright/test';

test('skip link is the first tab stop and jumps to main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('theme toggle is reachable and operable by keyboard', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /toggle light and dark/i }).focus();
  const before = await page.locator('html').getAttribute('data-theme');
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', before!);
});

test('200% zoom keeps the page usable (no horizontal scroll at 640px wide)', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 800 });
  for (const path of ['/', '/projects/', '/projects/retro/', '/about/']) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  }
});
