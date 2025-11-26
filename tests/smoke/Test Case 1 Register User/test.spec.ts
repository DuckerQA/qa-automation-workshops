import { test } from "../../../src/fixtures/userFixture.ts";
import { RegisterHelper } from '../../../src/helpers/RegisterHelper.ts';

test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.context().clearPermissions();
    await page.context().clearCookies();
});

test("Test Case 1: Register User", async({ page, user}) => {
    await RegisterHelper(page, user);
})