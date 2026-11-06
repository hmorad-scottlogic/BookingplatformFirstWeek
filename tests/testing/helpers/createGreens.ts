import { type APIRequestContext, expect } from '@playwright/test';

export interface Green {
    id: string;
    name: string;
}

export async function createGreen(request: APIRequestContext, name: string): Promise<Green> {
    const response = await request.post('/api/admin/greens', {
        data: {"name":name,"allWeather":false,"seasonStartMMDD":"04-01","seasonEndMMDD":"09-30"}        
    });
    expect(response.ok()).toBe(true);
    return await response.json();        
}

export async function deleteGreen(request: APIRequestContext, id: string) {
    const response = await request.delete(`/api/admin/greens/${id}`);
    expect(response.ok(), `Create failed: ${response.status()} ${await response.text()}`).toBe(true);
}

