import convertStatusDataToUnixTime from 'helpers/convertStatusDataToUnixTime';
import { linearRegression } from 'simple-statistics';

module.exports = ({ statusData, category }) => {
  if (statusData) {
    const values = statusData.filter(datapoint => datapoint[category])
    .map(datapoint => ({
      date: datapoint.date,
      value: datapoint[category],
    }));
    const statusDataUnixTime = convertStatusDataToUnixTime(values);
    return linearRegression(statusDataUnixTime);
  }
  return undefined;
};
