import { test, expect } from '../fixtures/fixture';
import { RegisterPage } from '../pages/register';

test.afterEach(async ({  }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`Test ${testInfo.title} finished with status: ${testInfo.status}`);
  }
});

test('Check title', async ({ homePage }) => {
  await expect(homePage.homeTitleTxt).toBeVisible();
})

// All user account handling tests
test.describe('User sign-in/out features @smoke', () => {

test('Check register page', async ({ homePage, page }) => {
  await homePage.clickRegister();
  const registerPage = new RegisterPage(page);
  await expect(page).toHaveURL('/auth/register');
  await expect(registerPage.registerTxt).toBeVisible();
})

test('Check sign in', async ({ homePage, page }) => {
  await homePage.signIn("hameed@bowls.com", "hameed");
  await expect(page).toHaveURL('/lakeview-bowls');
  await expect(homePage.homeTitleSignedInTxt).toBeVisible();
})

test('Check sign out', async ({ homePage }) => {
  await homePage.signOut();
  await expect(homePage.homeTitleTxt).toBeVisible();
})
})

// All booking feature tests
test.describe('Booking features @smoke', () => {
test('Check booking', async ({ bookingsPage }) => {
  await bookingsPage.bookARink();
  await expect(bookingsPage.bookingConfirmTxt).toBeVisible();
})

})
