import { type APIRequestContext, expect, type APIResponse } from '@playwright/test';

export interface Green {
    id: string;
    name: string;
}

export async function createGreen(request: APIRequestContext, name: string): Promise<Green> {
    const response = await createGreenReturnsRawResponse(request, name);
    expect(response.ok()).toBe(true);
    return await response.json();        
}

export async function deleteGreen(request: APIRequestContext, id: string) {
    const response = await request.delete(`/api/admin/greens/${id}`);
    expect(response.ok(), `Delete failed: ${response.status()} ${await response.text()}`).toBe(true);
}

export async function createGreenReturnsRawResponse(request: APIRequestContext, name: string): Promise<APIResponse> {
    const response = await request.post('/api/admin/greens', {
        data: {"name":name,"allWeather":false,"seasonStartMMDD":"04-01","seasonEndMMDD":"09-30"},
        maxRedirects: 0,        
    });
    return response;        
}