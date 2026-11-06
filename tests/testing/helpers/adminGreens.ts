import { type Locator, type Page, type APIRequestContext } from '@playwright/test';

export class AdminGreensPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/dashboard/greens');
    }

    locatorForGreenName(green: string): Locator {
        return this.page.getByText(green);
    }
}

