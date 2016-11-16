const moment = require('moment');
import { linearRegressionLine } from 'simple-statistics';
import linearRegression from './linearRegression';

module.exports = ({ statusData, category, date }) => {
  if (statusData) {
    const dateUnixTime = moment(date).unix();
    const lr = linearRegression({
      statusData,
      category,
    });
    const l = linearRegressionLine(lr);
    return l(dateUnixTime);
  }
  return 0;
};
