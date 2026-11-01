import { expect, test } from '@playwright/test';

const html = (page: import('@playwright/test').Page) => page.locator('html');

test('follows the system theme when nothing is stored', async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: 'dark' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(html(page)).toHaveAttribute('data-theme', 'dark');
  await ctx.close();
});

test('toggle flips the theme and persists across reload', async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: 'light' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(html(page)).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: /toggle light and dark/i }).click();
  await expect(html(page)).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(html(page)).toHaveAttribute('data-theme', 'dark');
  await ctx.close();
});

test('theme is set before first paint (no flash)', async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: 'dark' });
  await ctx.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      (window as unknown as { __themeAtDcl: string }).__themeAtDcl = document.documentElement.dataset.theme ?? '';
    });
  });
  const page = await ctx.newPage();
  await page.goto('/');
  expect(await page.evaluate(() => (window as unknown as { __themeAtDcl: string }).__themeAtDcl)).toBe('dark');
  await ctx.close();
});

test('?palette= sets, persists and resets the palette', async ({ page }) => {
  await page.goto('/');
  await expect(html(page)).toHaveAttribute('data-palette', 'teal');
  await page.goto('/?palette=indigo');
  await expect(html(page)).toHaveAttribute('data-palette', 'indigo');
  await page.goto('/');
  await expect(html(page)).toHaveAttribute('data-palette', 'indigo');
  await page.goto('/?palette=reset');
  await expect(html(page)).toHaveAttribute('data-palette', 'teal');
});

test('renders with storage unavailable', async ({ browser }) => {
  const ctx = await browser.newContext();
  await ctx.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
  });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(html(page)).toHaveAttribute('data-palette', 'teal');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await ctx.close();
});

test('360px has no horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});
