import { expect, test } from "@playwright/test";
import { RegisterPage } from "../../src/pages/register.page";
import { generateUserSignupInfo, generateUserContactInfo } from "../../src/factories/userFactory.ts";

test("Test Case 1: Register User @AUT_01-01", async ({ page }) => {
  //Arrange
  const registerPage = new RegisterPage(page);
  const userSignupData = generateUserSignupInfo();
  const UserContactInfo = generateUserContactInfo();

  //Act
  await registerPage.open();
  await registerPage.getTitle();
  await expect(page).toHaveURL(/.*automationexercise.com/);
  await registerPage.cookieHandler();

  await registerPage.signUpLoginButton.click();
  await expect(registerPage.headerNewUserSignup).toBeVisible();

  await registerPage.initAccountCreation((await userSignupData).name, (await userSignupData).email);
  await registerPage.completeRegistrationDetails(
    (await UserContactInfo).password,
    (await UserContactInfo).dateOfBirth.day.toString(),
    (await UserContactInfo).dateOfBirth.month.toString(),
    (await UserContactInfo).dateOfBirth.year.toString(),
    (await UserContactInfo).firstName,
    (await UserContactInfo).lastName,
    (await UserContactInfo).address1,
    (await UserContactInfo).country,
    (await UserContactInfo).state,
    (await UserContactInfo).city,
    (await UserContactInfo).zipcode,
    (await UserContactInfo).mobileNumber,
    (await UserContactInfo).company,
    (await UserContactInfo).address2,
  );

  await expect(registerPage.accountCreatedHeader).toBeVisible();
  await registerPage.continueButton.click();

  //Assert
  await expect(registerPage.loggedInAs((await userSignupData).name)).toBeVisible();
  await registerPage.deleteAccountButton.click();
  await expect(registerPage.accountDeletedHeader).toBeVisible();
  await registerPage.continueButton.click();
});
