import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly homeSignInButton: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', {name: 'Email'});
    this.passwordInput = page.getByRole('textbox', {name: 'Password'});
    this.homeSignInButton = page.getByRole('link', { name: 'Sign in' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto() {
    await this.page.goto('http://localhost:3000/');
  }

  async signIn(email: string, password: string) {
    await this.homeSignInButton.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

}