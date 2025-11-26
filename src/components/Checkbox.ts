import { Input } from "./Input";

export class Checkbox extends Input{
    async check(){
        await this.page.check(this.selektor);
    }

    async uncheck(){
        await this.page.uncheck(this.selektor);
    }
}