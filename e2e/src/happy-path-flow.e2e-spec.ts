import { browser } from 'protractor';

import { AppPage } from './app.po';
import { DemoIdentityServer4Page } from './demo-identityserver4.po';
import { assertNoUnexpectedBrowserErrorsOnConsole } from './util';

describe('Happy Path Flow', () => {
  let appPage: AppPage;
  let ids4Page: DemoIdentityServer4Page;

  beforeEach(() => {
    appPage = new AppPage();
    ids4Page = new DemoIdentityServer4Page();
  });

  it('should start at home', async () => {
    await appPage.navigateTo();
    expect(await appPage.getTitleText()).toEqual('Welcome');
  });

  it('should be able to navigate to a public page', async () => {
    await appPage.clickMenuLinkTo('basics/public');
    expect(await appPage.getTitleText()).toEqual('Welcome');
    expect(await appPage.getMainContentText()).toContain('🌐 PUBLIC');
  });

  it('should see user is not logged in', async () => {
    expect(await appPage.getShownDebugValue('isAuthenticated')).toBe('false');
    expect(await appPage.getShownDebugValue('hasValidToken')).toBe('false');
    expect(await appPage.getShownDebugValue('isDoneLoading')).toBe('true');
    expect(await appPage.getShownDebugValue('canActivateProtectedRoutes')).toBe('false');
  });

  it('should be able to navigate to IDS4', async () => {
    await appPage.clickLoginButton();
    browser.waitForAngularEnabled(false);
    expect(await ids4Page.isReadyForLoginInputs()).toBe(true);
  });

  it('should be able to log in on IDS4', async () => {
    await ids4Page.enterCredentials('bob', 'bob');
    browser.waitForAngularEnabled(true);
  });

  it('should have silently refreshed and show being logged in', async () => {
    expect(await appPage.getEmailText()).toBe('BobSmith@email.com');
  });

  it('should show expected debug booleans', async () => {
    expect(await appPage.getShownDebugValue('isAuthenticated')).toBe('true');
    expect(await appPage.getShownDebugValue('hasValidToken')).toBe('true');
    expect(await appPage.getShownDebugValue('isDoneLoading')).toBe('true');
    expect(await appPage.getShownDebugValue('canActivateProtectedRoutes')).toBe('true');
  });

  it('should show expected identity claims', async () => {
    const identityClaims = await appPage.getShownDebugValue('identityClaims');
    expect(identityClaims).toContain('"iss": "https://demo.identityserver.io"');
    expect(identityClaims).toContain('"name": "Bob Smith"');
  });

  it('should be able to navigate to Admin-1 page', async () => {
    await appPage.clickMenuLinkTo('basics/admin1');
    expect(await appPage.getTitleText()).toEqual('Welcome');
    expect(await appPage.getMainContentText()).toContain('ADMIN');
    expect(await appPage.getMainContentText()).toContain('API Success');
  });

  it('should be able to log out via IDS4', async () => {
    await appPage.clickLogoutButton();
    browser.waitForAngularEnabled(false);
    expect(await ids4Page.isShowingLoggedOutMessage()).toBe(true);
  });

  it('should be able to return to the app', async () => {
    await ids4Page.clickReturnToAppUrl();
    browser.waitForAngularEnabled(true);
  });

  it('should see user is not logged in', async () => {
    expect(await appPage.getShownDebugValue('isAuthenticated')).toBe('false');
    expect(await appPage.getShownDebugValue('hasValidToken')).toBe('false');
    expect(await appPage.getShownDebugValue('isDoneLoading')).toBe('true');
    expect(await appPage.getShownDebugValue('canActivateProtectedRoutes')).toBe('false');
  });

  afterEach(async () => {
    await assertNoUnexpectedBrowserErrorsOnConsole();
  });
});
