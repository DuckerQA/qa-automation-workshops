import { Page } from "@playwright/test";

export class Select {
    private page: Page;
    private selector: string;
    constructor(page: Page, selector: string) {
      this.page = page;
      this.selector = selector;
    }
  
    locator() {
      return this.page.locator(this.selector);
    }
  
    async selectOption(value: string | { label?: string; value?: string }) {
      await this.locator().selectOption(value);
    }
}