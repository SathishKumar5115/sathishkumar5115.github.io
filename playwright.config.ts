import { defineConfig, devices } from "@playwright/test";

// E2E tests run against the built site (`astro preview`), like production.
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 1 : 0,
  reporter: process.env["CI"] ? "github" : "list",
  use: { baseURL: "http://localhost:4321" },
  webServer: {
    // --ignore-lock keeps astro preview in the foreground (it backgrounds itself otherwise).
    command: "npx astro preview --port 4321 --ignore-lock",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env["CI"],
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
