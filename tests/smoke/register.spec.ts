import { expect, test } from '@playwright/test';

test('register user with correct data @KAC_01_01', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  await page.addLocatorHandler(
    page.locator('.fc-dialog-headline'),
    async () => {
      await page.getByRole('button', { name: 'Consent' }).click();
    },
  );

  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await expect(
    page.getByRole('heading', { name: 'New User Signup!' }),
  ).toBeVisible();
  await page.getByRole('textbox', { name: 'Name' }).fill('Potato');
  await page
    .locator('form')
    .filter({ hasText: 'Signup' })
    .getByPlaceholder('Email Address')
    .fill('test@test123SADASDas.com');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByRole('textbox', { name: 'Password *' }).fill('test1');
  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('2');
  await page.locator('#years').selectOption('2003');
  await page
    .getByRole('checkbox', { name: 'Sign up for our newsletter!' })
    .check();
  await page
    .getByRole('checkbox', { name: 'Receive special offers from' })
    .check();
  await page.getByRole('textbox', { name: 'First name *' }).fill('Name');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('LastName');
  await page
    .getByRole('textbox', { name: 'Company', exact: true })
    .fill('Company');
  await page
    .getByRole('textbox', { name: 'Address * (Street address, P.' })
    .fill('Adress, 12 Orla');
  await page.getByRole('textbox', { name: 'Address 2' }).fill('Adres 2 ');
  await page.getByLabel('Country *').selectOption('Australia');
  await page.getByRole('textbox', { name: 'State *' }).fill('London');
  await page.getByRole('textbox', { name: 'State *' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'State *' }).fill('State');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('London');
  await page.locator('#zipcode').fill('12444');
  await page
    .getByRole('textbox', { name: 'Mobile Number *' })
    .fill('700300500');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page.getByText('Logged in as Potato')).toBeVisible();
  await page.getByRole('link', { name: ' Delete Account' }).click();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
});
