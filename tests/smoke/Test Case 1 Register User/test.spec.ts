import { expect } from "@playwright/test";
import { test } from "../../../src/fixtures/userFixture.ts";
import { SetupUser } from "../../setup/SetupRegister.ts";
import { HomePage } from "../../../src/pages/Home.page.ts";

test("Test Case 1: Register User @AT_01", async({ page, user}) => {
    SetupUser(page, user);
})

test.afterEach(async({page}) =>{
  const homePage:HomePage = new HomePage(page);
  homePage.deleteAccountButton.click();
  await expect(homePage.accountDeletedHeader).toBeVisible();
})