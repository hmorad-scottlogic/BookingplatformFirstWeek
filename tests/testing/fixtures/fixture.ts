import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../helpers/login';
import { BookingsPage } from '../helpers/bookings';
import { HomePage } from '../helpers/home';
import { RegisterPage } from '../helpers/register';

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
    bookingsPage: async ({ page }, use) => {
        const bookingsPage = new BookingsPage(page);
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
