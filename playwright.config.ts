import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  // BASE_URL points the suite at a deployed site instead of a local build.
  webServer: process.env.BASE_URL ? undefined : {
    command: 'npm run build && npm run preview -- --port 4321 --ignore-lock',
    url: 'http://localhost:4321/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: { baseURL: process.env.BASE_URL ?? 'http://localhost:4321' },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
