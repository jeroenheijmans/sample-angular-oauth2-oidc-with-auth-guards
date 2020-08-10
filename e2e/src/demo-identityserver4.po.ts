import { browser, by, element } from 'protractor';

export class DemoIdentityServer4Page {
  isReadyForLoginInputs(): Promise<boolean> {
    return element(by.css('input#Username'))
      .isPresent() as Promise<boolean>;
  }

  async enterCredentials(user: string, password: string): Promise<void> {
    await element(by.css('input#Username')).sendKeys(user);
    await element(by.css('input#Password')).sendKeys(password);
    await element(by.css('button[value=login]')).click();
  }

  isShowingLoggedOutMessage(): Promise<boolean> {
    return element(by.cssContainingText('*', 'now logged out'))
      .isPresent() as Promise<boolean>;
  }

  clickReturnToAppUrl(): Promise<void> {
    return element(by.css('.PostLogoutRedirectUri')).click() as Promise<void>;
  }
}
