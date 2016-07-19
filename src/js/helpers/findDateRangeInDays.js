const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

const findDateRangeInMS = (newest, oldest) => (
  new Date(newest) - new Date(oldest)
);

const findDateRangeInDays = (newest, oldest) => (
  Math.floor(
    findDateRangeInMS(newest, oldest) / MILLISECONDS_IN_A_DAY)
);

export default findDateRangeInDays;
