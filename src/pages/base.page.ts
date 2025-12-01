import { Page } from "@playwright/test";

export class BasePage {
  readonly url: string = "";
  constructor(protected page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(this.url);
  }

  async getTitle(): Promise<string> {
    await this.page.waitForLoadState("load");
    return this.page.title();
  }

  async waitForPageToLoad(): Promise<void> {
    await this.page.waitForURL(this.url);
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
