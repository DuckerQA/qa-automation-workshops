import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: "https://automationexercise.com",
  },
});