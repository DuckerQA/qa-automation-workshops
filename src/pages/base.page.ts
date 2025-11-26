import { Page } from "@playwright/test";

export class BasePage {
  url = "";

  constructor(protected page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async cookieHandler(): Promise<void> {
    await this.page.addLocatorHandler(
      this.page.locator(".fc-dialog-headline"),
      async () => {
        await this.page.getByRole("button", { name: "Consent" }).click();
      }
    );
  }
}
