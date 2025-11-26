import { Page } from "@playwright/test";
import { Base } from "./Base.Page.ts";
import { User } from "../models/User.ts";

export class LoginPage extends Base{
    constructor(page: Page) {
        super(page, "/login");
    }

    readonly emailInput = this.page.locator('input[data-qa="login-email"]')
    readonly passwordInput = this.page.locator('input[data-qa="login-password"]');
    readonly loginBtn = this.page.locator('button[data-qa="login-button"]');

    //failure
    readonly failureParagraph = this.page.locator('p:has-text("Your email or password is incorrect!")');

    async init(user: User){
        await this.open();
        await this.cookieHandler();

        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);

        await this.loginBtn.click();
    }
}