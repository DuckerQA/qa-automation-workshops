import { Page, test } from "@playwright/test";

test('sprawdzam baseURL', async ({ page, baseURL }) => {
  console.log("BASE URL:", baseURL);
});