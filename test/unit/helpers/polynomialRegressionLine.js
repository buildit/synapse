import polynomialRegressionLine from 'helpers/polynomialRegressionLine';
import { expect } from 'chai';

describe('Polynomial regression line', () => {
  it(`It should properly calculate a value
    that already exists in the date range of the data set`, () => {
    const statusData = [
      { Backlog: 1, date: '01-Jan-16' },
      { Backlog: 2, date: '02-Jan-16' },
      { Backlog: 3, date: '03-Jan-16' },
    ];
    const result = polynomialRegressionLine({
      statusData,
      category: 'Backlog',
      date: '01-Jan-16',
    });
    expect(result).to.equal(1);
  });

  it(`It should properly calculate a value
    outside the date range of the data set`, () => {
    const statusData = [
      { Backlog: 1, date: '01-Jan-16' },
      { Backlog: 2, date: '02-Jan-16' },
      { Backlog: 3, date: '03-Jan-16' },
    ];
    const result = polynomialRegressionLine({
      statusData,
      category: 'Backlog',
      date: '04-Jan-16',
    });
    expect(result).to.equal(4);
  });
});
