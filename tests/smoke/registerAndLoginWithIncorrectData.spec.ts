import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { generateUserContactInfo, generateUserSignupInfo } from '../../src/factories/userFactory';

test('Test Case 3: Login User with incorrect email and password @AUT_01-03', async ({ page }) => {
  //Arrange
  const loginPage: LoginPage = new LoginPage(page);
  const invalidUserSignupData = generateUserSignupInfo();
  const invalidUserContactInfo = generateUserContactInfo();

  //Act
  await loginPage.open();

  await loginPage.cookieHandler();

  await expect(loginPage.loginHeader).toBeVisible();

  await loginPage.fillUserData((await invalidUserSignupData).email, (await invalidUserContactInfo).password);

  await expect(loginPage.invalidDataParagraph).toBeVisible();
});