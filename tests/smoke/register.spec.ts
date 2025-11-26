import { expect, test } from '@playwright/test';

import {
  getRandomInitData,
  prepareRandomUserData,
} from '../../src/factories/user.factory';
import { UserInitModel, UserModel } from '../../src/models/user.model';
import { RegisterPage } from '../../src/pages/register.page';

test('register user with correct data @AUT_01-01', async ({ page }) => {
  //Arrange
  const registerPage = new RegisterPage(page);
  const initData: UserInitModel = getRandomInitData();
  const userData: UserModel = prepareRandomUserData();

  //Act
  await registerPage.goto();
  await registerPage.getTitle();
  await expect(page).toHaveURL(/.*automationexercise.com/);
  await registerPage.cookieHandler();

  await registerPage.signUpLoginButton.click();
  await expect(registerPage.headerNewUserSignup).toBeVisible();

  await registerPage.initAccountCreation(initData);
  await registerPage.completeRegistrationDetails(userData);

  await expect(registerPage.accountCreatedHeader).toBeVisible();
  await registerPage.continueButton.click();

  //Assert
  await expect(registerPage.loggedInAs(initData.name)).toBeVisible();
  await registerPage.deleteAccountButton.click();
  await expect(registerPage.accountDeletedHeader).toBeVisible();
  await registerPage.continueButton.click();
});
