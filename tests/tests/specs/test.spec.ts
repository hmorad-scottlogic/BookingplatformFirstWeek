import { test, expect } from '../fixtures/fixture';

test.afterEach(async ({  }, testInfo) => {
  
  if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`Test ${testInfo.title} finished with status: ${testInfo.status}`);
  }
});

test('Check title', async ({ homePage, page }) => {
  await expect(page).toHaveTitle("Club Management Platform");
})

// All user account handling tests
test.describe('User sign-in/out features @smoke', () => {
test('Check register page', async ({ homePage, page }) => {
  await homePage.clickRegister();
  await expect(page).toHaveURL('/auth/register');
  await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
})

test('Check sign in', async ({ homePage, page }) => {
  await homePage.signIn("hameed@bowls.com", "hameed");
  await expect(page).toHaveURL('/lakeview-bowls');
  await expect(page.getByRole('heading', { name: 'Lakeview Bowls Club' })).toBeVisible();
})

test('Check sign out', async ({ homePage, page }) => {
  await homePage.signOut();
  await expect(page).toHaveTitle("Club Management Platform");
})
})

// All booking feature tests
test.describe('Booking features @smoke', () => {
test('Check booking', async ({ bookingsPage, page }) => {
  await bookingsPage.bookARink();
  await expect(page.getByText('Booking requested for you')).toBeVisible();
})

})
