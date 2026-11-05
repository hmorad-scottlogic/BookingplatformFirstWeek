import { test, expect } from '../fixtures/fixture';
import { RegisterPage } from '../pages/register';
import { HomePage } from '../pages/home';
import { users } from '../test-data/test-data';

test.afterEach(async ({  }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`Test ${testInfo.title} finished with status: ${testInfo.status}`);
  }
});
test.describe('signed out tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Check title @smoke', async ({ homePage }) => {
  await expect(homePage.homeTitleTxt).toBeVisible();
})

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

test('Check sign up', async ({ registerPage, page }) => {
  await registerPage.standardSignUp();
  await expect(page).toHaveURL('/lakeview-bowls');
  await expect(registerPage.lakeviewTxt).toBeVisible();
})

const invalidSignups = [
  { case: 'empty email', email: '', password: users.randomStandard.password, club: ''},
  { case: 'empty password', email: users.randomStandard.email, password: '', club: ''},
  { case: 'email taken', email: users.standard.email, password: users.randomStandard.password, club: ''},
  { case: 'club does not exist', email: users.randomStandard.email, password: users.randomStandard.password, club: 'nonExistingClub'}
];
for (const { case: name, email, password, club } of invalidSignups) {
  test(`sign-up fails with ${name}`, async ({ registerPage, page }) => {
    await registerPage.standardInvalidSignUp(email, password, club);
    await expect(page).toHaveURL('/auth/register');
  });
}

})

// All user account handling tests
test.describe('User sign-in/out features @smoke', () => {

test('Check sign out', async ({ page }) => {
  const homePage = new HomePage(page);
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

test.fail('Book through check availability page',  {
  tag: '@defect',
  annotation: { type: 'defect', description: 'Availability page does not take to bookings' }
}, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.gotoBookingsFromAvailability();
  await expect(page).toHaveURL('/dashboard/bookings');
})

})
