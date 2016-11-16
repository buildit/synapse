import convertDateToDayIndex from 'helpers/convertDateToDayIndex';
import polynomialRegression from './polynomialRegression';

module.exports = ({ statusData, category, date }) => {
  if (statusData) {
    const dateAsIndexedDay = convertDateToDayIndex(statusData, date);
    const lr = polynomialRegression({
      statusData,
      category,
    });
    const a = lr.equation[2];
    const b = lr.equation[1];
    const c = lr.equation[0];
    const x = dateAsIndexedDay;
    const y =
      a * x * x
      +
      b * x
      +
      c;
    return y;
  }
  return 0;
};
