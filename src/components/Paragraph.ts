import { Page } from "@playwright/test";

export class Paragraph{
    private page: Page;
    private selektor: string;

    constructor(page: Page, selektor: string, tekst?: string){
        this.page = page;
        this.selektor = tekst ? `p:has-text("${tekst}")` : selektor;
    }

    async click(){
        await this.page.click(this.selektor);
    }
    async getText(){
        return await this.page.textContent(this.selektor);
    }
    async isVisible(){
        return await this.page.isVisible(this.selektor);
    }
}