import { expect, test } from "@playwright/test";
import { RegisterPage } from "../../src/pages/register.page";
import { LoginPage } from "../../src/pages/login.page.ts";
import { generateUserSignupInfo, generateUserContactInfo } from "../../src/factories/userFactory.ts";
import { UserContactInfo, UserSignupInfo } from "../../src/models/user.model.ts";

const userSignupData = generateUserSignupInfo();
const userContactInfo = generateUserContactInfo();

test.beforeEach(async({page})=>{
    //Arrange
    const registerPage = new RegisterPage(page);
    
  
    //Act
    await registerPage.open();
    await registerPage.getTitle();
    await expect(page).toHaveURL(/.*automationexercise.com/);
    await registerPage.cookieHandler();
  
    await registerPage.signUpLoginButton.click();
    await expect(registerPage.headerNewUserSignup).toBeVisible();
  
    await registerPage.initAccountCreation((await userSignupData).name, (await userSignupData).email);
    await registerPage.completeRegistrationDetails(
      (await userContactInfo).password,
      (await userContactInfo).dateOfBirth.day.toString(),
      (await userContactInfo).dateOfBirth.month.toString(),
      (await userContactInfo).dateOfBirth.year.toString(),
      (await userContactInfo).firstName,
      (await userContactInfo).lastName,
      (await userContactInfo).address1,
      (await userContactInfo).country,
      (await userContactInfo).state,
      (await userContactInfo).city,
      (await userContactInfo).zipcode,
      (await userContactInfo).mobileNumber,
      (await userContactInfo).company,
      (await userContactInfo).address2,
    );
  
    await expect(registerPage.accountCreatedHeader).toBeVisible();
    await registerPage.continueButton.click();

    registerPage.logOut();

})

test('Test Case 2: Login User with correct email and password @AUT_01-02', async ({ page }) => {
  //Arrange
  const loginPage: LoginPage = new LoginPage(page);

  //Act
  await loginPage.open();
  await expect(loginPage.loginHeader).toBeVisible();

  await loginPage.fillUserData((await userSignupData).email, (await userContactInfo).password);

  await expect(page).toHaveURL("/");
});

test.afterEach(async({page})=>{
      const registerPage = new RegisterPage(page);

      await expect(registerPage.loggedInAs((await userSignupData).name)).toBeVisible();
      await registerPage.deleteAccountButton.click();
      await expect(registerPage.accountDeletedHeader).toBeVisible();
      await registerPage.continueButton.click();
})