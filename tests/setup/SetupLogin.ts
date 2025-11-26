import { Page, expect } from "@playwright/test";
import { User } from "../../src/models/User.ts";
import { LoginPage } from "../../src/pages/Login.page.ts";

export async function SetupUser(page: Page, user: User){
    const loginPage:LoginPage = new LoginPage(page)
    await loginPage.open();

    await loginPage.init(user);
}

