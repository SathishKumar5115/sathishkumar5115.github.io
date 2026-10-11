import { defineConfig, devices } from "@playwright/test";

// E2E tests for the blog with fixture posts (M4). Runs against the test-only build in dist-blog/
// (`BLOG_FIXTURES=1 npm run build`), never the deployed site.
export default defineConfig({
  testDir: "tests/e2e-blog",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 1 : 0,
  reporter: process.env["CI"] ? "github" : "list",
  use: { baseURL: "http://localhost:4322" },
  webServer: {
    command: "npx astro preview --port 4322 --ignore-lock",
    url: "http://localhost:4322",
    env: { BLOG_FIXTURES: "1" },
    reuseExistingServer: !process.env["CI"],
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
