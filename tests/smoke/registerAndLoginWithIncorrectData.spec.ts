import { expect, test } from '@playwright/test';

import {
  generateUserContactInfo,
  generateUserSignupInfo,
} from '../../src/factories/userFactory';
import { LoginPage } from '../../src/pages/login.page';

test('Case 3: Login User with incorrect email and password @AUT_03', async ({
  page,
}) => {
  //Arrange
  const loginPage: LoginPage = new LoginPage(page);
  const userSignupInfo = generateUserSignupInfo();
  const userContactInfo = generateUserContactInfo();

  //Act
  await test.step('Open page and accept cookies', async () => {
    await loginPage.open();
    await loginPage.cookieHandler();
  });

  await test.step('Verify login header is visible', async () => {
    await expect(loginPage.loginHeader).toBeVisible();
  });

  await test.step('Fill user data with incorrect credentials', async () => {
    await loginPage.fillUserData(
      (await userSignupInfo).email,
      (await userContactInfo).password,
    );
  });

  await test.step('Verify invalid data paragraph is visible', async () => {
    await expect(loginPage.invalidDataParagraph).toBeVisible();
  });
});
