import { Page } from "@playwright/test";

export class Header{
    private page: Page;
    private selektor: string;

    constructor(page: Page, poziomLubSelektor: number | string = 1, tekst?: string){
        this.page = page;
        if(typeof poziomLubSelektor === "number"){
            this.selektor = tekst ? `h${poziomLubSelektor}:has-text("${tekst}")` : `h${poziomLubSelektor}`;
        }else{
            this.selektor = poziomLubSelektor;
        }
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