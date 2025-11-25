import { Page, expect} from "@playwright/test";

export const usunKontoHelper = {
    async usunKonto(page: Page){
        await page.getByRole('link', { name: ' Delete Account' }).click();
        expect(await page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    }
}