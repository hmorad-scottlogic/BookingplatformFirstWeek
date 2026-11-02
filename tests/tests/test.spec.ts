import { test, expect } from '@playwright/test';

test('Check title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle("Club Management Platform");
})

test.describe('User sign-in/out features @smoke', () => {
test('Check register page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', {name: 'Register'}).click();

  await expect(page).toHaveURL('http://localhost:3000/auth/register');
  expect(page.getByText('Register', { exact: true }));
})

test('Check sign in', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', {name: 'Sign In'}).click();
  await page.getByRole('textbox', {name: 'Email'}).fill("hameed@bowls.com");
  await page.getByRole('textbox', {name: 'Password'}).fill("hameed");
  await page.getByRole('button', {name: "Sign In"}).click();

  await expect(page).toHaveURL('http://localhost:3000/lakeview-bowls');
  expect(page.getByText('Lakeview Bowls Club', { exact: true }));
})

test('Check sign out', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', {name: 'Sign In'}).click();
  await page.getByRole('textbox', {name: 'Email'}).fill("hameed@bowls.com");
  await page.getByRole('textbox', {name: 'Password'}).fill("hameed");
  await page.getByRole('button', {name: "Sign In"}).click();

  await page.getByRole('button', {name: 'Sign Out'}).click();

  await expect(page).toHaveTitle("Club Management Platform");
})
})

test.describe('Booking features @smoke', () => {
test('Check booking', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', {name: 'Sign In'}).click();
  await page.getByRole('textbox', {name: 'Email'}).fill("hameed@bowls.com");
  await page.getByRole('textbox', {name: 'Password'}).fill("hameed");
  await page.getByRole('button', {name: "Sign In"}).click();
  
  await page.getByRole('link', {name: 'Book Now'}).click();
  await page.getByLabel('Book Rink 7 at 17:00').click();
  await page.getByRole('button', {name: 'Request Booking'}).click();

  expect(page.getByText('Booking requested for you successfully!', { exact: true }));
})
})
