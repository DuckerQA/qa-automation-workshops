import { Page } from "@playwright/test";

export const sprawdzCiasteczkaHelper = {
    async sprawdzCiasteczka(page: Page) {
        const consentBtn = page.locator("p.fc-button-label", { hasText: "Consent" });
        if (await consentBtn.isVisible()) {
            await consentBtn.click();
        }
    }
}
