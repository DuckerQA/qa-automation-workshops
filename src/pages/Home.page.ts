import { Page } from "@playwright/test";
import { Base } from "./Base.Page";

export class HomePage extends Base{
    readonly url: string = "/";

    constructor(page: Page){
        super(page);
    }
}