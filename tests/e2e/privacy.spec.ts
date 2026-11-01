import { expect, test } from '@playwright/test';

// Locally and in CI the site is built without ANALYTICS, so it makes no third-party request.
// On the deployed site (BASE_URL) the only allowed third-party host is GoatCounter (decision 0012).
test('only the site and GoatCounter are requested', async ({ page, baseURL }) => {
  const hosts = new Set<string>();
  page.on('request', (r) => { if (r.url().startsWith('http')) hosts.add(new URL(r.url()).host); });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const own = new URL(baseURL!).host;
  const allowed = process.env.BASE_URL ? new Set([own, 'gc.zgo.at', 'sathishkumar5115.goatcounter.com']) : new Set([own]);
  expect([...hosts].filter((h) => !allowed.has(h))).toEqual([]);
});

test('sets no cookies', async ({ page, context }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(await context.cookies()).toEqual([]);
});
