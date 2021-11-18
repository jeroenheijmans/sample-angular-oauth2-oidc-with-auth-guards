import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  clickMenuLinkTo(route: string): Promise<void> {
    return element(by.css(`nav a[href="/${route}"]`))
      .click() as Promise<void>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('h1')).getText() as Promise<string>;
  }

  getMainContentText(): Promise<string> {
    return element(by.css('.container-fluid p.alert')).getText() as Promise<string>;
  }

  hasButtonWithText(text: string): Promise<boolean> {
    return element(by.cssContainingText('.btn', text)).isPresent() as Promise<boolean>;
  }

  clickLoginButton(): Promise<void> {
    return element(by.cssContainingText('.btn', 'login'))
      .click() as Promise<void>;
  }

  clickLogoutButton(): Promise<void> {
    return element(by.cssContainingText('.btn-primary', 'logout'))
      .click() as Promise<void>;
  }

  getEmailText(): Promise<string> {
    return element(by.css('#email')).getText() as Promise<string>;
  }

  getShownDebugValue(item: string): Promise<string> {
    return element(by.css(`#${item}`)).getText() as Promise<string>;
  }

  waitForAppPageLoaded(): Promise<boolean> {
    // A bit heavy-handed, but just waiting for the right element to
    // be present runs into several Protractor issues which are hard
    // to understand and even harder to solve. Given that Angular has
    // deprecated Protractor and wants us to move to other stuff, we
    // just let this workaround sit here for now...
    return browser.refresh() as Promise<boolean>;
  }
}
