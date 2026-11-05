import { test as teardown } from '@playwright/test';
import fs from 'node:fs';

teardown('clean up after tests finish', async () => {
    fs.rmSync('playwright/.auth/user.json', { force:true });
    console.log('File deleted successfully.');
});