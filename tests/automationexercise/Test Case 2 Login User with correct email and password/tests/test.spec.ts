import { Page, expect } from '@playwright/test';
import { test } from "../../../../src/fixtures/userFixture.ts";

import { HomePage } from "../../../../src/pages/HomePage.ts";
import { User } from "../../../../src/models/User.ts";
import { SetupUser } from "../../../setup/SetupUser.ts";
import { CookieHelper } from "../../../../src/helpers/CookieHelper.ts";
import { LoginHelper } from '../../../../src/helpers/LoginHelper.ts';


test.beforeEach(async({page, user}) => {
  await SetupUser(page, user);
})

test("Test Case 2: Login User with correct email and password", async({ page, user}) => {
    await CookieHelper(page);
    await LoginHelper(page, user);
})

test.afterEach(async({page}) =>{
  await page.locator('a:has-text("Delete Account")').click();
})