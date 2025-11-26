import { Page } from "@playwright/test";
import { Header } from "../components/Header.ts";

export async function VerifyCreation(page: Page) {
    return await page.locator('text=Account Created!').isVisible();
}