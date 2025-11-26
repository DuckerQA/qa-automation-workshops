import { Page, test } from "@playwright/test";

test('sprawdzam baseURL @AT_BASEURL', async ({ page, baseURL }) => {
  console.log("BASE URL:", baseURL);
});