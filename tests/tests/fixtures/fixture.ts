import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/sign-in';
import { BookingsPage } from '../pages/bookings';
import { HomePage } from '../pages/home';

type Fixtures = {
    loggedInPage: Page;
    bookingsPage: BookingsPage;
    homePage: HomePage;
};

export const test = base.extend<Fixtures>({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.signIn('hameed@bowls.com', 'hameed');
        await page.waitForURL('/lakeview-bowls')
        await use(page);
    },
    bookingsPage: async ({ loggedInPage }, use) => {
        const bookingsPage = new BookingsPage(loggedInPage);
        await bookingsPage.goto();
        await use(bookingsPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(homePage);
    }
});

export { expect } from '@playwright/test';
