import { Page } from "@playwright/test";
import { Base } from "./Base.Page.ts";

export class LoginPage extends Base{
    readonly url: string = "/login";

    constructor(page: Page){
        super(page);
    }
}