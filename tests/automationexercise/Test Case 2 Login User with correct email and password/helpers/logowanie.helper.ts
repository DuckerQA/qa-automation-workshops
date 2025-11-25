import { Page, expect } from "@playwright/test";
import { Uzytkownik } from "../data/typUzytkownik";

export const logowanieHelper = {
    async zaloguj(page: Page, Uzytkownik: Uzytkownik){

        const consentBtn = page.locator("p.fc-button-label", { hasText: "Consent" });
        if (await consentBtn.isVisible()) {
            await consentBtn.click();
        }

        await page.getByRole('link', { name: ' Signup / Login' }).click();

        await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(Uzytkownik.email);
        await page.getByRole('textbox', { name: 'Password' }).fill(Uzytkownik.password);

        await page.getByRole('button', { name: 'Login' }).click();

        await expect(await page.getByText(`Logged in as ${Uzytkownik.name}`)).toBeVisible();
    }
}