import convertDateToDayIndex from 'helpers/convertDateToDayIndex';
import { expect } from 'chai';

describe('convertDateToDayIndex', () => {
  it('handles empty data', () => {
    expect(convertDateToDayIndex([])).to.equal(undefined);
  });
  // TODO: proper test for non-empty data.  But that branch is covered
  // in a different test somewhere right now.
});
