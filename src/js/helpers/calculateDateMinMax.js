const moment = require('moment');
const END_OF_THE_WORLD = '31-Dec-28500';

module.exports = (dateArrays) => {
  const combinedArray = dateArrays.reduce((combo, array) => (
    combo.concat(array)), []
  );

  const max = combinedArray.reduce((maxDate, date) => (
    moment(date, 'DD-MMM-YY').isAfter(maxDate) ? date : maxDate), 0
  );

  const min = combinedArray.reduce((minDate, date) => (
    moment(date, 'DD-MMM-YY').isBefore(minDate) ? date : minDate), END_OF_THE_WORLD
  );

  return [min, max];
};
