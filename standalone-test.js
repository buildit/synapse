const webdriverio = require('webdriverio');
const options = { desiredCapabilities: { browserName: 'chrome' } };
const client = webdriverio.remote(options);
const assert = require('assert');
const clientBaseUrl = 'http://localhost:3000/';

const testIsEqual = (expected, actual) => {
  const failureMessage =
    `\n\n
    =========================================
    We expected this: ${expected}.
    Instead, we got this: ${actual}
    =========================================
    \n\n`;
  setTimeout(() => {
    assert.equal(actual, expected, failureMessage);
  }, 0);
};

client
    .init()
    .url(clientBaseUrl)
    .click('#link-0')
    .getText('h1')
      .then(text => {
        testIsEqual('CitiPlanner', text);
      })
    .end();
