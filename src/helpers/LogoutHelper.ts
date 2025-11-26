import { Page } from "@playwright/test";
import { Anchor } from "../components/Anchor";

export async function LogoutHelper(page: Page){
    const logoutAnchor: Anchor = new Anchor(page, "a", " Logout");
    await logoutAnchor.click();
}