const dateMinMaxCalc = require('../../src/js/helpers/calculateDateMinMax');
const should = require('chai').should();

describe('Date Min Max Calucator', () => {
  it('Finds a valid date min and max given a single array of arrays of string dates.', () => {
    const stringDateArray = [[
      '29-Sep-16',
      '01-Aug-16',
      '25-Dec-16',
      '05-Jul-16',
    ]];

    should.equal(dateMinMaxCalc(stringDateArray)[0], '05-Jul-16');
    should.equal(dateMinMaxCalc(stringDateArray)[1], '25-Dec-16');
  });

  it('Finds a valid date min and max given multiple arrays of arrays of string dates.', () => {
    const stringDateArray = [
      [
        '29-Sep-16',
        '01-Aug-16',
        '25-Dec-16',
        '05-Jul-16',
      ],
      [
        '22-Mar-16',
        '01-Feb-16',
        '22-Jun-16',
        '11-Nov-16',
      ],
    ];

    should.equal(dateMinMaxCalc(stringDateArray)[0], '01-Feb-16');
    should.equal(dateMinMaxCalc(stringDateArray)[1], '25-Dec-16');
  });
});
