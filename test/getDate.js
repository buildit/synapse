const getDate = require('../src/js/helpers/getDate');
const should = require('chai').should();

describe('Function that converts sting yyyy-mm-dd to UTC numeric value', () => {
  it('March 31 does not equal April 1', () => {
    const march = getDate.utc('2016-03-31');
    const april = getDate.utc('2016-04-01');
    should.not.equal(march, april);
  });
});

describe('Date getter', () => {
  const date = '2016-05-09';

  it('should return the day', () => {
    const day = getDate.day(date);
    should.equal(day, '09');
  });

  it('should return the month', () => {
    const month = getDate.month(date);
    should.equal(month, '05');
  });

  it('should return the year', () => {
    const year = getDate.year(date);
    should.equal(year, '2016');
  });

  it('should return UTC format', () => {
    const utc = getDate.utc(date);
    should.equal(utc, 1462752000000);

    const beginningOfTimeUTC = getDate.utc('1970-01-01');
    should.equal(beginningOfTimeUTC, 0);
  });
});
