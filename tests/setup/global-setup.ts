import { test as setup } from '../testing/fixtures/fixture';
import { LoginPage } from '../testing/helpers/login';

setup('sign in as a standard user', async ({ loggedInPage }) =>{
  await loggedInPage.context().storageState({ path: 'playwright/.auth/user.json'});
});

setup('sign in as an admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.adminSignIn();
  await page.context().storageState({ path: 'playwright/.auth/admin.json'});
});
