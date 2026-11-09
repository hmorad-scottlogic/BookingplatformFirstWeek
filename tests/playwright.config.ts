import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';


dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  testDir: './testing',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
  ? [['github'], ['html', { open: 'never' }], ['junit', { outputFile: 'results/junit.xml' }]]
  : [['list'], ['html', { open: 'on-failure' }]],
  /* Timeout for tests */
  timeout: 30000,
  /* expect timeout for auto-retrying assertions */
  expect: {
    timeout: 10000,
  },
  /* Runs server when tests run if not running already with a 2 minute timeout */
  webServer: {
    command: 'npm run dev',
    cwd: '..',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60*1000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testDir: './setup',testMatch: /global-setup\.ts/, teardown: 'teardown' },
    { name: 'teardown', testDir: './setup', testMatch: /global-teardown\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
      storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] ,
      storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] ,
      storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
