import { Page } from "@playwright/test";

export class Base{
    constructor(protected page: Page, protected path: string = "/") {}

    async open(): Promise<void> {
        await this.page.goto(this.path);
    }

    async cookieHandler(): Promise<void>{
        await this.page.addLocatorHandler(this.page.locator(".fc-dialog-headline"), async()=>{
            await this.page.getByRole("button", {name: "Consent"}).click();
        })
    }
}