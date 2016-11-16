import convertDateToDayIndex from 'helpers/convertDateToDayIndex';

module.exports = (data) => data.map(datapoint => {
  const dayIndex = convertDateToDayIndex(data, datapoint.date);
  return [dayIndex, datapoint.value];
});
