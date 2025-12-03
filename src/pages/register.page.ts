import { Locator, Page } from '@playwright/test';

import { UserContactInfo, UserSignupInfo } from '../models/user.model';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {
  readonly url: string = '/register';

  // --- SIGNUP FORM ---
  readonly signUpLoginButton = this.page.getByRole('link', {
    name: 'Signup / Login',
  });
  readonly headerNewUserSignup = this.page.getByRole('heading', {
    name: 'New User Signup!',
  });
  readonly signUpNameInput = this.page.locator('[data-qa="signup-name"]');
  readonly signUpEmailInput = this.page.locator('[data-qa="signup-email"]');
  readonly signUpButton = this.page.getByRole('button', { name: 'Signup' });

  // --- ACCOUNT INFO SECTION ---

  readonly genderMaleOption = this.page.locator('#uniform-id_gender1');
  readonly passwordInput = this.page.locator('#password');
  readonly birthDaySelect = this.page.locator('[data-qa="days"]');
  readonly birthMonthSelect = this.page.locator('[data-qa="months"]');
  readonly birthYearSelect = this.page.locator('[data-qa="years"]');
  readonly newsletterCheckbox = this.page.locator('#newsletter');
  readonly offersCheckbox = this.page.locator('#optin');

  // --- ADDRESS INFO ---
  readonly firstNameInput = this.page.locator('#first_name');
  readonly lastNameInput = this.page.locator('#last_name');
  readonly companyInput = this.page.locator('#company');
  readonly address1Input = this.page.locator('#address1');
  readonly address2Input = this.page.locator('#address2');
  readonly countrySelect = this.page.locator('#country');
  readonly stateInput = this.page.locator('#state');
  readonly cityInput = this.page.locator('#city');
  readonly zipcodeInput = this.page.locator('#zipcode');
  readonly mobileNumberInput = this.page.locator('#mobile_number');

  // --- CREATE ACCOUNT Confirmation ---

  readonly createAccountButton = this.page.locator(
    '[data-qa="create-account"]',
  );
  readonly continueButton = this.page.locator('[data-qa="continue-button"]');
  readonly accountCreatedHeader = this.page.getByRole('heading', {
    name: 'Account Created!',
  });

  // --- DELETE ACCOUNT ---
  readonly deleteAccountButton = this.page.getByRole('link', {
    name: 'Delete Account',
  });
  readonly accountDeletedHeader = this.page.getByText('Account Deleted!');

  constructor(page: Page) {
    super(page);
  }

  async initAccountCreation(userSignupInfo: UserSignupInfo): Promise<void> {
    await this.signUpNameInput.fill(userSignupInfo.name);
    await this.signUpEmailInput.fill(userSignupInfo.email);
    await this.signUpButton.click();
  }

  async completeRegistrationDetails(
    userContactInfo: UserContactInfo,
  ): Promise<void> {
    //Account Info
    await this.genderMaleOption.click();
    await this.passwordInput.fill(userContactInfo.password);
    await this.birthDaySelect.selectOption(
      userContactInfo.dateOfBirth.day.toString(),
    );
    await this.birthMonthSelect.selectOption(
      userContactInfo.dateOfBirth.month.toString(),
    );
    await this.birthYearSelect.selectOption(
      userContactInfo.dateOfBirth.year.toString(),
    );
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();

    //Address Info
    await this.firstNameInput.fill(userContactInfo.firstName);
    await this.lastNameInput.fill(userContactInfo.lastName);
    await this.companyInput.fill(
      userContactInfo.company ? userContactInfo.company : '',
    );
    await this.address1Input.fill(userContactInfo.address1);
    await this.address2Input.fill(
      userContactInfo.address2 ? userContactInfo.address2 : '',
    );
    await this.countrySelect.selectOption(userContactInfo.country);
    await this.stateInput.fill(userContactInfo.state);
    await this.cityInput.fill(userContactInfo.city);
    await this.zipcodeInput.fill(userContactInfo.zipcode);
    await this.mobileNumberInput.fill(userContactInfo.mobileNumber);
    await this.createAccountButton.click();
  }

  loggedInAs(userSignupInfo: UserSignupInfo): Locator {
    return this.page.getByText(`Logged in as ${userSignupInfo.name}`);
  }

  async logOut(): Promise<void> {
    this.page.locator('a[href="/logout"]').click();
  }
}
