import { expect, test } from '@playwright/test';

test('projects index lists all 7 and filters by type', async ({ page }) => {
  await page.goto('/projects/');
  await expect(page.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
  await expect(page.locator('.row:visible')).toHaveCount(7);
  await page.getByRole('button', { name: 'Security' }).click();
  await expect(page.locator('.row:visible')).toHaveCount(3);
  await page.getByRole('button', { name: 'All' }).click();
  await expect(page.locator('.row:visible')).toHaveCount(7);
});

test('a project page shows the template sections, facts and neighbours', async ({ page }) => {
  await page.goto('/projects/retro/');
  await expect(page.getByRole('heading', { level: 1, name: 'Retro' })).toBeVisible();
  for (const h of ['Problem', 'Approach', 'Key decisions', 'What I would change']) {
    await expect(page.getByRole('heading', { level: 2, name: h })).toBeVisible();
  }
  await expect(page.getByRole('complementary', { name: 'Facts' })).toContainText('Stage 0, manual weekly review');
  await expect(page.getByRole('navigation', { name: 'More projects' }).getByRole('link')).toHaveCount(2);
});

test('home links into a project page', async ({ page }) => {
  await page.goto('/');
  await page.locator('.cards .card a').first().click();
  await expect(page).toHaveURL(/\/projects\/ouroboros\/$/);
});

for (const path of ['/projects/', '/projects/retro/']) {
  test(`${path} has no horizontal scroll at 360px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });
}
