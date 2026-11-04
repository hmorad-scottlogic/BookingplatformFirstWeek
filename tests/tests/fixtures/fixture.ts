import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { BookingsPage } from '../pages/bookings';
import { HomePage } from '../pages/home';
import { RegisterPage } from '../pages/register';
import { users } from '../test-data/test-data';

type Fixtures = {
    loggedInPage: Page;
    bookingsPage: BookingsPage;
    homePage: HomePage;
    registerPage: RegisterPage;
};

export const test = base.extend<Fixtures>({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.standardSignIn();
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
    },
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        await use(registerPage);
    }
    
});

export { expect } from '@playwright/test';
