import { expect, test } from '@playwright/test';

import {
  generateUserContactInfo,
  generateUserSignupInfo,
} from '../../src/factories/userFactory';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';

let sharedSignup!: Awaited<ReturnType<typeof generateUserSignupInfo>>;
let sharedContact!: Awaited<ReturnType<typeof generateUserContactInfo>>;

test.beforeEach(async ({ page }) => {
  //Arrange
  const registerPage = new RegisterPage(page);
  sharedSignup = await generateUserSignupInfo();
  sharedContact = await generateUserContactInfo();
  //Act
  await registerPage.open();
  await registerPage.getTitle();
  await expect(page).toHaveURL(/.*automationexercise.com/);
  await registerPage.cookieHandler();

  await registerPage.signUpLoginButton.click();
  await expect(registerPage.headerNewUserSignup).toBeVisible();

  await registerPage.initAccountCreation(sharedSignup);
  await registerPage.completeRegistrationDetails(sharedContact);

  await expect(registerPage.accountCreatedHeader).toBeVisible();
  await registerPage.continueButton.click();

  registerPage.logOut();
});

test('Case 2: Login User with correct email and password @AUT_02', async ({
  page,
}) => {
  //Arrange
  const loginPage: LoginPage = new LoginPage(page);
  const signupData = await sharedSignup;
  const contactData = await sharedContact;

  //Act
  await test.step('Open page and accept cookies', async () => {
    await loginPage.open();
    await loginPage.cookieHandler();
    await expect(loginPage.loginHeader).toBeVisible();
  });

  await test.step('Fill user data and login', async () => {
    await loginPage.fillUserData(signupData.email, contactData.password);

    await expect(page).toHaveURL('/');
  });
});

test.afterEach(async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const signupData = await sharedSignup;
  await expect(registerPage.loggedInAs(signupData)).toBeVisible();
  await registerPage.deleteAccountButton.click();
  await expect(registerPage.accountDeletedHeader).toBeVisible();
  await registerPage.continueButton.click();
});
