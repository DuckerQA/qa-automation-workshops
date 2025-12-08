import { expect, test } from '@playwright/test';

import dotenv from 'dotenv';

import {
  generateUserContactInfo,
  generateUserSignupInfo,
} from '../../src/factories/userFactory';
import { RegisterPage } from '../../src/pages/register.page';

dotenv.config();

let userSignupInfo: ReturnType<typeof generateUserSignupInfo>;
let userContactInfo: ReturnType<typeof generateUserContactInfo>;

test.beforeEach(async () => {
  userSignupInfo = generateUserSignupInfo();
  userContactInfo = generateUserContactInfo();
});

test('Case 1: Register User @AUT_01', async ({ page }) => {
  //Arrange
  const registerPage = new RegisterPage(page);
  const signupData = await userSignupInfo;
  const contactData = await userContactInfo;
  //Act
  await test.step('Open page and accept cookies', async () => {
    await registerPage.open();
    await registerPage.getTitle();
    await expect(page).toHaveURL(process.env.BASE_URL!);
    await registerPage.cookieHandler();
  });

  await test.step('Initiate account creation and verify header', async () => {
    await registerPage.signUpLoginButton.click();
    await expect(registerPage.headerNewUserSignup).toBeVisible();

    await registerPage.initAccountCreation(signupData);
  });

  await test.step('Complete registration details', async () => {
    await registerPage.completeRegistrationDetails(contactData);
  });

  await test.step('Verify account creation', async () => {
    await expect(registerPage.accountCreatedHeader).toBeVisible();
    await registerPage.continueButton.click();
    await expect(registerPage.loggedInAs(signupData)).toBeVisible();
  });

  //Assert
  await test.step('Delete account', async () => {
    await registerPage.deleteAccountButton.click();
    await expect(registerPage.accountDeletedHeader).toBeVisible();
    await registerPage.continueButton.click();
  });
});
