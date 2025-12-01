import { expect, test } from '@playwright/test';

import dotenv from 'dotenv';

import { saveToEnv } from '../../src/factories/userFactory';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';

test.beforeEach(async ({ page }) => {
  //Arrange
  const registerPage = new RegisterPage(page);
  await saveToEnv();
  dotenv.config();
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

  registerPage.logOut();
});

test('Case 2: Login User with correct email and password @AUT_02', async ({
  page,
}) => {
  //Arrange
  const loginPage: LoginPage = new LoginPage(page);

  //Act
  await loginPage.open();
  await expect(loginPage.loginHeader).toBeVisible();

  await loginPage.fillUserData(
    process.env.USER_EMAIL! as string,
    process.env.USER_PASSWORD! as string,
  );

  await expect(page).toHaveURL('/');
});

test.afterEach(async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await expect(
    registerPage.loggedInAs(process.env.USER_NAME! as string),
  ).toBeVisible();
  await registerPage.deleteAccountButton.click();
  await expect(registerPage.accountDeletedHeader).toBeVisible();
  await registerPage.continueButton.click();
});
