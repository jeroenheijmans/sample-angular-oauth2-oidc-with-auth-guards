import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI, /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: process.env.CI ? 2 : 0, /* Retry on CI only */
  workers: process.env.CI ? 1 : undefined, /* Opt out of parallel tests on CI. */
  reporter: 'html',
  use: {
    baseURL: 'https://localhost:4200',
    trace: 'on-first-retry', /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { args: ['--ignore-certificate-errors'] }
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start-with-ssl',
    url: 'https://localhost:4200',
    reuseExistingServer: !process.env.CI,
    ignoreHTTPSErrors: true,
  },
});
