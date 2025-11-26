import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../src/pages/register.page";

test.only("creating user with correct data @AE_01_01", async ({ page }) => {
  //Arrange
  const userName = "maciej";
  const registerPage = new RegisterPage(page);

  //Act
  await registerPage.goto();
  await expect(page).toHaveURL("https://automationexercise.com/");
  await registerPage.cookieHandler();

  await page.getByRole("link", { name: "Signup / Login" }).click();
  await expect(page.getByText("New User Signup!")).toBeVisible();
  await page.locator('[data-qa="signup-name"]').fill(userName);
  await page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address")
    .fill("maciek12345@gmail.com");
  await page.getByRole("button", { name: "Signup" }).click();
  await expect(page.getByText("ENTER ACCOUNT INFORMATION")).toBeVisible();
  await page.getByRole("radio", { name: "Mr." }).check();
  await page.getByRole("textbox", { name: "Password *" }).fill("nowehaslo");
  await page.locator("#days").selectOption("2");
  await page.locator("#months").selectOption("2");
  await page.locator("#years").selectOption("2019");
  await page.getByText("Sign up for our newsletter!").click();
  await page
    .getByRole("checkbox", { name: "Receive special offers from" })
    .check();
  await page
    .getByRole("textbox", { name: "First name *" })
    .fill("hdfhdfhdfhdf");
  await page.getByRole("textbox", { name: "Last name *" }).fill("dsghhdghfgd");
  await page
    .getByRole("textbox", { name: "Company", exact: true })
    .fill("gaggadgfg");
  await page
    .getByRole("textbox", { name: "Address * (Street address, P." })
    .fill("hfdhhdfhdfhdfdhf");
  await page
    .getByRole("textbox", { name: "Address 2" })
    .fill("hdfhdfhdfdhfhdfdh");
  await page.getByLabel("Country *").selectOption("United States");
  await page.getByRole("textbox", { name: "State *" }).fill("dhfhdf");
  await page
    .getByRole("textbox", { name: "City * Zipcode *" })
    .fill("hdfhdfdhfhdfh");
  await page.locator("#zipcode").fill("21-500");
  await page
    .getByRole("textbox", { name: "Mobile Number *" })
    .fill("123456789");

  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("ACCOUNT CREATED!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
  await expect(page.getByText(`Logged in as ${userName}`)).toBeVisible();
  await page.getByRole("link", { name: "Delete Account" }).click();

  //Assert
  await expect(page.getByText("ACCOUNT DELETED!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
});
