const assert = require('chai').assert;
const fillGapsInDemandDataSeries = require('../src/js/helpers/fillGapsInDemandDataSeries');
const findGaps = require('./helpers/findGaps');

describe('Function that inserts filler datapoints in Demand data series', () => {
  const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

  it('is a function', () => {
    assert.equal(typeof fillGapsInDemandDataSeries, 'function');
  });

  it('fills a single gap in a series', () => {
    const data = [
      [MILLISECONDS_IN_A_DAY * 1, 10],
      [MILLISECONDS_IN_A_DAY * 2, 20],
      [MILLISECONDS_IN_A_DAY * 4, 40],
      [MILLISECONDS_IN_A_DAY * 5, 50],
    ];
    assert.equal(findGaps(data).length, 1);
    const gapless = fillGapsInDemandDataSeries(data);
    assert.equal(findGaps(gapless).length, 0);
  });

  it('fills two separate gaps in a series', () => {
    const data = [
      [MILLISECONDS_IN_A_DAY * 1, 10],
      [MILLISECONDS_IN_A_DAY * 2, 20],
      [MILLISECONDS_IN_A_DAY * 4, 40],
      [MILLISECONDS_IN_A_DAY * 6, 50],
      [MILLISECONDS_IN_A_DAY * 7, 50],
    ];
    assert.equal(findGaps(data).length, 2);
    const gapless = fillGapsInDemandDataSeries(data);
    assert.equal(findGaps(gapless), 0);
  });
});
