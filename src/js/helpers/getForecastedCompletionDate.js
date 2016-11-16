import moment from 'moment';
import findStatusDateRange from 'helpers/findStatusDateRange';
// import linearRegressionLine from 'helpers/linearRegressionLine';
import polynomialRegressionLine from 'helpers/polynomialRegressionLine';

module.exports = (statusData) => {
  const dateRange = findStatusDateRange(statusData, 'Backlog');
  const date = moment(dateRange[0], 'DD-MMM-YY');

  let completionDate;
  function captureDate(d) {
    return function _captureDate() { return d; };
  }
  for (let i = 0; i < 100; i++) {
    date.add(10, 'days');
    // const backlogRegression = linearRegressionLine({
    //   statusData,
    //   category: 'Backlog',
    //   date: date.format('DD-MMM-YY'),
    // });
    const backlogRegression = polynomialRegressionLine({
      statusData,
      category: 'Backlog',
      date: date.format('DD-MMM-YY'),
    });
    if (backlogRegression < 0) {
      completionDate = captureDate(date.format('DD-MMM-YY'));
      break;
    }
  }
  if (typeof completionDate === 'function') {
    return completionDate();
  }
  return undefined;
};
