import { browser, logging } from 'protractor';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export async function assertNoUnexpectedBrowserErrorsOnConsole() {
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

  logs.forEach(l => {
    expect(l.level).not.toBe(logging.Level.SEVERE,
      `Unexpected log of ${l.level} level found at ${new Date(l.timestamp).toISOString()} with message: ${l.message}`
    );
  });
}
