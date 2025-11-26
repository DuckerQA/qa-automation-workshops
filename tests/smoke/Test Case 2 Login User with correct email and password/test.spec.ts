import { expect } from "@playwright/test";
import { test } from "../../../src/fixtures/userFixture.ts";
import { LoginPage } from "../../../src/pages/Login.page.ts";
import { HomePage } from "../../../src/pages/Home.page.ts";
import { SetupUser } from "../../setup/SetupRegister.ts";


test.beforeEach(async({page, user}) => {
  const homePage:HomePage = new HomePage(page);
  await SetupUser(page, user);
  await homePage.logOut();
})


test("Test Case 2: Login User with correct email and password @AT_02", async({ page, user}) => {
    const loginPage:LoginPage = new LoginPage(page);
    loginPage.init(user);
})

test.afterEach(async({page}) =>{
  const homePage:HomePage = new HomePage(page);
  homePage.deleteAccountButton.click();
  await expect(homePage.accountDeletedHeader).toBeVisible();
})