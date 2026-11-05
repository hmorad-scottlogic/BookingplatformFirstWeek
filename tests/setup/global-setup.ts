import { test as setup } from '../testing/fixtures/fixture';

setup('sign in as a standard user', async ({ loggedInPage }) =>{
  await loggedInPage.context().storageState({ path: 'playwright/.auth/user.json'});
});
