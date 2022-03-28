import { browser, by, element } from 'protractor';

export class DemoIdentityServerPage {
  isReadyForLoginInputs(): Promise<boolean> {
    return element(by.css('input#Input_Username'))
      .isPresent() as Promise<boolean>;
  }

  async enterCredentials(user: string, password: string): Promise<void> {
    await element(by.css('input#Input_Username')).sendKeys(user);
    await element(by.css('input#Input_Password')).sendKeys(password);
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
