import { test, expect } from '@playwright/test';

test.describe('Happy Path Flow', () => {
  test('should start at home', async ({ page }) => {

    const clickMenuLinkTo = (route: string) => page.locator(`nav a[href="/${route}"]`).click();
    const getMainContentText = () => page.locator('.container-fluid p.alert');
    const getShownDebugValue = (item: string) => page.locator(`#${item}`);

    await page.goto("/");
    await expect(page.locator('h1')).toContainText('Welcome');

    // should be able to navigate to a public page
    await clickMenuLinkTo('basics/public');
    await expect(page.locator('h1')).toContainText('Welcome');
    await expect(getMainContentText()).toContainText('🌐 PUBLIC');

    // should see user is not logged in
    await expect(getShownDebugValue('isAuthenticated')).toHaveText('false');
    await expect(getShownDebugValue('hasValidToken')).toHaveText('false');
    await expect(getShownDebugValue('isDoneLoading')).toHaveText('true');
    await expect(getShownDebugValue('canActivateProtectedRoutes')).toHaveText('false');

    // should be able to navigate to IDS4
    await page.locator(".btn", { hasText: "login"}).click();

    // should be able to log in on IDS4
    await page.locator('input#Input_Username').fill('bob');
    await page.locator('input#Input_Password').fill('bob');
    await page.locator('button[value=login]').click();

    // should initialize the application again
    // (happens automatically in Playwright)

    // should have silently refreshed and show being logged in
    await expect(page.locator('#email')).toHaveText('BobSmith@email.com');

    // should show expected debug booleans
    await expect(getShownDebugValue('isAuthenticated')).toHaveText('true');
    await expect(getShownDebugValue('hasValidToken')).toHaveText('true');
    await expect(getShownDebugValue('isDoneLoading')).toHaveText('true');
    await expect(getShownDebugValue('canActivateProtectedRoutes')).toHaveText('true');

    // should show expected identity claims
    await expect(getShownDebugValue('identityClaims')).toContainText('"iss": "https://demo.duendesoftware.com"');
    await expect(getShownDebugValue('identityClaims')).toContainText('"name": "Bob Smith"');

    // should be able to navigate to Admin-1 page
    await clickMenuLinkTo('basics/admin1');
    await expect(page.locator('h1')).toContainText('Welcome');
    await expect(getMainContentText()).toContainText('ADMIN');
    await expect(getMainContentText()).toContainText('API Success');

    // should be able to log out via IDS4
    await page.locator('.btn-primary', { hasText: 'logout' }).click();
    await expect(page.getByText('now logged out')).toBeVisible();

    // should be able to return to the app
    await page.locator('.PostLogoutRedirectUri').click();

    // should initialize the application again
    // (happens automatically in Playwright)

    // should see user is not logged in
    await expect(getShownDebugValue('isAuthenticated')).toHaveText('false');
    await expect(getShownDebugValue('hasValidToken')).toHaveText('false');
    await expect(getShownDebugValue('isDoneLoading')).toHaveText('true');
    await expect(getShownDebugValue('canActivateProtectedRoutes')).toHaveText('false');
  });

  test.afterEach(async () => {
    // await assertNoUnexpectedBrowserErrorsOnConsole();
  });
});
