import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  projects: [
    {
        name: 'TC2_Chrome',
        testDir: 'tests/automationexercise/Test Case 2 Login User with correct email and password/tests',
        use: { ...devices['Desktop Chrome'], headless: false }
    },
    {
        name: 'TC2_Firefox',
        testDir: 'tests/automationexercise/Test Case 2 Login User with correct email and password/tests',
        use: { ...devices['Desktop Firefox'], headless: false }
    },
    {
        name: 'TC2_Safari',
        testDir: 'tests/automationexercise/Test Case 2 Login User with correct email and password/tests',
        use: { ...devices['Desktop Safari'], headless: false }
    }
  ]
});
