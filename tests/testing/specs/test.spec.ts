import { test, expect } from '../fixtures/fixture';
import { RegisterPage } from '../helpers/register';
import { HomePage } from '../helpers/home';
import { users } from '../test-data/test-data';
import { createGreenReturnsRawResponse } from '../helpers/createGreens';

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

test('Check register page exists', async ({ homePage, page }) => {
  await test.step('Navigates to register page', async () => {
    await homePage.clickRegister();
  })
  const registerPage = new RegisterPage(page);
  await test.step('Check page URL matches register screen', async () => {
    await expect(page).toHaveURL('/auth/register');
  })
  await test.step('Checks that the register page has the correct text', async () => {
    await expect(registerPage.registerTxt).toBeVisible();
  })
})

test('Check sign in', async ({ homePage, page }) => {
  await homePage.standardSignIn();
  await expect(page).toHaveURL('/lakeview-bowls');
  await expect(homePage.homeTitleSignedInTxt).toBeVisible();
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

test('Create green signed out should give 403 ERROR @api', async ({ request }) => {
  const response = await createGreenReturnsRawResponse(request, crypto.randomUUID());
  expect(response.status()).toBe(403);
})


// All user account handling tests
test.describe('User sign-in/out features @smoke', () => {

test('Check sign out', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.signOut();
  await expect(homePage.homeTitleTxt).toBeVisible();
})


test('Check sign up', async ({ registerPage, page }) => {
  await registerPage.standardSignUp();
  await expect(page).toHaveURL('/lakeview-bowls');
  await expect(registerPage.lakeviewTxt).toBeVisible();
})

// Gives an example of using test.step and generates the API response as JSON and formatted to be readable 
test('GET /api/bookings gets all bookings for a standard user', { tag: '@api' }, async ({ request }, testInfo) => {
  const response = await test.step('Request all bookings', async () => {
    return await request.get('/api/bookings');
  });

  const body = await response.json();
  await testInfo.attach('bookings response', {
    body: JSON.stringify(body, null, 2),
    contentType: 'application/json',
  });

  await test.step('Check status is 200', async () => {
    expect(response.status()).toBe(200);
  });

  await test.step('Check body shape', async () => {
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('user');
  });
});
});

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
  await expect(page).toHaveURL('/dashboard/bookings', { timeout: 3000 });
})

})

test.describe('Admin features @api', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('Check API injection creating green', async ({ adminGreensPage, createGreens }) => {
    await expect(adminGreensPage.locatorForGreenName(createGreens.name)).toBeVisible(); 
  });

});

test('example of a testInfo.fixme @fixMe', async ({ page }, testInfo) => {
  testInfo.fixme();
})