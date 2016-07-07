const assert = require('assert');
const clientBaseUrl = require('../config/development.json').client.baseUrl;

describe('Synapse app', () => {
  before(() => {
    browser.url(clientBaseUrl);
  });

  it('should have a page title', () => {
    const title = browser.getTitle();
    assert.equal(title, 'Synapse');
  });
});
