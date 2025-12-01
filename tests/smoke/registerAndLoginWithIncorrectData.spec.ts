import { expect, test } from '@playwright/test';

import dotenv from 'dotenv';

import { saveToEnv } from '../../src/factories/userFactory';
import { LoginPage } from '../../src/pages/login.page';

test.beforeEach(async () => {
  await saveToEnv();
  dotenv.config();
});

test('Case 3: Login User with incorrect email and password @AUT_03', async ({
  page,
}) => {
  //Arrange
  const loginPage: LoginPage = new LoginPage(page);

  //Act
  await loginPage.open();

  await loginPage.cookieHandler();

  await expect(loginPage.loginHeader).toBeVisible();

  await loginPage.fillUserData(
    (process.env.INVALID_USER_EMAIL as string) || 'invalidUserEmail@email.net',
    (process.env.INVALID_USER_PASSWORD as string) || 'invalidUserPassword123',
  );

  await expect(loginPage.invalidDataParagraph).toBeVisible();
});
