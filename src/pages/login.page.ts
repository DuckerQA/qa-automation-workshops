import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { UserSignupInfo } from "../models/user.model";

export class LoginPage extends BasePage{
    readonly url: string = "/login";

    readonly loginHeader = this.page.locator('h2:has-text("Login to your account")');
    readonly emailAddressInput = this.page.locator('input[data-qa="login-email"]');
    readonly passwordInput = this.page.locator('input[data-qa="login-password"]');
    readonly loginButton = this.page.locator('button[data-qa="login-button"]');
    readonly invalidDataParagraph = this.page.locator('p:has-text("Your email or password is incorrect!")');

    constructor(page: Page) {
        super(page);
    }

    async fillUserData(userEmail: string, userPassword: string){
        await this.emailAddressInput.fill(userEmail);
        await this.passwordInput.fill(userPassword);
        await this.loginButton.click();
    }
}