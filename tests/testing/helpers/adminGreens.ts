import { type Locator, type Page, type APIRequestContext } from '@playwright/test';

export class AdminGreensPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/dashboard/greens');
    }
}

export async function createGreen(request: APIRequestContext, name: string) {
    const response = await request.post('/api/admin/greens', {
        data: {"name":name,"allWeather":false,"seasonStartMMDD":"04-01","seasonEndMMDD":"09-30"}        
    });
    return await response.json();        
}

export async function deleteGreen(request: APIRequestContext, id: string) {
    const response = await request.delete(`/api/admin/greens/${id}`);
}

