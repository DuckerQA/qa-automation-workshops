import { Page, expect } from "@playwright/test";
import { User } from "../models/User";
import { LoginPage } from "../pages/LoginPage.ts";
import { CookieHelper } from "./CookieHelper";

export async function LoginHelper(page: Page, user: User) {

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.open(); 

    await CookieHelper(page);

    const emailInput = page.locator('input[data-qa="login-email"]');
    const passwordInput = page.locator('input[data-qa="login-password"]');
    const loginBtn = page.locator('button[data-qa="login-button"]');

    await emailInput.waitFor({ state: 'visible' });
    await passwordInput.waitFor({ state: 'visible' });

    await emailInput.fill(user.email);
    await passwordInput.fill(user.password);

    await loginBtn.click();

    await CookieHelper(page);
}