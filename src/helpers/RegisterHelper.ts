import { Browser, BrowserContext, Page, expect } from "@playwright/test";
import { test } from "@playwright/test";
import { User } from "../models/User";
import { SignUpPage } from "../pages/SignUpPage.ts";
import { Input } from "../components/Input.ts";
import { Option } from "../components/Option.ts";
import { Select } from "../components/Select.ts";
import { Checkbox } from "../components/Checkbox.ts";
import { Radio } from "../components/Radio.ts";
import { Button } from "../components/Button.ts";
import { VerifyCreation } from "../utils/AccountCreationUtil.ts";
import { CookieHelper } from "./CookieHelper.ts";
import { Anchor } from "../components/Anchor.ts";

export async function RegisterHelper(page: Page, user: User){

    console.log("USER:", user);
    await page.goto("https://automationexercise.com/login");

    await CookieHelper(page);

    await page.locator('input[data-qa="signup-name"]').fill(user.name);
    await page.locator('input[data-qa="signup-email"]').fill(user.email);

    await page.locator('button[data-qa="signup-button"]').click();

    const submit = new Button(page, 'button[data-qa="create-account"]');
    await submit.click();

    if (user.title === "Mr") {
        await page.locator('input[name="title"][value="Mr"]').check();
    } else {
        await page.locator('input[name="title"][value="Mrs"]').check();
    }

    await page.locator('[data-qa="name"]').fill(user.name);

    await page.locator('[data-qa="password"]').fill(user.password);

    await page.locator('[data-qa="days"]').selectOption(user.dateOfBirth.day.toString());
    await page.locator('[data-qa="months"]').selectOption(user.dateOfBirth.month.toString());
    await page.locator('[data-qa="years"]').selectOption(user.dateOfBirth.year.toString());

    if (user.newsletter) {
        await page.locator('#newsletter').check();
    }

    if (user.optin) {
        await page.locator('#optin').check();
    }

    await page.locator('[data-qa="first_name"]').fill(user.firstName);
    await page.locator('[data-qa="last_name"]').fill(user.lastName);
    await page.locator('[data-qa="company"]').fill(user.company ?? "-");
    await page.locator('[data-qa="address"]').fill(user.address1);
    await page.locator('[data-qa="address2"]').fill(user.address2 ?? "-");

    await page.locator('[data-qa="country"]').selectOption(user.country);
    await page.locator('[data-qa="state"]').fill(user.state);
    await page.locator('[data-qa="city"]').fill(user.city);
    await page.locator('[data-qa="zipcode"]').fill(user.zipcode);
    await page.locator('[data-qa="mobile_number"]').fill(user.mobileNumber);

    await page.locator('[data-qa="create-account"]').click();

    expect(await VerifyCreation(page)).toBe(true);

    const continueAnchor = new Anchor(page, 'a[data-qa="continue-button"]');
    continueAnchor.click();
}
