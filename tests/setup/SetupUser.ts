import { Page } from "@playwright/test";
import { User } from "../../src/models/User.ts";
import { RegisterHelper } from "../../src/helpers/RegisterHelper.ts";
import { CookieHelper } from "../../src/helpers/CookieHelper.ts";
import { LogoutHelper } from "../../src/helpers/LogoutHelper.ts";

export async function SetupUser(page: Page, user: User){
    await CookieHelper(page);
    await RegisterHelper(page, user);
    await LogoutHelper(page);
}

