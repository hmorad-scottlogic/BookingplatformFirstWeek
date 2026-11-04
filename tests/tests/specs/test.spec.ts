import { test, expect } from '../fixtures/fixture';
import { RegisterPage } from '../pages/register';
import { HomePage } from '../pages/home';
import { users } from '../test-data/test-data';

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
  await homePage.standardSignIn();
  await expect(page).toHaveURL('/lakeview-bowls');
  await expect(homePage.homeTitleSignedInTxt).toBeVisible();
})

test('Check sign out', async ({ loggedInPage}) => {
  const homePage = new HomePage(loggedInPage);
  await homePage.signOut();
  await expect(homePage.homeTitleTxt).toBeVisible();
})

test('Check sign up', async ({ registerPage, page }) => {
  await registerPage.standardSignUp();
  await expect(page).toHaveURL('/lakeview-bowls');
  await expect(registerPage.lakeviewTxt).toBeVisible();
})

const invalidLogins = [
  { case: 'empty email', email: '', password: 'test', club: ''},
  { case: 'empty password', email: `user-${crypto.randomUUID()}@testing.com`, password: '', club: ''},
  { case: 'email taken', email: users.standard.email, password: 'test', club: ''},
  { case: 'club does not exist', email: `user-${crypto.randomUUID()}@testing.com`, password: '', club: 'nonExistingClub'}
];
for (const { case: name, email, password, club } of invalidLogins) {
  test(`login fails with ${name}`, async ({ registerPage, page }) => {
    await registerPage.standardInvalidSignUp(email, password, club);
    await expect(page).toHaveURL('/auth/register');
  });
}
})

// All booking feature tests
test.describe('Booking features @smoke', () => {
test('Check booking', async ({ bookingsPage }) => {
  await bookingsPage.bookARink();
  await expect(bookingsPage.bookingConfirmTxt).toBeVisible();
})

})
