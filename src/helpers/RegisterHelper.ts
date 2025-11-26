import { Page, expect } from "@playwright/test";
import { User } from "../models/User";
import { SignUpPage } from "../pages/SignUp.page.ts";
export async function RegisterHelper(page: Page, user: User){

    console.log("USER:", user);
    
    const signUpPage:SignUpPage = new SignUpPage(page)
    signUpPage.open();
    await signUpPage.cookieHandler();

    await signUpPage.init(user);
    await signUpPage.fillContact(user);

    expect(signUpPage.accountCreatedHeader).toBeVisible();

    await signUpPage.continueAnchor.click();
}
