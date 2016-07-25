const getDate = {
  day: (date) => (
    date.split('-')[2]
  ),
  month: (date) => (
    date.split('-')[1]
  ),
  year: (date) => (
    date.split('-')[0]
  ),
  utc: (date) => {
    const day = parseInt(date.split('-')[2], 10);
    const month = parseInt(date.split('-')[1], 10) - 1;
    const year = parseInt(date.split('-')[0], 10);
    return (Date.UTC(year, month, day));
  },
};

module.exports = getDate;
