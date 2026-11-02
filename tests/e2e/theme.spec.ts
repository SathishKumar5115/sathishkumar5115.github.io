import { expect, test } from '@playwright/test';

const DEFAULT = process.env.DEFAULT_PALETTE || 'indigo';
const ALL = ['ink', 'teal', 'indigo', 'forest'];
const OTHER = DEFAULT === 'teal' ? 'ink' : 'teal';
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
  await expect(html(page)).toHaveAttribute('data-palette', DEFAULT);
  await page.goto(`/?palette=${OTHER}`);
  await expect(html(page)).toHaveAttribute('data-palette', OTHER);
  await page.goto('/');
  await expect(html(page)).toHaveAttribute('data-palette', OTHER);
  await page.goto('/?palette=reset');
  await expect(html(page)).toHaveAttribute('data-palette', DEFAULT);
});

test('every palette can be previewed with ?palette=', async ({ page }) => {
  const order = [DEFAULT, ...ALL.filter((n) => n !== DEFAULT)];
  for (const name of order) {
    await page.goto(`/?palette=${name}`);
    await expect(html(page)).toHaveAttribute('data-palette', name);
  }
  await page.goto('/?palette=nonsense');
  await expect(html(page)).toHaveAttribute('data-palette', order[order.length - 1]);
  await page.goto('/?palette=reset');
  await expect(html(page)).toHaveAttribute('data-palette', DEFAULT);
});

test('renders with storage unavailable', async ({ browser }) => {
  const ctx = await browser.newContext();
  await ctx.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
  });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(html(page)).toHaveAttribute('data-palette', DEFAULT);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await ctx.close();
});

test('360px has no horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});
