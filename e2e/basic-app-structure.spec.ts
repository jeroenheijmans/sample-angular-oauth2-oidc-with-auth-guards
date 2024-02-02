import { test, expect } from '@playwright/test';

test.describe('Basic app structure', () => {
  test('navigate around the sample app', async({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText('Welcome');
    await expect(page.locator('.container-fluid p.alert')).toContainText('🏠 HOME');
  })

  test.afterEach(async () => {
    // This was a trick from Protractor we can consider re-enabling later. It double
    // checks if there's no secret error messages lingering around. For now we'll
    // merge the Protractor-replacement to have at least something.
    // await assertNoUnexpectedBrowserErrorsOnConsole();
  });
});
