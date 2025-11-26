import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  expect: {
    timeout: 5000,
  },
  timeout: 30000,
  retries: 0,
  reporter: "html",
  use: {
    trace: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
