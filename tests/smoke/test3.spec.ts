import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveURL('https://automationexercise.com/', { timeout: 5000 });
  await page.getByRole('button', { name: 'Consent' }).click();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await expect(page.getByText('Login to your account')).toBeVisible();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('niepoprawnygmail@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('niepoprawnehaslo');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});