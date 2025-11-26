import { Page } from "@playwright/test";
import { Base } from "./Base.Page";

export class HomePage extends Base{
    readonly url: string = "/";

    constructor(page: Page){
        super(page);
    }

    async logOut(): Promise<void>{
        const logoutAnchor = this.page.locator('a:has-text(" Logout")')
        await logoutAnchor.click();
    }

    readonly deleteAccountButton = this.page.getByRole('link', {
        name: 'Delete Account',
    });
    readonly accountDeletedHeader = this.page.getByText('Account Deleted!');
}