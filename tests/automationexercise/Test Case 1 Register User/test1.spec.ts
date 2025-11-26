import { Page, expect } from '@playwright/test';
import { test } from "../../../src/fixtures/userFixture.ts";

import { SetupUser } from "../../setup/SetupUser.ts";
import { CookieHelper } from "../../../src/helpers/CookieHelper.ts";
import { RegisterHelper } from '../../../src/helpers/RegisterHelper.ts';

test.beforeEach(async({page})=>{
    await CookieHelper(page);
})

test("Test Case 1: Register User", async({ page, user}) => {
    await CookieHelper(page);
    await RegisterHelper(page, user);
})

test.afterEach(async({page}) =>{
  await page.locator('a:has-text("Delete Account")').click();
})