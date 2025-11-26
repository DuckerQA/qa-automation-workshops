import { Page } from "@playwright/test";
import { RegisterHelper } from "../helpers/RegisterHelper";
import { User } from "../models/User";

export class SignUpPage{
    readonly page: Page;
    readonly url: string = "https://automationexercise.com/signup";

    constructor(page: Page){
        this.page = page;
    }

    async open(){
        this.page.goto(this.url);
    }
}