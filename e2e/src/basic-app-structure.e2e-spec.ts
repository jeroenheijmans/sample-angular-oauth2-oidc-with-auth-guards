import { AppPage } from './app.po';
import { assertNoUnexpectedBrowserErrorsOnConsole } from './util';

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
    await assertNoUnexpectedBrowserErrorsOnConsole();
  });
});
