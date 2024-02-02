import { test, expect, type Page } from '@playwright/test';

test.describe('Happy Path Flow', () => {
  let page: Page;

  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test('should start at home', async () => {
    await page.goto("/");
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('should be able to navigate to a public page', async () => {
    await page.locator(`nav a[href="/basics/public"]`).click()
    await expect(page.locator('h1')).toContainText('Welcome');
    await expect(page.locator('.container-fluid p.alert')).toContainText('🌐 PUBLIC');
  });

  test('should see user is not logged in at the start', async () => {
    await expect(page.locator('#isAuthenticated')).toHaveText('false');
    await expect(page.locator('#hasValidToken')).toHaveText('false');
    await expect(page.locator('#isDoneLoading')).toHaveText('true');
    await expect(page.locator('#canActivateProtectedRoutes')).toHaveText('false');
  });

  test('should be able to navigate to IDS4', async () => {
    await page.locator(".btn", { hasText: "login"}).click();
  });

  test('should be able to log in on IDS4', async () => {
    await page.locator('input#Input_Username').fill('bob');
    await page.locator('input#Input_Password').fill('bob');
    await page.locator('button[value=login]').click();
  });

  test('should have silently refreshed and show being logged in', async () => {
    await expect(page.locator('#email')).toHaveText('BobSmith@email.com');
  });

  test('should show expected debug booleans', async () => {
    await expect(page.locator('#isAuthenticated')).toHaveText('true');
    await expect(page.locator('#hasValidToken')).toHaveText('true');
    await expect(page.locator('#isDoneLoading')).toHaveText('true');
    await expect(page.locator('#canActivateProtectedRoutes')).toHaveText('true');
  });

  test('should show expected identity claims', async () => {
    await expect(page.locator('#identityClaims')).toContainText('"iss": "https://demo.duendesoftware.com"');
    await expect(page.locator('#identityClaims')).toContainText('"name": "Bob Smith"');
  });

  test('should be able to navigate to Admin-1 page', async () => {
    await page.locator(`nav a[href="/basics/admin1"]`).click()
    await expect(page.locator('h1')).toContainText('Welcome');
    await expect(page.locator('.container-fluid p.alert')).toContainText('ADMIN');
    await expect(page.locator('.container-fluid p.alert')).toContainText('API Success');
  });

  test('should be able to log out via IDS4', async () => {
    await page.locator('.btn-primary', { hasText: 'logout' }).click();
    await expect(page.getByText('now logged out')).toBeVisible();
  });

  test('should be able to return to the app', async () => {
    await page.locator('.PostLogoutRedirectUri').click();
  });

  test('should see user is not logged in at the end', async () => {
    await expect(page.locator('#isAuthenticated')).toHaveText('false');
    await expect(page.locator('#hasValidToken')).toHaveText('false');
    await expect(page.locator('#isDoneLoading')).toHaveText('true');
    await expect(page.locator('#canActivateProtectedRoutes')).toHaveText('false');
  });

  test.afterEach(async () => {
    // This was a trick from Protractor we can consider re-enabling later. It double
    // checks if there's no secret error messages lingering around. For now we'll
    // merge the Protractor-replacement to have at least something.
    // await assertNoUnexpectedBrowserErrorsOnConsole();
  });
});
