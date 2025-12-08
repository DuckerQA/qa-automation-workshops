import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  expect: {
    timeout: 5000,
  },
  timeout: 30000,

  reporter: [
    [
      'playwright-smart-reporter',
      {
        outputFile: 'smart-report.html',
        historyFile: 'test-history.json',
        maxHistoryRuns: 10,
        performanceThreshold: 0.2,
        slackWebhook: process.env.SLACK_URL,
        teamsWebhook: process.env.TEAMS_URL,
      },
    ],
  ],

  use: {
    trace: 'on',
    baseURL: process.env.BASE_URL,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
