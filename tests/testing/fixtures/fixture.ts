import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../helpers/login';
import { BookingsPage } from '../helpers/bookings';
import { HomePage } from '../helpers/home';
import { RegisterPage } from '../helpers/register';
import { Green, createGreen, deleteGreen } from '../helpers/createGreens';
import { AdminGreensPage } from '../helpers/adminGreens';

type Fixtures = {
    loggedInPage: Page;
    bookingsPage: BookingsPage;
    homePage: HomePage;
    registerPage: RegisterPage;
    adminGreensPage: AdminGreensPage;
    createGreens: Green;
};

export const test = base.extend<Fixtures>({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.standardSignIn();
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
    },
    adminGreensPage: async ({ page, createGreens }, use) => {
        const adminGreensPage = new AdminGreensPage(page);
        await adminGreensPage.goto();
        await use (adminGreensPage);
    },
    createGreens: async ({ request }, use) => {
        const randomGreenName = crypto.randomUUID();
        const greenJSON = await createGreen(request, randomGreenName);
        await use (greenJSON);
        await deleteGreen(request, greenJSON.id);
    }
    
});

export { expect } from '@playwright/test';
