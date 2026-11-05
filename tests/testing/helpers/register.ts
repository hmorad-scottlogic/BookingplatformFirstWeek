import { type Locator, type Page } from '@playwright/test';
import { clubs } from '../test-data/test-data';
import { users } from '../test-data/test-data';

export class RegisterPage {
  readonly page: Page;
  readonly registerTxt: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly clubSlugInput: Locator;
  readonly registerBtn: Locator;
  readonly signInEmailInput: Locator;
  readonly signInPasswordInput: Locator;
  readonly signInBtn: Locator;
  readonly lakeviewTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerTxt = page.getByRole('heading', { name: 'Register' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.clubSlugInput = page.getByRole('textbox', { name: 'Club slug (optional)' });
    this.registerBtn = page.getByRole('button', { name: 'Register' });
    this.signInEmailInput = page.getByRole('textbox', { name: 'Email' });
    this.signInPasswordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInBtn = page.getByRole('button', { name: 'Sign In' });
    this.lakeviewTxt = page.getByRole('heading', { name: 'Lakeview Bowls Club' });
  }

  async goto() {
    await this.page.goto('/auth/register');
  }

  async standardSignUp() {
    const emailForSession = `user-${crypto.randomUUID()}@testing.com`
    await this.nameInput.fill(`testName-${crypto.randomUUID()}`);
    await this.emailInput.fill(emailForSession);
    await this.passwordInput.fill(users.standard.password);
    await this.clubSlugInput.fill(clubs.clubSlug);
    await this.registerBtn.click();
    await this.page.waitForLoadState('networkidle');
    await this.signInEmailInput.fill(emailForSession);
    await this.signInPasswordInput.fill(users.standard.password);
    await this.signInBtn.click();
  }

  async standardInvalidSignUp(email: string, password: string, club: string) {
    await this.nameInput.fill(`testName-${crypto.randomUUID()}`);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.clubSlugInput.fill(club);
    await this.registerBtn.click();
    await this.page.waitForLoadState('networkidle');
  }


}

