const assert = require('assert');

describe('Synapse app', () => {
  before(() => {
    browser.url('http://localhost:3000/');
  });

  it('should have a page title', () => {
    const title = browser.getTitle();
    assert.equal(title, 'Synapse');
  });
});
