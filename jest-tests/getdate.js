jest.unmock('../src/js/helpers/getDate');
import getDate from '../src/js/helpers/getDate';

describe('Date getter', () => {
  const date = '2016-05-09';

  it('should return the day', () => {
    const day = getDate.day(date);
    expect(day).toEqual('09');
  });

  it('should return the month', () => {
    const month = getDate.month(date);
    expect(month).toEqual('05');
  });

  it('should return the year', () => {
    const year = getDate.year(date);
    expect(year).toEqual('2016');
  });

  it('should return UTC format', () => {
    const utc = getDate.utc(date);
    expect(utc).toEqual(1465430400000);
  });
});
