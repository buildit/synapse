import moment from 'moment';

module.exports = (statusData, category) => {
  const datesInCategory = statusData.filter(datapoint => datapoint[category])
    .map(datapoint => moment(datapoint.date));
  return [
    moment.min(datesInCategory).format('DD-MMM-YY'),
    moment.max(datesInCategory).format('DD-MMM-YY'),
  ];
};
