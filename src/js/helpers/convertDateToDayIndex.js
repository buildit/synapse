// Converts the dates to enumerated days (0, 1, 2...)
// where day 0 is the first day in the data set

const moment = require('moment');

module.exports = (data, date) => {
  if (data.length > 0) {
    const day0 = moment(data[0].date);
    const currentDay = moment(date);
    return currentDay.diff(day0, 'days');
  }
  return undefined;
};
