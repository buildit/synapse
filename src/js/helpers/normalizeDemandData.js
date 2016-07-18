const sortByDate = array => (
  array.sort((a, b) => (
    new Date(a.projectDate) - new Date(b.projectDate)
  ))
);

const findDateRangeInMS = (mostRecentDate, oldestDate) => (
  new Date(mostRecentDate) - new Date(oldestDate)
);

const dateRangeInDays = dateRangeInMS => (Math.floor(dateRangeInMS / (24 * 60 * 60 * 1000)));

const normalizeDemandData = (data) => {
  const sorted = sortByDate(data);
  const oldestDate = sorted[0].projectDate;
  const mostRecentDate = sorted[sorted.length - 1].projectDate;
  const dateRangeInMS = findDateRangeInMS(mostRecentDate, oldestDate);
  const dateRange = dateRangeInDays(dateRangeInMS);

  const result = [{
    name: 'To Do',
    data: [],
  }];

  // For every date, add a data point to the To Do data
  for (let i = 0; i < dateRange; i++) {
    const status = sorted[i].status;
    const value = status['To Do'];
    result[0].data.push(value);
  }
  return result;
};

export default normalizeDemandData;
