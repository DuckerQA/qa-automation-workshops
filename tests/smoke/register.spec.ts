import { expect, test } from '@playwright/test';

import {
  generateUserContactInfo,
  generateUserSignupInfo,
} from '../../src/factories/userFactory';
import { RegisterPage } from '../../src/pages/register.page';

let userSignupInfo: ReturnType<typeof generateUserSignupInfo>;
let userContactInfo: ReturnType<typeof generateUserContactInfo>;

test.beforeEach(async () => {
  userSignupInfo = generateUserSignupInfo();
  userContactInfo = generateUserContactInfo();
});

test('Case 1: Register User @AUT_01', async ({ page }) => {
  //Arrange
  const registerPage = new RegisterPage(page);
  //Act
  await test.step('Open page and accept cookies', async () => {
    await registerPage.open();
    await registerPage.getTitle();
    await expect(page).toHaveURL(process.env.baseURL!);
    await registerPage.cookieHandler();
  });

  await test.step('Initiate account creation and verify header', async () => {
    await registerPage.signUpLoginButton.click();
    await expect(registerPage.headerNewUserSignup).toBeVisible();

    await registerPage.initAccountCreation(
      (await userSignupInfo).name,
      (await userSignupInfo).email,
    );
  });

  await test.step('Complete registration details', async () => {
    await registerPage.completeRegistrationDetails(
      (await userContactInfo).password,
      String((await userContactInfo).dateOfBirth.day),
      String((await userContactInfo).dateOfBirth.month),
      String((await userContactInfo).dateOfBirth.year),
      (await userContactInfo).firstName,
      (await userContactInfo).lastName,
      (await userContactInfo).address1,
      (await userContactInfo).country,
      (await userContactInfo).state,
      (await userContactInfo).city,
      (await userContactInfo).zipcode,
      (await userContactInfo).mobileNumber,
      (await userContactInfo).company || '',
      (await userContactInfo).address2 || '',
    );
  });

  await test.step('Verify account creation', async () => {
    await expect(registerPage.accountCreatedHeader).toBeVisible();
    await registerPage.continueButton.click();
    await expect(
      registerPage.loggedInAs((await userSignupInfo).name),
    ).toBeVisible();
  });

  //Assert
  await test.step('Delete account', async () => {
    await registerPage.deleteAccountButton.click();
    await expect(registerPage.accountDeletedHeader).toBeVisible();
    await registerPage.continueButton.click();
  });
});
