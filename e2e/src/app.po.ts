import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('h1')).getText() as Promise<string>;
  }

  getMainContentText(): Promise<string> {
    return element(by.css('app-home p.alert')).getText() as Promise<string>;
  }

  hasButtonWithText(text: string): Promise<boolean> {
    return element(by.cssContainingText('.btn', text)).isPresent() as Promise<boolean>;
  }
}
