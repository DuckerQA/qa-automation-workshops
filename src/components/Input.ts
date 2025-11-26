import { Page } from "@playwright/test";

export class Input{
    protected page: Page;
    protected selektor: string;

    constructor(page: Page, selektor: string){
        this.page = page;
        this.selektor = selektor;
    }

    async fill(wartosc: string){
        await this.page.fill(this.selektor, wartosc);
    }
    async getValue(){
        return await this.page.textContent(this.selektor);
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