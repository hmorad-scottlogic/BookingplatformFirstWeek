import { type Locator, type Page } from '@playwright/test';

export class BookingsPage {
  readonly page: Page;
  readonly rink1Btn: Locator;
  readonly requestBookingBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rink1Btn = page.getByRole('button', { name: 'Book Rink 1 at 17:' });
    this.requestBookingBtn = page.getByRole('button', {name: 'Request Booking'});
  }

  async goto() {
    await this.page.goto('/dashboard/bookings');
  }

  async bookARink() {
    await this.rink1Btn.click();
    await this.requestBookingBtn.click();
  }

}

