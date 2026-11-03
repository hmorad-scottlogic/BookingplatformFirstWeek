import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';

test.afterEach(async ({ page }, testInfo) => {
  
  if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`Test ${testInfo.title} finished with status: ${testInfo.status}`);
  }
});

test('Check title', async ({ homePage, page }) => {
  await homePage.goto();
  await expect(page).toHaveTitle("Club Management Platform");
})

// All user account handling tests
test.describe('User sign-in/out features @smoke', () => {
test('Check register page', async ({ homePage, page }) => {
  await homePage.clickRegister();
  await expect(page).toHaveURL('http://localhost:3000/auth/register');
  await expect(page.getByText('Register', { exact: true }));
})

test('Check sign in', async ({ homePage, page }) => {
  await homePage.signIn("hameed@bowls.com", "hameed");
  await expect(page).toHaveURL('http://localhost:3000/lakeview-bowls');
  await expect(page.getByText('Lakeview Bowls Club', { exact: true }));
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
  await expect(page.getByText('Booking requested for you successfully!', { exact: true }));
})

})
