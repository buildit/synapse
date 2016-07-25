const findDateRangeInDays = require('./findDateRangeInDays');
const insertDatapoint = require('./insertDatapoint');
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

module.exports = (dataSeries) => {
  let result = dataSeries;
  for (let i = 0; i < dataSeries.length; i++) {
    const currentDatapoint = dataSeries[i];
    const nextDatapoint = dataSeries[i + 1];

    if (nextDatapoint) {
      const dateOfNextPoint = nextDatapoint[0];
      const dateOfCurrentPoint = currentDatapoint[0];
      const timeRangeBetweenPoints = findDateRangeInDays(dateOfNextPoint, dateOfCurrentPoint);
      if (timeRangeBetweenPoints > 1) {
        const filler = [[
          currentDatapoint[0] + MILLISECONDS_IN_A_DAY,
          currentDatapoint[1],
        ]];
        result = insertDatapoint(dataSeries, filler, i);
      }
    }
  }
  return result;
};
