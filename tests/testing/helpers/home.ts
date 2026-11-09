import { type Locator, type Page } from '@playwright/test';
import { users } from '../test-data/test-data';

export class HomePage {
  readonly page: Page;
  readonly signInLnk: Locator;
  readonly registerLnk: Locator;
  readonly addYourClubLnk: Locator;
  readonly browseClubsLnk: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInBtn: Locator;
  readonly signOutBtn: Locator;
  readonly homeTitleTxt: Locator;
  readonly homeTitleSignedInTxt: Locator;
  readonly availabilityBtn: Locator;
  readonly gotoBookingsBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLnk = page.getByRole('link', { name: 'Sign In' });
    this.registerLnk = page.getByRole('link', { name: 'Register' });
    this.addYourClubLnk = page.getByRole('link', { name: 'Add your club' });
    this.browseClubsLnk = page.getByRole('link', { name: 'L Lakeview Bowls Club' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInBtn = page.getByRole('button', { name: 'Sign In' });
    this.signOutBtn = page.getByRole('button', { name: 'Sign Out' });
    this.homeTitleTxt = page.getByText('Club Management Platform');
    this.homeTitleSignedInTxt = page.getByRole('heading', { name: 'Lakeview Bowls Club' });
    this.availabilityBtn = page.getByRole('link', { name: 'Check Availability' });
    this.gotoBookingsBtn = page.getByRole('link', { name: 'Register to Book' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickSignIn() {
    await this.signInLnk.click();
  }

  async clickRegister() {
    await this.registerLnk.click();
  }

  async clickAddYourClub() {
    await this.addYourClubLnk.click();
  }

  async clickBrowseClubs() {
    await this.browseClubsLnk.click();
  }

  async standardSignIn() {
    await this.clickSignIn();
    await this.emailInput.fill(users.standard.email);
    await this.passwordInput.fill(users.standard.password);
    await this.signInBtn.click();
  }

  async adminSignIn() {
    await this.clickSignIn();
    await this.emailInput.fill(users.admin.email);
    await this.passwordInput.fill(users.standard.password);
    await this.signInBtn.click();
  }

  async signOut() {
    await this.page.goto('/lakeview-bowls');
    await this.signOutBtn.click();
  }

  async gotoBookingsFromAvailability() {
    await this.page.goto('/lakeview-bowls');
    await this.page.waitForLoadState('networkidle');
    await this.availabilityBtn.click();
    await this.page.waitForLoadState('networkidle');
    await this.gotoBookingsBtn.click();
  }

}