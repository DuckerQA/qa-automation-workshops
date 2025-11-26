import { Page } from "@playwright/test";

export class HomePage{
    readonly page: Page;
    readonly url: string = "https://automationexercise.com";

    constructor(page: Page){
        this.page = page;
    }

    async open(){
        await this.page.goto(this.url);
    }
}