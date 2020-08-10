import { browser, logging } from 'protractor';

import { AppPage } from './app.po';

describe('Basic app structure', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome');
  });

  it('should display home component text', () => {
    expect(page.getMainContentText()).toContain('🏠 HOME');
  });

  it('should display buttons to press', () => {
    expect(page.getMainContentText()).toContain('🏠 HOME');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER)
      .then(l => l.filter(entry =>
          // These are perfectly normal in this sample
          // application, so we filter them out:
          !entry.message.includes('OAuthErrorEvent')

          // This can happen if a 401 is given by an API
          // resource which might be perfectly reasonable
          // in this sample application.
          && !entry.message.includes('Failed to load resource')
      ));

    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
