import { Page, expect } from "@playwright/test";
import { User } from "../models/User";

export async function VerifyLogin(page: Page, user: User) {
    const anchor = page.locator('a', { hasText: 'Logged in as' });

    await expect(anchor).toBeVisible();

    const text = await anchor.textContent();

    if (!text) {
        throw new Error('Nie udało się pobrać tekstu z elementu logowania.');
    }

    const expected = user.name;
    if (!text.includes(expected)) {
        throw new Error(`Zalogowany użytkownik nie pasuje. Oczekiwano: "${expected}", otrzymano: "${text}"`);
    }

    expect(text).toContain(expected);
}