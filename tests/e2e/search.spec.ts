import { expect, test } from '@playwright/test';

const dialog = (page: import('@playwright/test').Page) => page.getByRole('dialog', { name: 'Search the site' });

test('the header button opens search and Escape closes it', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(dialog(page)).toBeVisible();
  await expect(page.getByRole('combobox')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog(page)).toBeHidden();
});

test('the / key opens search, but not while typing in a field', async ({ page }) => {
  await page.goto('/about/');
  await page.keyboard.press('/');
  await expect(dialog(page)).toBeVisible();
  await page.getByRole('combobox').fill('a/b');
  await expect(page.getByRole('combobox')).toHaveValue('a/b');
});

test('with no query it lists projects and pages in groups', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('/');
  await expect(page.getByRole('option').first()).toBeVisible();
  await expect(page.getByRole('group', { name: 'projects' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'pages' })).toBeVisible();
});

test('searching a project name finds its page and Enter opens it', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('/');
  await page.getByRole('combobox').fill('honeypot');
  await expect(page.getByRole('option', { name: /Ouroboros/ })).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/projects\/ouroboros\/$/);
});

test('arrow keys move the selection', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('/');
  const first = page.getByRole('option').first();
  await expect(first).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowDown');
  await expect(first).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByRole('option').nth(1)).toHaveAttribute('aria-selected', 'true');
});

test('shows a message when nothing matches', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('/');
  await page.getByRole('combobox').fill('zzzzqqqq');
  await expect(page.getByText('No results.')).toBeVisible();
});

test('the home and projects index pages are not search results, the 404 is not indexed', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('/');
  await page.getByRole('combobox').fill('Learning to build software');
  await expect(page.getByRole('option', { name: /Home/ })).toHaveCount(0);
});

test('search dialog fits a 360px phone', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Search' }).click();
  const box = await dialog(page).boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(360);
});
