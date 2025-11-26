import { Input } from "./Input";

export class Radio extends Input{
    async check(){
        await this.page.check(this.selektor);
    }
}