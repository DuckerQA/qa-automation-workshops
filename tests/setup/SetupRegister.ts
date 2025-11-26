import { Page, expect } from "@playwright/test";
import { User } from "../../src/models/User.ts";
import { SignUpPage } from "../../src/pages/SignUp.page.ts";

export async function SetupUser(page: Page, user: User){
    const signUpPage:SignUpPage = new SignUpPage(page)
    await signUpPage.open();

    await signUpPage.Register(user);

    await expect(signUpPage.accountCreatedHeader).toBeVisible();

    await signUpPage.continueAnchor.click();
}

