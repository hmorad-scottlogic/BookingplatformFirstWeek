import { type Locator, type Page } from '@playwright/test';

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
  }

  async goto() {
    await this.page.goto('http://localhost:3000');
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

  async signIn(email: string, password: string) {
    await this.clickSignIn();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInBtn.click();
  }

  async signOut() {
    await this.signIn("hameed@bowls.com", "hameed");
    await this.signOutBtn.click();
  }

}