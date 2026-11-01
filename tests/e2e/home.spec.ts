import { expect, test } from '@playwright/test';

test('home shows the pitch, Now card, featured projects and shelf', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Learning to build software that works.');
  await expect(page.getByText('AI Software Engineer Intern @ Intel')).toHaveCount(1);
  await expect(page.getByRole('complementary', { name: 'Now' })).toBeVisible();
  await expect(page.locator('.cards .card')).toHaveCount(3);
  await expect(page.getByRole('heading', { name: 'Shelf' })).toBeVisible();
});

for (const width of [360, 768, 1280]) {
  test(`home has no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });
}
