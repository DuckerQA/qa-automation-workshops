import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class RegisterPage extends BasePage {
  readonly url = "/register";
  readonly signupLoginLink = this.page.getByRole("link", {
    name: "Signup / Login",
  });
  readonly headerNewUserSignup = this.page.getByText("New User Signup!");
  readonly inputName = this.page.locator('[data-qa="signup-name"]');
  readonly inputEmail = this.page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address");

  readonly continueButton = this.page.getByRole("link", { name: "Continue" });

  constructor(page: Page) {
    super(page);
  }
}
// await page.getByRole("link", { name: "Signup / Login" }).click();
