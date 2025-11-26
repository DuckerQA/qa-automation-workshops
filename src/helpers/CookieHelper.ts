import { Page } from "@playwright/test";

export async function CookieHelper(page: Page) {
  try {
    const consentBtn = page.locator('button.fc-cta-consent >> text=Consent');
    await consentBtn.waitFor({ timeout: 2000 });
    await consentBtn.click();
  } catch {
    // Jeśli nie pojawił się w 3s, ignorujemy
  }
}