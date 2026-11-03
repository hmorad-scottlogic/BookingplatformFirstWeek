import { type Locator, type Page } from '@playwright/test';

export class BookingsPage {
  readonly page: Page;
  readonly rink7Btn: Locator;
  readonly requestBookingBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rink7Btn = page.getByRole('button', { name: 'Book Rink 1 at 17:' });
    this.requestBookingBtn = page.getByRole('button', {name: 'Request Booking'});
  }

  async goto() {
    await this.page.goto('http://localhost:3000/dashboard/bookings');
  }

  async bookARink() {
    await this.rink7Btn.click();
    await this.requestBookingBtn.click();
  }

}

