import { Page } from "@playwright/test";
import { User } from "../../src/models/User.ts";
import { RegisterHelper } from "../../src/helpers/RegisterHelper.ts";
import { LogoutHelper } from "../../src/helpers/LogoutHelper.ts";

export async function SetupUser(page: Page, user: User){
    await RegisterHelper(page, user);
    await LogoutHelper(page);
}

