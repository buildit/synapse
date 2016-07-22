const getDate = require('../src/js/helpers/getDate');
const should = require('chai').should();

describe('Function that converts sting yyyy-mm-dd to UTC numeric value', () => {
  it('March 31 does not equal April 1', () => {
    const march = getDate.utc('2016-03-31');
    const april = getDate.utc('2016-04-01');
    should.not.equal(march, april);
  });
});
