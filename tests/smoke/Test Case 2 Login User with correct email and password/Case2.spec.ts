import { test } from "../../../src/fixtures/userFixture.ts";
import { LoginHelper } from '../../../src/helpers/LoginHelper.ts';
import { SetupUser } from "../../setup/SetupUser.ts";

test.beforeEach(async({page, user}) => {
  await page.context().clearCookies();
  await page.context().clearPermissions();
  await page.context().clearCookies();
  await SetupUser(page, user);
})


test("Test Case 2: Login User with correct email and password", async({ page, user}) => {
    await LoginHelper(page, user);
})

test.afterEach(async({page}) =>{
  await page.locator('a:has-text("Delete Account")').click();
})