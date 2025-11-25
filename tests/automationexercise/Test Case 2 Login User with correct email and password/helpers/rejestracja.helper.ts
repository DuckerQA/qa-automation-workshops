import { Page, expect } from "@playwright/test";
import { sprawdzCiasteczkaHelper } from "./sprawdzCiasteczka.helper";
import { Uzytkownik } from "../data/typUzytkownik.ts";

export const rejestracjaHelper = {
    async rejestracja(page: Page, uzytkownik: Uzytkownik){

      page.goto("https://automationexercise.com/login");

      const consentBtn = page.getByRole('button', { name: 'Consent' });
      await consentBtn.waitFor({ state: 'visible', timeout: 5000 });
      await consentBtn.click();


      await page.getByRole('textbox', { name: 'Name' }).fill(uzytkownik.name);
      await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(uzytkownik.email);
      
      await page.getByRole('button', { name: 'Signup' }).click();
      
      //tytul
      await page.getByRole('radio', { name: `${uzytkownik.title}.` }).check();
      //haslo
      await page.getByRole('textbox', { name: 'Password *' }).fill(uzytkownik.password);
      //data ur
      await page.selectOption("#days", { value: String(uzytkownik.dateOfBirth.day) });
      await page.selectOption("#months", { value: String(uzytkownik.dateOfBirth.month) });
      await page.selectOption("#years", { value: String(uzytkownik.dateOfBirth.year) });
      //newsletter
      await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
      //oferty specjalne
      await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
      //dane kontaktowe
      await page.getByRole('textbox', { name: 'First name *' }).fill(uzytkownik.firstName);
      await page.getByRole('textbox', { name: 'Last name *' }).fill(uzytkownik.lastName);
      await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(uzytkownik.address1);
      await page.getByRole('textbox', { name: 'Address 2' }).fill(uzytkownik.address2);
      await page.selectOption('select[data-qa="country"]', uzytkownik.country);
      await page.getByRole('textbox', { name: 'State *' }).fill(uzytkownik.state);
      await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(uzytkownik.city);
      await page.locator('#zipcode').fill(uzytkownik.zipcode);
      await page.getByRole('textbox', { name: 'Mobile Number *' }).fill(uzytkownik.mobileNumber);
      
      await page.getByRole('button', { name: 'Create Account' }).click();
      
      expect(page.getByText('Account Created!')).toBeVisible({timeout: 5000});

      await page.getByRole('link', { name: 'Continue' }).click();
    }
}