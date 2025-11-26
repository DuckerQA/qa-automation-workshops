import { expect } from "@playwright/test";
import { test } from "../../../src/fixtures/userFixture.ts";
import { LoginUser } from "../../setup/SetupLogin.ts";
import { HomePage } from "../../../src/pages/Home.page.ts";
import { SetupUser } from "../../setup/SetupRegister.ts";

test.beforeEach(async({page, user})=>{
    await SetupUser(page, user);
})

test("Test Case 4: Logout User @AT_04", async({ page, user }) => {
    const homePage:HomePage = new HomePage(page);

    await homePage.logOut();
    homePage.open();

    await expect(page).toHaveTitle("Automation Exercise");
})

test.afterEach(async({page, user}) => {
    LoginUser(page, user);

    const homePage:HomePage = new HomePage(page);
    await homePage.deleteAccountButton.click();
    await expect(homePage.accountDeletedHeader).toBeVisible();
})