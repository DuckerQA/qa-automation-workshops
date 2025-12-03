import { expect, test } from '@playwright/test';

import {
  generateUserContactInfo,
  generateUserSignupInfo,
} from '../../src/factories/userFactory';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';

let sharedSignup!: ReturnType<typeof generateUserSignupInfo>;
let sharedContact!: ReturnType<typeof generateUserContactInfo>;

test.beforeEach(async ({ page }) => {
  //Arrange
  const registerPage = new RegisterPage(page);
  sharedSignup = generateUserSignupInfo();
  sharedContact = generateUserContactInfo();
  //Act
  await registerPage.open();
  await registerPage.getTitle();
  await expect(page).toHaveURL(/.*automationexercise.com/);
  await registerPage.cookieHandler();

  await registerPage.signUpLoginButton.click();
  await expect(registerPage.headerNewUserSignup).toBeVisible();

  await registerPage.initAccountCreation(
    (await sharedSignup).name,
    (await sharedSignup).email,
  );
  await registerPage.completeRegistrationDetails(
    (await sharedContact).password,
    String((await sharedContact).dateOfBirth.day),
    String((await sharedContact).dateOfBirth.month),
    String((await sharedContact).dateOfBirth.year),
    (await sharedContact).firstName,
    (await sharedContact).lastName,
    (await sharedContact).address1,
    (await sharedContact).country,
    (await sharedContact).state,
    (await sharedContact).city,
    (await sharedContact).zipcode,
    (await sharedContact).mobileNumber,
    (await sharedContact).company || '',
    (await sharedContact).address2 || '',
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
  await test.step('Open page and accept cookies', async () => {
    await loginPage.open();
    await loginPage.cookieHandler();
    await expect(loginPage.loginHeader).toBeVisible();
  });

  await test.step('Fill user data and login', async () => {
    await loginPage.fillUserData(
      (await sharedSignup).email,
      (await sharedContact).password,
    );

    await expect(page).toHaveURL('/');
  });
});

test.afterEach(async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await expect(
    registerPage.loggedInAs((await sharedSignup).name),
  ).toBeVisible();
  await registerPage.deleteAccountButton.click();
  await expect(registerPage.accountDeletedHeader).toBeVisible();
  await registerPage.continueButton.click();
});
