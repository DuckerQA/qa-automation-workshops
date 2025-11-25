import { test, expect } from '@playwright/test';

class Osoba {
    email: string = "";
    haslo: string = "";
    imie: string = "";
    nazwisko: string = "";
    firma: string = "";
    adres: string = "";
    adres2: string = "";
    kraj: string = "";
    stan: string = "";
    miasto: string = "";
    kodPocztowy: string = "";
    numerTelefonu: string = "";

    constructor() {
        this.email = `${this.randomString(6)}@test.com`;
        this.haslo = this.randomString(9);
        this.imie = this.randomString(10);
        this.nazwisko = this.randomString(10);
        this.firma = this.randomString(15);
        this.adres = `${this.randomString(15)} St.`;
        this.adres2 = `${this.randomString(15)} Ave.`;
        this.kraj = this.randomFromArray(['India', 'United States', 'Canada', 'Australia', 'Izrael', 'New Zealand', 'Singapore']);
        this.stan = this.randomString(6);
        this.miasto = this.randomString(10);
        this.kodPocztowy = this.randomNumber(5);
        this.numerTelefonu = this.randomNumber(9);
    }

    private randomString(length: number): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    private randomNumber(length: number): string {
        return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
    }

    private randomFromArray(arr: string[]): string {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}

test("Test Case 1: Register User", async ({ page }) => {

    

    const link = "https://automationexercise.com";

    const obiekt = new Osoba();

    await page.goto(link);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(link, { timeout: 5000 });

    const consentBtn = page.locator("p.fc-button-label", { hasText: "Consent" });
    if (await consentBtn.isVisible()) {
        await consentBtn.click();
    }
    await page.locator("a[href='/login']").click();
    await expect(page.locator("text=New User Signup!")).toBeVisible();

    await page.locator("input[name='name']").fill(obiekt.imie);
    await page.locator("input[name='email'][data-qa='signup-email']").fill(obiekt.email);
    await page.locator('button[data-qa="signup-button"]').click();

    await expect(page.locator('text=Enter Account Information')).toBeVisible();
    await page.locator('input[name="title"][value="Mr"]').check();

    await page.locator('input[name="password"]').fill(obiekt.haslo);

    const dzisiejszaData = new Date();
    await page.selectOption('select[data-qa="days"]', `${dzisiejszaData.getDate()}`);
    await page.selectOption('select[data-qa="months"]', `${dzisiejszaData.getMonth() + 1}`);
    await page.selectOption('select[data-qa="years"]', `${dzisiejszaData.getFullYear() - 25}`);

    await page.locator('input[type="checkbox"][id="newsletter"]').check();
    await page.locator('input[type="checkbox"][id="optin"]').check();

    await page.locator('input[data-qa="first_name"]').fill(obiekt.imie);
    await page.locator('input[data-qa="last_name"]').fill(obiekt.nazwisko);
    await page.locator('input[data-qa="company"]').fill(obiekt.firma);
    await page.locator('input[data-qa="address"]').fill(obiekt.adres);
    await page.locator('input[data-qa="address2"]').fill(obiekt.adres2);

    await page.locator('input[data-qa="state"]').fill(obiekt.stan);
    await page.locator('input[data-qa="city"]').fill(obiekt.miasto);
    await page.locator('input[data-qa="zipcode"]').fill(obiekt.kodPocztowy);
    await page.locator('input[data-qa="mobile_number"]').fill(obiekt.numerTelefonu);

    await page.locator('button[data-qa="create-account"]').click();
    await expect(page.locator('text=Account Created!')).toBeVisible();

    await page.locator('a[data-qa="continue-button"]').click();

    await expect(page.locator(`text=Logged in as ${obiekt.imie}`)).toBeVisible();

    await page.locator('a[href="/delete_account"]').click();
    await expect(page.locator('text=Account Deleted!')).toBeVisible();
    await page.locator('a[data-qa="continue-button"]').click();
});
