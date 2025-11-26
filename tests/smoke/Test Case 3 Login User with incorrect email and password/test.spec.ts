import { expect } from "@playwright/test";
import { test } from "../../../src/fixtures/userFixture.ts";
import { LoginPage } from "../../../src/pages/Login.page.ts";
import { LoginUser } from "../../setup/SetupLogin.ts";

test("Test Case 3: Login User with incorrect email and password @AT_03", async({ page, user }) => {
    LoginUser(page, user);
    const loginPage:LoginPage = new LoginPage(page);

    await expect(loginPage.failureParagraph).toBeVisible();
})
