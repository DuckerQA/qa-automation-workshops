import {test, expect} from '@playwright/test';

import { rejestracjaHelper } from '../helpers/rejestracja.helper';
import { sprawdzCiasteczkaHelper } from '../helpers/sprawdzCiasteczka.helper';
import { logowanieHelper } from '../helpers/logowanie.helper';
import { usunKontoHelper } from "../helpers/usunKonto.helper";

import Uzytkownik from "../data/daneTestowe.json";


test.beforeEach(async ({ page }) => {
  await rejestracjaHelper.rejestracja(page, Uzytkownik);
  await page.getByRole('link', { name: ' Logout' }).click();
});

test("Test Case 2: Login User with correct email and password", async({ page }) => {
    await page.goto("http://automationexercise.com/");
    
    const consentBtn = page.locator("p.fc-button-label", { hasText: "Consent" });
    if (await consentBtn.isVisible()) {
        await consentBtn.click();
    }

    expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();



    await logowanieHelper.zaloguj(page, Uzytkownik);

    await usunKontoHelper.usunKonto(page);

})