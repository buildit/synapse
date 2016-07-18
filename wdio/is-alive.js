const assert = require('assert');
const clientBaseUrl = 'http://localhost:3000/'

describe('Synapse app', () => {
  before(() => {
    browser.url(clientBaseUrl);
  });

  it('should have a page title', () => {
    const title = browser.getTitle();
    assert.equal(title, 'Synapse');
  });
});
