import { expect, test } from '@playwright/test';

test('blog shows the empty state with links', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();
  await expect(page.getByText('No posts yet')).toBeVisible();
  await expect(page.locator('.empty').getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects/');
  await expect(page.locator('.empty').getByRole('link', { name: 'Now' })).toHaveAttribute('href', '/now/');
});

test('no post, tag or rss routes exist while there are no posts', async ({ request }) => {
  expect((await request.get('/rss.xml')).status()).toBe(404);
  expect((await request.get('/tags/anything/')).status()).toBe(404);
});

test('shelf lists tools and the later sections', async ({ page }) => {
  await page.goto('/shelf/');
  await expect(page.getByRole('heading', { level: 1, name: 'Shelf' })).toBeVisible();
  await expect(page.locator('.tool')).toHaveCount(7);
  await expect(page.getByText('LINKS · LATER')).toBeVisible();
  await expect(page.getByText('MUSIC · LATER')).toBeVisible();
});

test('now shows current items and earlier updates', async ({ page }) => {
  await page.goto('/now/');
  await expect(page.getByRole('heading', { level: 1, name: 'Now' })).toBeVisible();
  await expect(page.locator('.now-list .kicker')).toHaveText(['Building', 'Designing', 'Learning']);
  await expect(page.getByRole('heading', { name: 'EARLIER' })).toBeVisible();
});

test('unknown path serves the 404 page', async ({ page }) => {
  const res = await page.goto('/does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
});

test('sitemap and robots are served', async ({ request }) => {
  const sm = await request.get('/sitemap-index.xml');
  expect(sm.status()).toBe(200);
  expect(await sm.text()).toContain('sitemap-0.xml');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Sitemap: https://sathishkumar5115.github.io/sitemap-index.xml');
});

for (const path of ['/blog/', '/shelf/', '/now/', '/404.html']) {
  test(`${path} has no horizontal scroll at 360px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });
}
