import { Page } from "@playwright/test";
import { Select } from "./Select";

export class Option {
  constructor(private select: Select, private value: string) {}

  async getValue() {
    return await this.select.locator().textContent();
  }

  async choose() {
    await this.select.selectOption(this.value);
  }
}
