import { test, expect } from '@playwright/test';

test.describe('Basic app structure', () => {
  test('navigate around the sample app', async({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText('Welcome');
    await expect(page.locator('.container-fluid p.alert')).toContainText('🏠 HOME');
  })
});

test.afterEach(async () => {
  // await assertNoUnexpectedBrowserErrorsOnConsole();
});
