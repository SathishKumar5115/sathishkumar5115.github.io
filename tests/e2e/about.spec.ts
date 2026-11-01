import { expect, test } from '@playwright/test';

test('about shows bio, career log, toolbox, contact and the terminal card', async ({ page }) => {
  await page.goto('/about/');
  await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible();
  for (const h of ['Career log', 'Toolbox', 'Contact']) {
    await expect(page.getByRole('heading', { level: 2, name: h })).toBeVisible();
  }
  await expect(page.getByRole('complementary', { name: 'Summary' })).toContainText('about.txt');
  await expect(page.getByRole('link', { name: 'rsathishkumar1963@gmail.com' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
});

test('about has no horizontal scroll at 360px', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/about/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
