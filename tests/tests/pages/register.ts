import { type Locator, type Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly registerTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerTxt = page.getByRole('heading', { name: 'Register' });
  }

  async goto() {
    await this.page.goto('/auth/register');
  }

}

