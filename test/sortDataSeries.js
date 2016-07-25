const assert = require('chai').assert;
const sortDataSeries = require('../src/js/helpers/sortDataSeries');

describe('Demand data series sorter', () => {
  const data = [
    [3, 1],
    [2, 1],
    [1, 1],
    [5, 1],
    [4, 1],
  ];

  it('is a function', () => {
    assert.equal(typeof sortDataSeries, 'function');
  });

  it('sorts the data', () => {
    const sorted = sortDataSeries(data);
    assert.equal(sorted[0][0], 1);
    assert.equal(sorted[1][0], 2);
    assert.equal(sorted[2][0], 3);
    assert.equal(sorted[3][0], 4);
    assert.equal(sorted[4][0], 5);
  });
});
