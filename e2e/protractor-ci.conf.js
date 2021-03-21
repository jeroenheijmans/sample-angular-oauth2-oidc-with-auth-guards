const config = require('./protractor.conf').config;

config.capabilities = {
  acceptInsecureCerts: true,
  browserName: 'chrome',
  chromeOptions: {
    args: [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
    ],
  },
};

exports.config = config;
