import { Page } from "@playwright/test";
import { User } from "../models/User.ts";

export class LoginPage{
    readonly page: Page;
    readonly url: string = "https://automationexercise.com/login";

    constructor(page: Page){
        this.page = page;
    }

    async open(){
        await this.page.goto(this.url);
    }
}