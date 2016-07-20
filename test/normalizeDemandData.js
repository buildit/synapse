const assert = require('chai').assert;
const norm = require('../src/js/helpers/normalizeDemandData');
const isSorted = require('./helpers/isSorted');
const sampleDemandData = require('../sample-data-for-tests/sampleDemandData');
const findGaps = require('./helpers/findGaps');

describe('Normalizer for demand data', () => {
  const normalizedData =
    norm()
      .datum(sampleDemandData)
      // .fill()
      .sort()
      .transform()
      .getData();

  it('is a function', () => {
    assert.equal(typeof norm, 'function');
  });

  it('returns an array of objects', () => {
    assert.equal(typeof normalizedData[0], 'object');
  });

  it('every data point has a name key', () => {
    assert(normalizedData[0].name);
  });

  it('every data point has a data key', () => {
    assert(normalizedData[0].data);
  });

  it('returns sorted data', () => {
    assert.equal(isSorted(normalizedData[0].data), true);
  });

  xit('fills gaps in the data series', () => {
    assert.equal(findGaps(normalizedData[0].data).length, 0);
  });
});
