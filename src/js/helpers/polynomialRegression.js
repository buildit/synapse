import convertStatusDataToDayTime from 'helpers/convertStatusDataToDayTime';
import regression from 'regression';

module.exports = ({ statusData, category }) => {
  if (statusData) {
    const values = statusData.filter(datapoint => datapoint[category] !== undefined)
    .map(datapoint => ({
      date: datapoint.date,
      value: datapoint[category],
    }));
    const statusDataByDayIndex = convertStatusDataToDayTime(values);
    return regression('polynomial', statusDataByDayIndex, 2);
  }
  return undefined;
};
