import { Page } from "@playwright/test";

export class Button{
    private page: Page;
    private selektor: string;

    constructor(page: Page, selektor: string){
        this.page = page;
        this.selektor = selektor;
    }

    async click(){
        await this.page.click(this.selektor);
    }
    async getText(){
        await this.page.textContent(this.selektor);
    }
    async isVisible(){
        return await this.page.isVisible(this.selektor);
    }
}