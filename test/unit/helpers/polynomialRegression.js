import polynomialRegression from 'helpers/polynomialRegression';
import { expect } from 'chai';

describe('polynomialRegression', () => {
  it('handles empty data', () => {
    expect(polynomialRegression({})).to.equal(undefined);
  });
});
