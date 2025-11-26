import { Page } from "@playwright/test";
import { Base } from "./Base.Page";
import { User } from "../models/User.ts";

export class SignUpPage extends Base{
    constructor(page: Page) {
        super(page, "/login");
    }

    // INIT
    async init(user: User): Promise<void>{
        await this.nameInput.fill(user.name);
        await this.emailInput.fill(user.email);
        await this.signUpButton.click();
    }

    // Fill contact info
    async fillContact(user: User): Promise<void>{
        if (user.title === "Mr") {
            await this.mrTitleRadio.check();
        } else {
            await this.mrsTitleRadio.check();
        }

        this.passwordInput.fill(user.password);

        await this.daySelect.selectOption(user.dateOfBirth.day.toString());
        await this.monthSelect.selectOption(user.dateOfBirth.month.toString());
        await this.yearSelect.selectOption(user.dateOfBirth.year.toString());

        if (user.newsletter) {
            await this.newsletterCheckbox.check();
        }

        if (user.optin) {
            await this.optinCheckbox.check();
        }

        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.company.fill(user.company ?? "-");
        await this.address.fill(user.address1);
        await this.address2.fill(user.address2 ?? "-");

        await this.country.selectOption(user.country);
        await this.state.fill(user.state);
        await this.city.fill(user.city);
        await this.zipCode.fill(user.zipcode);
        await this.mobileNumber.fill(user.mobileNumber);

        await this.createAccountButton.click();
    }

    //register
    async Register(user: User){
        await this.cookieHandler();
        
        await this.init(user);
        await this.fillContact(user);
    }

    //verification
    get accountCreatedHeader() {
        return this.page.locator('[data-qa="account-created"]');
    }

    //input
    //[type="text/password"]
    readonly nameInput = this.page.locator('input[data-qa="signup-name"]');
    readonly emailInput = this.page.locator('input[data-qa="signup-email"]');
    readonly passwordInput = this.page.locator('input[data-qa="password"]');
    readonly firstName = this.page.locator('[data-qa="first_name"]');
    readonly lastName = this.page.locator('[data-qa="last_name"]');
    readonly company = this.page.locator('[data-qa="company"]');
    readonly address = this.page.locator('[data-qa="address"]');
    readonly address2 = this.page.locator('[data-qa="address2"]');
    readonly country = this.page.locator('[data-qa="country"]');
    readonly state = this.page.locator('[data-qa="state"]');
    readonly city = this.page.locator('[data-qa="city"]');
    readonly zipCode = this.page.locator('[data-qa="zipcode"]');
    readonly mobileNumber = this.page.locator('[data-qa="mobile_number"]');
    //[type="radio"]
    readonly mrTitleRadio = this.page.locator('input[name="title"][value="Mr"]');
    readonly mrsTitleRadio = this.page.locator('input[name="title"][value="Mrs"]');
    //[type="checkbox"]
    readonly newsletterCheckbox = this.page.locator('#newsletter');
    readonly optinCheckbox = this.page.locator('#optin');

    //select
    readonly daySelect = this.page.locator('[data-qa="days"]');
    readonly monthSelect = this.page.locator('[data-qa="months"]');
    readonly yearSelect = this.page.locator('[data-qa="years"]');

    //button
    readonly signUpButton = this.page.locator('button[data-qa="signup-button"]');
    readonly createAccountButton = this.page.locator('button[data-qa="create-account"]');
    readonly continueAnchor = this.page.locator('a[data-qa="continue-button"]');
}