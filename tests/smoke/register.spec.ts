import { expect, test } from "@playwright/test";
import { RegisterPage } from "../../src/pages/register.page";

test("register user with correct data @AUT_01-01", async ({ page }) => {
  //Arrange
  const registerPage = new RegisterPage(page);
  const initData = {
    name: "maciektestuser",
    email: "maciektestuser@test.com",
  };
  const userData = {
    password: "TestPassword123!",
    day: "10",
    month: "May",
    year: "1990",
    firstName: "Maciek",
    lastName: "Testowy",
    company: "Test Company",
    address1: "123 Test St",
    address2: "Apt 4",
    country: "Canada",
    state: "Test State",
    city: "Test City",
    zipcode: "T3S 1T2",
    mobileNumber: "+1234567890",
  };

  //Act
  await registerPage.goto();
  await registerPage.getTitle();
  await expect(page).toHaveURL(/.*automationexercise.com/);
  await registerPage.cookieHandler();

  await registerPage.signUpLoginButton.click();
  await expect(registerPage.headerNewUserSignup).toBeVisible();

  await registerPage.initAccountCreation(initData.name, initData.email);
  await registerPage.completeRegistrationDetails(
    userData.password,
    userData.day,
    userData.month,
    userData.year,
    userData.firstName,
    userData.lastName,
    userData.company,
    userData.address1,
    userData.address2,
    userData.country,
    userData.state,
    userData.city,
    userData.zipcode,
    userData.mobileNumber
  );

  await expect(registerPage.accountCreatedHeader).toBeVisible();
  await registerPage.continueButton.click();

  //Assert
  await expect(registerPage.loggedInAs(initData.name)).toBeVisible();
  await registerPage.deleteAccountButton.click();
  await expect(registerPage.accountDeletedHeader).toBeVisible();
  await registerPage.continueButton.click();
});
