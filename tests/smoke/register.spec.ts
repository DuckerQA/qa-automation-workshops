import { expect, test } from '@playwright/test';

import dotenv from 'dotenv';

import { saveToEnv } from '../../src/factories/userFactory';
import { RegisterPage } from '../../src/pages/register.page';

test.beforeEach(async () => {
  await saveToEnv();
  dotenv.config();
});

test('Case 1: Register User @AUT_01', async ({ page }) => {
  //Arrange
  const registerPage = new RegisterPage(page);
  //Act
  await registerPage.open();
  await registerPage.getTitle();
  await expect(page).toHaveURL(/.*automationexercise.com/);
  await registerPage.cookieHandler();

  await registerPage.signUpLoginButton.click();
  await expect(registerPage.headerNewUserSignup).toBeVisible();

  await registerPage.initAccountCreation(
    process.env.USER_NAME! as string,
    process.env.USER_EMAIL! as string,
  );
  await registerPage.completeRegistrationDetails(
    process.env.USER_PASSWORD! as string,
    process.env.DOB_DAY as string,
    process.env.DOB_MONTH as string,
    process.env.DOB_YEAR as string,
    process.env.FIRST_NAME! as string,
    process.env.LAST_NAME! as string,
    process.env.ADDRESS1! as string,
    process.env.COUNTRY! as string,
    process.env.STATE! as string,
    process.env.CITY! as string,
    process.env.ZIPCODE! as string,
    process.env.MOBILE! as string,
    process.env.COMPANY as string,
    process.env.ADDRESS2 as string,
  );

  await expect(registerPage.accountCreatedHeader).toBeVisible();
  await registerPage.continueButton.click();

  //Assert
  await expect(
    registerPage.loggedInAs(process.env.USER_NAME! as string),
  ).toBeVisible();
  await registerPage.deleteAccountButton.click();
  await expect(registerPage.accountDeletedHeader).toBeVisible();
  await registerPage.continueButton.click();
});
