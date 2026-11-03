import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInBtn: Locator;
  readonly signOutBtn: Locator;
  readonly bookNowBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInBtn = page.getByRole('button', { name: 'Sign In' });
    this.signOutBtn = page.getByRole('button', { name: 'Sign Out' });
    this.bookNowBtn = page.getByRole('button', { name: 'Book Now'});
  }

  async goto() {
    await this.page.goto('http://localhost:3000/auth/login');
    await this.page.waitForLoadState('networkidle');
  }

  async signIn(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInBtn.click();
  }

  async signOut() {
    await this.signOutBtn.click();
  }

  async navigateToBookings() {
    await this.bookNowBtn.click();
  }

}