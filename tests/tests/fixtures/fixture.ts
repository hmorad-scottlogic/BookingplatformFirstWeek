import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/helper-page';

export const test = base.extend<{signedInPage: Page }>({
    signedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.signIn('hameed@bowls.com', 'hameed');
        await use(page);
    }
});
