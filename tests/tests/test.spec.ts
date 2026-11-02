import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/helper-page';

//Pre-completions before all tests
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
})

test('Check title', async ({ page }) => {
  await expect(page).toHaveTitle("Club Management Platform");
})

// All user account handling tests
test.describe('User sign-in/out features @smoke', () => {

test('Check register page', async ({ page }) => {
  await page.getByRole('link', {name: 'Register'}).click();

  await expect(page).toHaveURL('http://localhost:3000/auth/register');
  expect(page.getByText('Register', { exact: true }));
})

test('Check sign in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.signIn('hameed@bowls.com', 'hameed');

  await expect(page).toHaveURL('http://localhost:3000/lakeview-bowls');
  expect(page.getByText('Lakeview Bowls Club', { exact: true }));
})

test('Check sign out', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.signIn('hameed@bowls.com', 'hameed');
  await page.getByRole('button', {name: 'Sign Out'}).click();

  await expect(page).toHaveTitle("Club Management Platform");
})
})

// All booking feature tests
test.describe('Booking features @smoke', () => {

test('Check booking', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.signIn('hameed@bowls.com', 'hameed');
  await page.getByRole('link', {name: 'Book Now'}).click();
  await page.getByLabel('Book Rink 7 at 17:00').click();
  await page.getByRole('button', {name: 'Request Booking'}).click();

  expect(page.getByText('Booking requested for you successfully!', { exact: true }));
})
})
